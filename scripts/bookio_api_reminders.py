#!/usr/bin/env python3
"""Find Bookio customers who are due for a rebooking SMS reminder.

Reads reservations from the Bookio public API (read-only), groups them by
customer and writes a CSV of customers who look overdue and have no upcoming
booking. The API has no customers endpoint, so customers are derived from
reservations.

Usage:
    export BOOKIO_API_TOKEN=...      # never commit this
    python scripts/bookio_api_reminders.py [--facility-id 16660] [--months 24]

Output (personal data, gitignored): private/sms_reminders.csv
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import re
import statistics
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path

BASE_URL = "https://services.bookio.com/public/api/v1"
DEFAULT_FACILITY_ID = 16660
PAGE_LIMIT = 100
MIN_CYCLE = 14
MAX_CYCLE = 42
DEFAULT_CYCLE = 28
OVERDUE_RATIO = 1.5
OVERDUE_BUFFER_DAYS = 14
# Statuses that never count as a completed visit or an upcoming booking.
DEAD_STATUSES = {"CANCELLED", "REFUNDED", "DID_NOT_COME", "WAITING", "UNCONFIRMED_BLOCKED"}


def api_get(path: str, token: str, params: dict) -> dict:
    url = f"{BASE_URL}{path}?{urllib.parse.urlencode(params)}"
    request = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
            # Cloudflare in front of Bookio rejects the default "Python-urllib" agent (error 1010).
            "User-Agent": "diara-manicure-reminders/1.0",
        },
    )
    for attempt in range(5):
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            if error.code == 429:
                time.sleep(int(error.headers.get("Retry-After", "1")) + 1)
                continue
            body = error.read().decode("utf-8", "replace")
            raise SystemExit(f"Bookio API error {error.code}: {body[:300]}")
    raise SystemExit("Bookio API rate limit kept failing after 5 retries")


def fetch_reservations(token: str, facility_id: int, date_from: str) -> tuple[list[dict], int]:
    """Return (reservations, total the API reported)."""
    reservations: list[dict] = []
    offset = 0
    while True:
        payload = api_get(
            "/reservations",
            token,
            {"facilityId": facility_id, "from": date_from, "offset": offset, "limit": PAGE_LIMIT},
        )
        data = payload["result"]["data"]
        batch = data.get("reservations", [])
        reservations.extend(batch)
        offset += PAGE_LIMIT
        if not batch or offset >= data["pagination"]["total"]:
            return reservations, data["pagination"]["total"]


def normalize_phone(value: str | None) -> str:
    digits = re.sub(r"\D+", "", value or "")
    if digits.startswith("00"):
        digits = digits[2:]
    if digits.startswith("0") and len(digits) == 10:  # local SK format 09xx xxx xxx
        digits = "421" + digits[1:]
    return digits


def customer_key(reservation: dict) -> str:
    return (
        normalize_phone(reservation.get("phone"))
        or (reservation.get("email") or "").strip().lower()
        or (reservation.get("name") or "").strip().lower()
    )


def parse_dt(value: str) -> datetime:
    return datetime.strptime(value, "%Y-%m-%dT%H:%M:%S")


def group_by_customer(reservations: list[dict]) -> list[list[dict]]:
    grouped: dict[str, list[dict]] = defaultdict(list)
    for reservation in reservations:
        if reservation.get("status") in DEAD_STATUSES or not reservation.get("dateFrom"):
            continue
        key = customer_key(reservation)
        if key:
            grouped[key].append(reservation)
    return list(grouped.values())


def analyse(reservations: list[dict], now: datetime) -> list[dict]:
    rows = []
    for items in group_by_customer(reservations):
        items.sort(key=lambda r: r["dateFrom"])
        visits = [parse_dt(r["dateFrom"]) for r in items if parse_dt(r["dateFrom"]) <= now]
        has_future = any(parse_dt(r["dateFrom"]) > now for r in items)
        if not visits or has_future:
            continue

        gaps = [(b - a).days for a, b in zip(visits, visits[1:]) if (b - a).days > 0]
        cycle = statistics.median(gaps) if gaps else DEFAULT_CYCLE
        cycle = min(max(cycle, MIN_CYCLE), MAX_CYCLE)
        days_since = (now - visits[-1]).days
        overdue_days = days_since - cycle
        if days_since < cycle * OVERDUE_RATIO or overdue_days < OVERDUE_BUFFER_DAYS:
            continue

        latest = items[-1]
        phone = (latest.get("phone") or "").strip()
        rows.append(
            {
                "name": (latest.get("name") or "").strip(),
                "phone": phone,
                "email": (latest.get("email") or "").strip(),
                "visits": len(visits),
                "last_visit": visits[-1].date().isoformat(),
                "days_since_last_visit": days_since,
                "typical_cycle_days": round(cycle),
                "days_overdue": round(overdue_days),
                "tier": "lapsed (>1 year)" if days_since > 365 else "overdue",
                "has_phone": bool(phone),
            }
        )
    # Most loyal and most recently lapsed first: repeat customers, then least overdue.
    rows.sort(key=lambda r: (r["tier"] != "overdue", -r["visits"], r["days_overdue"]))
    return rows


def pick_regulars(
    reservations: list[dict], now: datetime, top: int, min_days: int, max_days: int, min_visits: int
) -> list[dict]:
    """Regular customers (stable rhythm, several visits) who have not come for `min_days`+."""
    rows = []
    for items in group_by_customer(reservations):
        items.sort(key=lambda r: r["dateFrom"])
        visits = [parse_dt(r["dateFrom"]) for r in items if parse_dt(r["dateFrom"]) <= now]
        has_future = any(parse_dt(r["dateFrom"]) > now for r in items)
        if has_future or len(visits) < min_visits:
            continue
        days_since = (now - visits[-1]).days
        if not min_days <= days_since <= max_days:
            continue
        gaps = [(b - a).days for a, b in zip(visits, visits[1:]) if (b - a).days > 0]
        if len(gaps) < min_visits - 1:
            continue
        cycle = statistics.median(gaps)
        spread = statistics.pstdev(gaps) / cycle if cycle else 1
        # Regular = typical gap within ~2 months and gaps do not vary wildly.
        if cycle > 60 or spread > 0.5:
            continue
        latest = items[-1]
        phone = (latest.get("phone") or "").strip()
        if not phone:
            continue
        rows.append(
            {
                "name": (latest.get("name") or "").strip(),
                "phone": phone,
                "visits": len(visits),
                "last_visit": visits[-1].date().isoformat(),
                "days_since_last_visit": days_since,
                "typical_cycle_days": round(cycle),
                "weeks_beyond_usual": round((days_since - cycle) / 7, 1),
                "regularity": round(1 - min(spread, 1), 2),
            }
        )
    rows.sort(key=lambda r: (-r["visits"], -r["regularity"], r["days_since_last_visit"]))
    return rows[:top]


def first_name(full_name: str) -> str:
    return full_name.split()[0] if full_name else ""


def sms_text(name: str, template: str) -> str:
    greeting = f"Ahoj {first_name(name)}" if name else "Ahoj"
    return template.format(greeting=greeting)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawTextHelpFormatter)
    parser.add_argument("--facility-id", type=int, default=DEFAULT_FACILITY_ID)
    parser.add_argument("--months", type=int, default=24, help="How far back to read reservations.")
    parser.add_argument("--output", type=Path, default=Path("private/sms_reminders.csv"))
    parser.add_argument("--top", type=int, help="Instead of all overdue customers, pick the N best regulars.")
    parser.add_argument("--min-weeks", type=int, default=4, help="--top: minimum weeks since last visit.")
    parser.add_argument("--max-weeks", type=int, default=26, help="--top: maximum weeks since last visit.")
    parser.add_argument("--min-visits", type=int, default=3, help="--top: minimum number of visits.")
    parser.add_argument(
        "--sms-template",
        default="{greeting}, tu Diara Manicure. Už je čas na nové nechtíky 💅 Termín si vyberieš tu: https://diaramanicure.sk",
        help="SMS text; {greeting} is replaced with 'Ahoj <first name>'.",
    )
    args = parser.parse_args()

    token = os.environ.get("BOOKIO_API_TOKEN", "").strip()
    if not token:
        sys.exit("Set BOOKIO_API_TOKEN in your environment (Bookio admin > Prepojenie cez API).")

    now = datetime.now()
    date_from = (now - timedelta(days=30 * args.months)).date().isoformat()
    reservations, api_total = fetch_reservations(token, args.facility_id, date_from)
    if args.top:
        rows = pick_regulars(
            reservations, now, args.top, args.min_weeks * 7, args.max_weeks * 7, args.min_visits
        )
        if args.output == Path("private/sms_reminders.csv"):
            args.output = Path("private/sms_top.csv")
    else:
        rows = analyse(reservations, now)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    fields = list(rows[0].keys()) + ["sms"] if rows else []
    with args.output.open("w", newline="", encoding="utf-8-sig") as handle:
        if rows:
            writer = csv.DictWriter(handle, fieldnames=fields)
            writer.writeheader()
            for row in rows:
                writer.writerow({**row, "sms": sms_text(row["name"], args.sms_template)})

    with_phone = sum(1 for r in rows if r.get("has_phone", True))
    all_customers = {customer_key(r) for r in reservations} - {""}
    starts = sorted(r["dateFrom"] for r in reservations if r.get("dateFrom"))
    print(f"Reservations read: {len(reservations)} (API reported total: {api_total})")
    print(f"Unique customers in data: {len(all_customers)}")
    if starts:
        print(f"Reservation dates: {starts[0][:10]} .. {starts[-1][:10]} (from --months {args.months})")
    print(f"Customers to remind: {len(rows)} ({with_phone} with phone) -> {args.output}")


if __name__ == "__main__":
    main()
