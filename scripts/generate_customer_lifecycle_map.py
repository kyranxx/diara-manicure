from __future__ import annotations

import hashlib
import html
import math
import re
import zipfile
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Any
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
CUSTOMER_EXPORT = Path(r"C:\Users\User\Downloads\customerExport_1779214688899.xlsx")
RESERVATION_EXPORT = Path(r"C:\Users\User\Downloads\reservationExport_1779214683062.xlsx")
OUTPUT = ROOT / "private" / "customer_lifecycle_map.html"

NS = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REPORT_DATE = datetime(2026, 5, 19)

SEGMENTS = {
    "Core": {
        "color": "#12805c",
        "ring": 54,
        "summary": "3+ visits and recent or booked again",
    },
    "Active regular": {
        "color": "#2f6fb5",
        "ring": 112,
        "summary": "2+ visits and still warm",
    },
    "New": {
        "color": "#8a58bd",
        "ring": 170,
        "summary": "first visit within 45 days",
    },
    "Booked first visit": {
        "color": "#0f9f9a",
        "ring": 226,
        "summary": "future booking, no past visit yet",
    },
    "Occasional": {
        "color": "#8a7c33",
        "ring": 248,
        "summary": "some history, not regular yet",
    },
    "At risk": {
        "color": "#d37b19",
        "ring": 286,
        "summary": "61-90 days since last visit, no future booking",
    },
    "Losing / inactive": {
        "color": "#be3d42",
        "ring": 340,
        "summary": "90+ days since last visit, no future booking",
    },
    "No visit data": {
        "color": "#767676",
        "ring": 360,
        "summary": "no confirmed visit in this reservation export",
    },
}

SEGMENT_ORDER = [
    "Core",
    "Active regular",
    "New",
    "Booked first visit",
    "Occasional",
    "At risk",
    "Losing / inactive",
    "No visit data",
]

SERVICE_LABELS = {
    "Modelácia gélových nechtov (doplnenie)": "Doplnenie",
    "Modelácia gélových nechtov": "Nové gély",
    "Gélová báza + gél lak": "Gél lak",
    "Spevnenie prirodzených nechtov gélom": "Spevnenie",
    "Detailná manikúra": "Manikúra",
    "Odstránenie gélových nechtov": "Odstránenie",
    "Výmena / oprava nechtu": "Oprava",
}


@dataclass
class CustomerMetrics:
    key: str
    name: str
    phone: str = ""
    email: str = ""
    reservations: list[dict[str, str]] = field(default_factory=list)
    segment: str = "No visit data"
    past_count: int = 0
    future_count: int = 0
    cancelled_count: int = 0
    revenue: float = 0
    first_visit: datetime | None = None
    last_visit: datetime | None = None
    next_visit: datetime | None = None
    days_since_last: int | None = None
    favorite_service: str = ""


def column_index(cell_ref: str) -> int:
    match = re.match(r"([A-Z]+)", cell_ref or "A")
    if not match:
        return 0
    total = 0
    for char in match.group(1):
        total = total * 26 + ord(char) - 64
    return total - 1


def read_shared_strings(archive: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []
    root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    values: list[str] = []
    for item in root.findall("x:si", NS):
        values.append("".join((node.text or "") for node in item.findall(".//x:t", NS)))
    return values


def read_xlsx_rows(path: Path) -> list[list[str]]:
    with zipfile.ZipFile(path) as archive:
        shared = read_shared_strings(archive)
        sheet_name = next(
            name
            for name in archive.namelist()
            if name.startswith("xl/worksheets/sheet") and name.endswith(".xml")
        )
        sheet = ET.fromstring(archive.read(sheet_name))
        rows: list[list[str]] = []
        for row in sheet.findall(".//x:sheetData/x:row", NS):
            values: dict[int, str] = {}
            last_col = -1
            for cell in row.findall("x:c", NS):
                index = column_index(cell.attrib.get("r", "A1"))
                last_col = max(last_col, index)
                value_node = cell.find("x:v", NS)
                value = "" if value_node is None or value_node.text is None else value_node.text
                if cell.attrib.get("t") == "s" and value:
                    value = shared[int(float(value))]
                values[index] = value
            rows.append([values.get(i, "") for i in range(last_col + 1)])
        return rows


def read_table(path: Path) -> list[dict[str, str]]:
    rows = read_xlsx_rows(path)
    if not rows:
        return []
    headers = rows[0]
    table: list[dict[str, str]] = []
    for row in rows[1:]:
        padded = row + [""] * max(0, len(headers) - len(row))
        table.append(dict(zip(headers, padded)))
    return table


def escape(value: Any) -> str:
    return html.escape(str(value or ""), quote=True)


def norm_name(value: str | None) -> str:
    return re.sub(r"\s+", " ", (value or "").strip()).casefold()


def norm_email(value: str | None) -> str:
    return (value or "").strip().lower()


def display_name(value: str | None) -> str:
    return re.sub(r"\s+", " ", (value or "").strip()) or "Unknown"


def base_key(record: dict[str, str]) -> str:
    email = norm_email(record.get("Email"))
    if email:
        return f"email:{email}"
    name = norm_name(record.get("Meno"))
    return f"name:{name}" if name else "unknown"


def parse_date(value: str | None) -> datetime | None:
    text = (value or "").strip()
    for fmt in ("%d.%m.%Y %H:%M", "%d.%m.%Y"):
        try:
            return datetime.strptime(text, fmt)
        except ValueError:
            continue
    return None


def date_text(value: datetime | None) -> str:
    if not value:
        return "-"
    return value.strftime("%d.%m.%Y")


def money(value: float) -> str:
    return f"{value:.0f} EUR"


def service_title(value: str | None) -> str:
    title = (value or "").split(" - ", 1)[0]
    return SERVICE_LABELS.get(title, title or "Unknown")


def price_value(record: dict[str, str]) -> float:
    try:
        return float(record.get("Cena", "") or 0)
    except ValueError:
        return 0


def status_groups(reservations: list[dict[str, str]]) -> tuple[list[dict[str, str]], list[dict[str, str]], list[dict[str, str]]]:
    confirmed = [item for item in reservations if item.get("Stav") == "CONFIRMED"]
    past = [
        item
        for item in confirmed
        if (parse_date(item.get("Začiatok")) or datetime.max) < REPORT_DATE
    ]
    future = [
        item
        for item in confirmed
        if (parse_date(item.get("Začiatok")) or datetime.min) >= REPORT_DATE
    ]
    cancelled = [item for item in reservations if item.get("Stav") == "CANCELLED"]
    return past, future, cancelled


def classify(past_count: int, future_count: int, first_visit: datetime | None, days_since_last: int | None) -> str:
    if past_count == 0 and future_count > 0:
        return "Booked first visit"
    if past_count == 0:
        return "No visit data"
    if past_count >= 3 and (future_count > 0 or (days_since_last is not None and days_since_last <= 45)):
        return "Core"
    if past_count >= 2 and (future_count > 0 or (days_since_last is not None and days_since_last <= 60)):
        return "Active regular"
    if past_count <= 1 and first_visit and (REPORT_DATE - first_visit).days <= 45:
        return "New"
    if future_count == 0 and days_since_last is not None and days_since_last > 90:
        return "Losing / inactive"
    if future_count == 0 and days_since_last is not None and days_since_last > 60:
        return "At risk"
    return "Occasional"


def build_metrics(customers: list[dict[str, str]], reservations: list[dict[str, str]]) -> list[CustomerMetrics]:
    groups: dict[str, CustomerMetrics] = {}
    email_index: dict[str, str] = {}
    name_index: dict[str, str] = {}

    for customer in customers:
        key = base_key(customer)
        groups.setdefault(
            key,
            CustomerMetrics(
                key=key,
                name=display_name(customer.get("Meno")),
                phone=customer.get("Telefón", ""),
                email=customer.get("Email", ""),
            ),
        )
        email = norm_email(customer.get("Email"))
        name = norm_name(customer.get("Meno"))
        if email:
            email_index[email] = key
        if name:
            name_index[name] = key

    for reservation in reservations:
        email = norm_email(reservation.get("Email"))
        name = norm_name(reservation.get("Meno"))
        key = email_index.get(email) or name_index.get(name)
        if not key:
            key = f"email:{email}" if email else f"name:{name or 'unknown'}"
        groups.setdefault(
            key,
            CustomerMetrics(
                key=key,
                name=display_name(reservation.get("Meno")),
                phone=reservation.get("Telefón", ""),
                email=reservation.get("Email", ""),
            ),
        ).reservations.append(reservation)

    # Merge duplicate display names after email/name matching. This catches export variants.
    name_to_key: dict[str, str] = {}
    for key in list(groups.keys()):
        name = norm_name(groups[key].name)
        if not name:
            continue
        if name in name_to_key and name_to_key[name] != key:
            target = groups[name_to_key[name]]
            source = groups[key]
            target.reservations.extend(source.reservations)
            if not target.phone:
                target.phone = source.phone
            if not target.email:
                target.email = source.email
            del groups[key]
        else:
            name_to_key[name] = key

    for metric in groups.values():
        past, future, cancelled = status_groups(metric.reservations)
        past_dates = [parse_date(item.get("Začiatok")) for item in past if parse_date(item.get("Začiatok"))]
        future_dates = [parse_date(item.get("Začiatok")) for item in future if parse_date(item.get("Začiatok"))]
        services = Counter(service_title(item.get("Služba")) for item in past + future)

        metric.past_count = len(past)
        metric.future_count = len(future)
        metric.cancelled_count = len(cancelled)
        metric.revenue = sum(price_value(item) for item in past)
        metric.first_visit = min(past_dates) if past_dates else None
        metric.last_visit = max(past_dates) if past_dates else None
        metric.next_visit = min(future_dates) if future_dates else None
        metric.days_since_last = (REPORT_DATE - metric.last_visit).days if metric.last_visit else None
        metric.favorite_service = services.most_common(1)[0][0] if services else "-"
        metric.segment = classify(
            metric.past_count,
            metric.future_count,
            metric.first_visit,
            metric.days_since_last,
        )

    return sorted(groups.values(), key=lambda item: (SEGMENT_ORDER.index(item.segment), item.name.casefold()))


def stable_float(text: str, salt: str) -> float:
    digest = hashlib.sha1(f"{salt}:{text}".encode("utf-8")).hexdigest()
    return int(digest[:8], 16) / 0xFFFFFFFF


def dot_position(metric: CustomerMetrics) -> tuple[float, float]:
    cx, cy = 390, 380
    ring = SEGMENTS[metric.segment]["ring"]
    angle = stable_float(metric.key, "angle") * math.tau
    jitter = (stable_float(metric.key, "radius") - 0.5) * 32
    radius = ring + jitter
    return cx + math.cos(angle) * radius, cy + math.sin(angle) * radius


def dot_radius(metric: CustomerMetrics) -> float:
    return min(9.5, 3.8 + math.sqrt(max(metric.past_count, 0) + metric.future_count) * 1.35)


def tooltip(metric: CustomerMetrics) -> str:
    parts = [
        metric.name,
        metric.segment,
        f"Visits: {metric.past_count}",
        f"Future: {metric.future_count}",
        f"Cancelled: {metric.cancelled_count}",
        f"Revenue: {money(metric.revenue)}",
        f"First: {date_text(metric.first_visit)}",
        f"Last: {date_text(metric.last_visit)}",
        f"Next: {date_text(metric.next_visit)}",
        f"Service: {metric.favorite_service}",
    ]
    if metric.days_since_last is not None:
        parts.append(f"Days since last: {metric.days_since_last}")
    return " | ".join(parts)


def render_svg(metrics: list[CustomerMetrics]) -> str:
    rings = "\n".join(
        f'<circle class="ring" cx="390" cy="380" r="{SEGMENTS[name]["ring"]}" />'
        for name in ["Core", "Active regular", "New", "Booked first visit", "At risk", "Losing / inactive"]
    )
    dots = []
    for metric in metrics:
        x, y = dot_position(metric)
        color = SEGMENTS[metric.segment]["color"]
        stroke = "#111" if metric.future_count else "#ffffff"
        stroke_width = "3.2" if metric.future_count else "1.6"
        dots.append(
            f'<circle class="customer-dot" cx="{x:.1f}" cy="{y:.1f}" r="{dot_radius(metric):.1f}" '
            f'fill="{color}" stroke="{stroke}" stroke-width="{stroke_width}">'
            f'<title>{escape(tooltip(metric))}</title></circle>'
        )
    return f"""
      <svg class="map" viewBox="0 0 780 760" role="img" aria-label="Customer lifecycle ring map">
        <rect x="0" y="0" width="780" height="760" rx="10" />
        {rings}
        <text class="center-label" x="390" y="372">Core</text>
        <text class="center-sub" x="390" y="394">closest customers</text>
        <text class="ring-label" x="390" y="245">Active</text>
        <text class="ring-label" x="390" y="182">New</text>
        <text class="ring-label" x="390" y="126">First booking</text>
        <text class="ring-label danger" x="390" y="70">At risk / losing outward</text>
        {''.join(dots)}
      </svg>"""


def render_segment_legend(counts: Counter[str]) -> str:
    rows = []
    for name in SEGMENT_ORDER:
        meta = SEGMENTS[name]
        rows.append(
            f"""
            <div class="legend-item">
              <span class="swatch" style="background:{meta['color']}"></span>
              <strong>{escape(name)}</strong>
              <b>{counts.get(name, 0)}</b>
              <em>{escape(meta['summary'])}</em>
            </div>"""
        )
    return "".join(rows)


def render_metric_cards(metrics: list[CustomerMetrics], customers: list[dict[str, str]], reservations: list[dict[str, str]]) -> str:
    counts = Counter(metric.segment for metric in metrics)
    future = sum(metric.future_count for metric in metrics)
    risk = counts["At risk"] + counts["Losing / inactive"]
    new = counts["New"] + counts["Booked first visit"]
    cards = [
        ("Customer groups", len(metrics), "after merging name/email variants"),
        ("Customer export rows", len(customers), "raw customer rows"),
        ("Reservation rows", len(reservations), "raw reservation rows"),
        ("Core + active", counts["Core"] + counts["Active regular"], "customers to protect"),
        ("New / first booked", new, "growth pipeline"),
        ("At risk / losing", risk, "needs follow-up"),
        ("Future bookings", future, "confirmed future appointments"),
    ]
    return "\n".join(
        f"<div class='metric'><strong>{value}</strong><span>{escape(label)}</span><em>{escape(note)}</em></div>"
        for label, value, note in cards
    )


def customer_sort_key(metric: CustomerMetrics) -> tuple[int, int, str]:
    days = metric.days_since_last if metric.days_since_last is not None else 9999
    return (-metric.past_count, -metric.future_count, days, metric.name.casefold())


def compact_customer(metric: CustomerMetrics) -> str:
    last = date_text(metric.last_visit)
    next_visit = date_text(metric.next_visit)
    days = f"{metric.days_since_last}d" if metric.days_since_last is not None else "-"
    return f"""
      <li title="{escape(tooltip(metric))}">
        <strong>{escape(metric.name)}</strong>
        <span>{metric.past_count} visits · last {escape(last)} · {escape(days)} · next {escape(next_visit)}</span>
      </li>"""


def render_action_column(title: str, subtitle: str, items: list[CustomerMetrics], limit: int = 22) -> str:
    visible = sorted(items, key=customer_sort_key)[:limit]
    overflow = max(0, len(items) - len(visible))
    body = "".join(compact_customer(item) for item in visible)
    if overflow:
        body += f"<li class='more'>+{overflow} more</li>"
    if not body:
        body = "<li class='more'>No customers in this group</li>"
    return f"""
      <section class="action-column">
        <h3>{escape(title)}</h3>
        <p>{escape(subtitle)}</p>
        <ol>{body}</ol>
      </section>"""


def render_action_board(metrics: list[CustomerMetrics]) -> str:
    by_segment: dict[str, list[CustomerMetrics]] = defaultdict(list)
    for metric in metrics:
        by_segment[metric.segment].append(metric)
    return f"""
      <div class="action-board">
        {render_action_column("Protect", "Core and active regulars", by_segment["Core"] + by_segment["Active regular"])}
        {render_action_column("Grow", "New customers and first bookings", by_segment["New"] + by_segment["Booked first visit"])}
        {render_action_column("Rescue", "At risk and losing customers", by_segment["At risk"] + by_segment["Losing / inactive"])}
        {render_action_column("Clean up", "No visit data or occasional", by_segment["No visit data"] + by_segment["Occasional"])}
      </div>"""


def render_service_mix(reservations: list[dict[str, str]]) -> str:
    counts = Counter(service_title(item.get("Služba")) for item in reservations if item.get("Služba"))
    maximum = max(counts.values(), default=1)
    rows = []
    for service, count in counts.most_common():
        rows.append(
            f"""
            <div class="bar-row">
              <span>{escape(service)}</span>
              <div><i style="width:{count / maximum * 100:.1f}%"></i></div>
              <b>{count}</b>
            </div>"""
        )
    return "".join(rows)


def render_html(metrics: list[CustomerMetrics], customers: list[dict[str, str]], reservations: list[dict[str, str]]) -> str:
    counts = Counter(metric.segment for metric in metrics)
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Customer Lifecycle Map</title>
  <style>
    :root {{
      --ink: #181818;
      --muted: #666;
      --paper: #fff;
      --wash: #f5f3ef;
      --line: #ddd8cf;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      background: var(--wash);
      color: var(--ink);
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.32;
    }}
    header {{
      background: var(--paper);
      border-bottom: 1px solid var(--line);
      padding: 18px max(16px, calc((100vw - 1480px) / 2));
    }}
    main {{
      width: min(1480px, calc(100vw - 24px));
      margin: 14px auto 42px;
    }}
    h1, h2, h3, p {{ margin: 0; }}
    h1 {{ font-size: 28px; }}
    .subtitle {{ color: var(--muted); margin-top: 4px; font-size: 13px; }}
    .metrics {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 8px;
      margin-top: 14px;
    }}
    .metric {{
      background: #fbfbfb;
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 9px 10px;
    }}
    .metric strong {{ display: block; font-size: 24px; }}
    .metric span {{ display: block; font-size: 12px; font-weight: 700; }}
    .metric em {{ display: block; color: var(--muted); font-size: 11px; font-style: normal; margin-top: 2px; }}
    .dashboard {{
      display: grid;
      grid-template-columns: minmax(620px, 1fr) 430px;
      gap: 12px;
      align-items: start;
    }}
    .panel {{
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 12px;
    }}
    .panel h2 {{ font-size: 18px; margin-bottom: 8px; }}
    .map {{
      width: 100%;
      height: auto;
      display: block;
    }}
    .map rect {{ fill: #fcfbf8; }}
    .ring {{
      fill: none;
      stroke: #ddd5c9;
      stroke-width: 1.2;
    }}
    .center-label {{
      text-anchor: middle;
      font-size: 23px;
      font-weight: 700;
      fill: #222;
    }}
    .center-sub, .ring-label {{
      text-anchor: middle;
      fill: #777;
      font-size: 12px;
    }}
    .ring-label.danger {{ fill: #9a4b38; font-weight: 700; }}
    .customer-dot {{
      cursor: help;
      transition: transform .12s ease, stroke-width .12s ease, opacity .12s ease;
      transform-box: fill-box;
      transform-origin: center;
    }}
    .customer-dot:hover {{
      transform: scale(1.55);
      stroke-width: 4;
      opacity: .95;
    }}
    .legend-grid {{
      display: grid;
      gap: 7px;
    }}
    .legend-item {{
      display: grid;
      grid-template-columns: 14px 1fr auto;
      gap: 7px;
      align-items: center;
      border-bottom: 1px solid #eee9df;
      padding-bottom: 6px;
      font-size: 12px;
    }}
    .legend-item em {{
      grid-column: 2 / 4;
      color: var(--muted);
      font-style: normal;
      font-size: 11px;
    }}
    .swatch {{
      width: 11px;
      height: 11px;
      border-radius: 50%;
      display: inline-block;
    }}
    .rule {{
      color: var(--muted);
      font-size: 12px;
      margin-top: 10px;
    }}
    .service-mix {{
      margin-top: 12px;
      display: grid;
      gap: 6px;
    }}
    .bar-row {{
      display: grid;
      grid-template-columns: 110px 1fr 32px;
      gap: 8px;
      align-items: center;
      font-size: 12px;
    }}
    .bar-row span {{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }}
    .bar-row div {{
      background: #eeeae2;
      height: 8px;
      border-radius: 99px;
      overflow: hidden;
    }}
    .bar-row i {{
      display: block;
      height: 100%;
      background: #6b5aa5;
    }}
    .action-board {{
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      margin-top: 12px;
    }}
    .action-column {{
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 10px;
      min-height: 280px;
    }}
    .action-column h3 {{ font-size: 16px; }}
    .action-column p {{
      color: var(--muted);
      font-size: 12px;
      margin-top: 2px;
    }}
    ol {{
      list-style: none;
      padding: 0;
      margin: 9px 0 0;
      display: grid;
      gap: 5px;
    }}
    li {{
      border-top: 1px solid #eee9df;
      padding-top: 5px;
      font-size: 12px;
      cursor: help;
    }}
    li strong {{
      display: block;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }}
    li span {{
      display: block;
      color: var(--muted);
      font-size: 11px;
    }}
    li.more {{
      color: var(--muted);
      cursor: default;
    }}
    @media (max-width: 1080px) {{
      .dashboard, .action-board {{ grid-template-columns: 1fr; }}
    }}
  </style>
</head>
<body>
  <header>
    <h1>Customer Lifecycle Map</h1>
    <p class="subtitle">Generated from the new exports. Dots are customers; larger dots have more visits. Black outline means they already have a future booking. Hover a dot or name for details.</p>
    <div class="metrics">
      {render_metric_cards(metrics, customers, reservations)}
    </div>
  </header>
  <main>
    <div class="dashboard">
      <section class="panel">
        <h2>Lifecycle Ring Map</h2>
        {render_svg(metrics)}
      </section>
      <aside class="panel">
        <h2>Color Legend</h2>
        <div class="legend-grid">
          {render_segment_legend(counts)}
        </div>
        <p class="rule">Rule of thumb: nail clients are warm inside 45-60 days. No future booking after 60 days becomes risk; after 90 days becomes losing/inactive.</p>
        <h2 style="margin-top:14px">Service Mix</h2>
        <div class="service-mix">
          {render_service_mix(reservations)}
        </div>
      </aside>
    </div>
    {render_action_board(metrics)}
  </main>
</body>
</html>
"""


def main() -> None:
    customers = read_table(CUSTOMER_EXPORT)
    reservations = read_table(RESERVATION_EXPORT)
    metrics = build_metrics(customers, reservations)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(render_html(metrics, customers, reservations), encoding="utf-8")
    counts = Counter(metric.segment for metric in metrics)
    print(OUTPUT)
    print(f"customer_rows={len(customers)} reservation_rows={len(reservations)} customer_groups={len(metrics)}")
    for segment in SEGMENT_ORDER:
        print(f"{segment}={counts.get(segment, 0)}")


if __name__ == "__main__":
    main()
