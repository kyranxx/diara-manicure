from __future__ import annotations

import html
import re
import zipfile
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from typing import Any
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
CUSTOMER_EXPORT = Path(r"C:\Users\User\Downloads\customerExport_1777475891692.xlsx")
MAILING_EXPORT = Path(r"C:\Users\User\Downloads\customerForMailingExport_1777475924651.xlsx")
RESERVATION_EXPORT = Path(r"C:\Users\User\Downloads\reservationExport_1777475887081.xlsx")
OUTPUT = ROOT / "exports" / "customer_timelines.html"

NS = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
SERVICE_COLORS = [
    "#2f766f",
    "#7a4db2",
    "#c05a2b",
    "#2f5ea8",
    "#a13f72",
    "#67851f",
    "#b13e45",
    "#4d6b86",
    "#8a6b21",
    "#6a5b3f",
]


def column_index(cell_ref: str) -> int:
    match = re.match(r"([A-Z]+)", cell_ref)
    if not match:
        return 0
    total = 0
    for char in match.group(1):
        total = total * 26 + ord(char) - 64
    return total - 1


def read_shared_strings(archive: zipfile.ZipFile) -> list[str]:
    root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    values: list[str] = []
    for item in root.findall("x:si", NS):
        values.append("".join((node.text or "") for node in item.findall(".//x:t", NS)))
    return values


def read_xlsx_rows(path: Path) -> list[list[str]]:
    # These exports have dimension ref="A1", so normal readers see only A1.
    # Reading sheet XML directly preserves every row and column.
    with zipfile.ZipFile(path) as archive:
        shared = read_shared_strings(archive)
        sheet = ET.fromstring(archive.read("xl/worksheets/sheet1.xml"))
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


def norm_email(value: str | None) -> str:
    return (value or "").strip().lower()


def norm_name(value: str | None) -> str:
    return re.sub(r"\s+", " ", (value or "").strip()).casefold()


def customer_key(record: dict[str, str]) -> str:
    email = norm_email(record.get("Email"))
    if email:
        return f"email:{email}"
    return f"name:{norm_name(record.get('Meno'))}"


def reservation_lookup_key(record: dict[str, str], name_keys: dict[str, str]) -> str:
    email = norm_email(record.get("Email"))
    if email:
        return f"email:{email}"
    name = norm_name(record.get("Meno"))
    return name_keys.get(name, f"reservation-only:{name or 'no-name'}")


def parse_date(value: str) -> datetime | None:
    for fmt in ("%d.%m.%Y %H:%M", "%d.%m.%Y"):
        try:
            return datetime.strptime(value.strip(), fmt)
        except ValueError:
            continue
    return None


def escape(value: Any) -> str:
    return html.escape(str(value or ""), quote=True)


def money(value: str) -> str:
    if not value:
        return ""
    try:
        return f"{float(value):.2f} EUR"
    except ValueError:
        return value


def service_title(value: str) -> tuple[str, str]:
    if " - " not in value:
        return value, ""
    title, detail = value.split(" - ", 1)
    return title, detail


def display_date(value: str) -> str:
    parsed = parse_date(value)
    if not parsed:
        return value
    return parsed.strftime("%d.%m.%Y")


def display_time(start: str, end: str) -> str:
    parsed_start = parse_date(start)
    parsed_end = parse_date(end)
    if not parsed_start:
        return ""
    if parsed_end:
        return f"{parsed_start.strftime('%H:%M')} - {parsed_end.strftime('%H:%M')}"
    return parsed_start.strftime("%H:%M")


def short_date(value: str) -> str:
    parsed = parse_date(value)
    if not parsed:
        return value
    return parsed.strftime("%d.%m.")


def short_month(value: datetime) -> str:
    return value.strftime("%m/%y")


def status_label(reservation: dict[str, str], now: datetime) -> tuple[str, str]:
    status = reservation.get("Stav", "")
    start = parse_date(reservation.get("Začiatok", ""))
    if status == "CANCELLED":
        return "Cancelled", "cancelled"
    if start and start >= now:
        return "Future", "future"
    return "Past", "past"


def add_months(value: datetime, months: int) -> datetime:
    month = value.month - 1 + months
    year = value.year + month // 12
    month = month % 12 + 1
    return value.replace(year=year, month=month, day=1)


def timeline_ticks(start: datetime, end: datetime) -> list[tuple[datetime, str, str]]:
    cursor = start.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    ticks: list[tuple[datetime, str, str]] = []
    while cursor <= end:
        ticks.append((cursor, short_month(cursor), "major"))
        middle = cursor.replace(day=15)
        if middle <= end:
            ticks.append((middle, "15", "minor"))
        cursor = add_months(cursor, 1)
    return ticks


def position_percent(value: datetime, start: datetime, end: datetime) -> float:
    if end <= start:
        return 0
    ratio = (value - start).total_seconds() / (end - start).total_seconds()
    return max(0, min(100, ratio * 100))


def short_service(value: str) -> str:
    title, _ = service_title(value)
    replacements = {
        "Modelácia gélových nechtov (doplnenie)": "Doplnenie",
        "Modelácia gélových nechtov": "Nové gély",
        "Gélová báza + gél lak": "Gél lak",
    }
    return replacements.get(title, title[:28])


def service_colors(reservations: list[dict[str, str]]) -> dict[str, str]:
    names: list[str] = []
    for reservation in reservations:
        name = short_service(reservation.get("Služba", ""))
        if name and name not in names:
            names.append(name)
    return {
        name: SERVICE_COLORS[index % len(SERVICE_COLORS)]
        for index, name in enumerate(sorted(names))
    }


def render_legend(colors: dict[str, str]) -> str:
    service_items = "\n".join(
        f'<span><i style="background:{escape(color)}"></i>{escape(name)}</span>'
        for name, color in colors.items()
    )
    return f"""
      <div class="legend" aria-label="Color explanation">
        <div class="legend-title">Colors</div>
        <div class="legend-row"><span><i class="today-swatch"></i>Current date</span><span><i class="future-swatch"></i>Future ring</span><span><i class="cancelled-swatch"></i>Cancelled ring</span></div>
        <div class="legend-row services">{service_items}</div>
      </div>"""


def render_event_dot(
    reservation: dict[str, str],
    now: datetime,
    timeline_start: datetime,
    timeline_end: datetime,
    colors: dict[str, str],
) -> str:
    start = parse_date(reservation.get("Začiatok", ""))
    if not start or start < timeline_start or start > timeline_end:
        return ""
    label, class_name = status_label(reservation, now)
    service = short_service(reservation.get("Služba", ""))
    title = service_title(reservation.get("Služba", ""))[0]
    price = money(reservation.get("Cena", "")).replace(" EUR", "€")
    tooltip = (
        f"{display_date(reservation.get('Začiatok', ''))} "
        f"{display_time(reservation.get('Začiatok', ''), reservation.get('Koniec', ''))} - "
        f"{label}: {title}"
    )
    if price:
        tooltip += f" | {price}"
    return (
        f'<span class="event-dot {class_name}" '
        f'style="left:{position_percent(start, timeline_start, timeline_end):.3f}%;'
        f'--service-color:{escape(colors.get(service, SERVICE_COLORS[0]))}" '
        f'title="{escape(tooltip)}"></span>'
    )


def render_event_chip(
    reservation: dict[str, str],
    now: datetime,
    colors: dict[str, str],
) -> str:
    label, class_name = status_label(reservation, now)
    service = short_service(reservation.get("Služba", ""))
    price = money(reservation.get("Cena", "")).replace(" EUR", "€")
    time = display_time(reservation.get("Začiatok", ""), reservation.get("Koniec", ""))
    tooltip = f"{label} | {display_date(reservation.get('Začiatok', ''))} {time} | {service}"
    if price:
        tooltip += f" | {price}"
    return f"""
      <span class="event-chip {class_name}" style="--service-color:{escape(colors.get(service, SERVICE_COLORS[0]))}" title="{escape(tooltip)}">
        <b>{escape(short_date(reservation.get("Začiatok", "")))}</b>
        {escape(service)}
      </span>"""


def render_customer(
    customer: dict[str, str],
    reservations: list[dict[str, str]],
    now: datetime,
    timeline_start: datetime,
    timeline_end: datetime,
    ticks: list[tuple[datetime, str, str]],
    colors: dict[str, str],
    reservation_only: bool = False,
) -> str:
    reservations = sorted(
        reservations,
        key=lambda item: parse_date(item.get("Začiatok", "")) or datetime.min,
    )
    visible_reservations = [
        item
        for item in reservations
        if (parse_date(item.get("Začiatok", "")) or datetime.min) >= timeline_start
        and (parse_date(item.get("Začiatok", "")) or datetime.max) <= timeline_end
    ]
    name = customer.get("Meno") or "Unknown customer"
    phone = customer.get("Telefón", "")
    email = customer.get("Email", "")
    last_visit = customer.get("Posledná návšteva", "")
    loyalty = customer.get("Vernosť", "")
    no_show = customer.get("Neprišiel", "")

    future_count = sum(1 for item in visible_reservations if status_label(item, now)[1] == "future")
    cancelled_count = sum(1 for item in visible_reservations if status_label(item, now)[1] == "cancelled")
    past_count = len(visible_reservations) - future_count - cancelled_count

    tick_html = "\n".join(
        f'<span class="month-tick {escape(kind)}" style="left:{position_percent(tick, timeline_start, timeline_end):.3f}%">'
        f'<i></i><b>{escape(label)}</b></span>'
        for tick, label, kind in ticks
    )
    dots = "\n".join(
        render_event_dot(item, now, timeline_start, timeline_end, colors)
        for item in visible_reservations
    )
    chips = "\n".join(render_event_chip(item, now, colors) for item in visible_reservations)
    if not chips:
        chips = '<span class="empty">No visits/reservations in this export</span>'

    return f"""
    <section class="customer">
      <div class="person">
        <h2>{escape(name)}</h2>
        <div class="contact">
          {f'<span>{escape(phone)}</span>' if phone else ''}
          {f'<span>{escape(email)}</span>' if email else ''}
          {f'<span class="reservation-only">Reservation-only</span>' if reservation_only else ''}
        </div>
        <div class="counts">
          <span>{len(visible_reservations)} total</span>
          <span>{past_count} past</span>
          <span>{future_count} future</span>
          <span>{cancelled_count} cancelled</span>
        </div>
      </div>
      <div class="timeline-wrap">
        <div class="rail">
          {tick_html}
          <span class="today" style="left:{position_percent(now, timeline_start, timeline_end):.3f}%" title="{escape(now.strftime('%d.%m.%Y'))}"></span>
          {dots}
        </div>
        <div class="events">{chips}</div>
      </div>
      <div class="facts">
        {f'<span>Last: {escape(last_visit)}</span>' if last_visit else ''}
        {f'<span>Loyalty {escape(loyalty)}</span>' if loyalty else ''}
        {f'<span>No-show {escape(no_show)}</span>' if no_show else ''}
      </div>
    </section>"""


def main() -> None:
    customers = read_table(CUSTOMER_EXPORT)
    mailing = read_table(MAILING_EXPORT)
    reservations = read_table(RESERVATION_EXPORT)
    now = datetime.now()

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    customer_by_key: dict[str, dict[str, str]] = {}
    name_keys: dict[str, str] = {}
    for customer in customers:
        key = customer_key(customer)
        customer_by_key[key] = customer
        name = norm_name(customer.get("Meno"))
        if name:
            name_keys[name] = key

    reservations_by_customer: dict[str, list[dict[str, str]]] = defaultdict(list)
    for reservation in reservations:
        key = reservation_lookup_key(reservation, name_keys)
        if key.startswith("email:") and key not in customer_by_key:
            fallback = name_keys.get(norm_name(reservation.get("Meno")))
            if fallback:
                key = fallback
        reservations_by_customer[key].append(reservation)

    timeline_start = datetime(2026, 1, 1)
    latest_reservation = max(
        (parse_date(item.get("Začiatok", "")) for item in reservations),
        default=None,
    )
    timeline_end = max(now, latest_reservation or now)
    ticks = timeline_ticks(timeline_start, timeline_end)
    colors = service_colors(reservations)
    legend = render_legend(colors)

    customer_sections: list[str] = []
    for customer in sorted(customers, key=lambda item: norm_name(item.get("Meno"))):
        customer_sections.append(
            render_customer(
                customer,
                reservations_by_customer.get(customer_key(customer), []),
                now,
                timeline_start,
                timeline_end,
                ticks,
                colors,
            )
        )

    reservation_only_sections: list[str] = []
    for key in sorted(k for k in reservations_by_customer if k not in customer_by_key):
        items = reservations_by_customer[key]
        first = items[0]
        reservation_only_sections.append(
            render_customer(
                {
                    "Meno": first.get("Meno", "Unknown customer"),
                    "Telefón": first.get("Telefón", ""),
                    "Email": first.get("Email", ""),
                },
                items,
                now,
                timeline_start,
                timeline_end,
                ticks,
                colors,
                reservation_only=True,
            )
        )

    customer_with_reservations = sum(
        1 for customer in customers if reservations_by_customer.get(customer_key(customer))
    )
    future_reservations = sum(
        1 for reservation in reservations if status_label(reservation, now)[1] == "future"
    )
    cancelled_reservations = sum(
        1 for reservation in reservations if status_label(reservation, now)[1] == "cancelled"
    )

    document = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Customer Timelines</title>
  <style>
    :root {{
      --ink: #171717;
      --muted: #666;
      --line: #d7d7d7;
      --paper: #fff;
      --wash: #f4f4f2;
      --accent: #5f4bb6;
      --past: #3f6f6a;
      --future: #13795b;
      --cancelled: #a23b35;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      background: var(--wash);
      color: var(--ink);
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.25;
    }}
    header {{
      background: var(--paper);
      border-bottom: 1px solid var(--line);
      padding: 10px max(12px, calc((100vw - 1500px) / 2));
      position: sticky;
      top: 0;
      z-index: 5;
    }}
    h1, h2, p {{ margin: 0; }}
    h1 {{ font-size: 22px; font-weight: 700; }}
    h2 {{
      font-size: 15px;
      line-height: 1.15;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }}
    main {{
      width: min(1500px, calc(100vw - 20px));
      margin: 10px auto 32px;
    }}
    .header-top {{
      display: grid;
      grid-template-columns: minmax(220px, 1fr) minmax(360px, 620px);
      gap: 16px;
      align-items: start;
    }}
    .legend {{
      justify-self: end;
      max-width: 620px;
      border: 1px solid var(--line);
      border-radius: 4px;
      padding: 6px 8px;
      background: #fbfbfb;
      font-size: 11px;
    }}
    .legend-title {{
      font-weight: 700;
      margin-bottom: 3px;
    }}
    .legend-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 4px 10px;
    }}
    .legend-row span {{
      display: inline-flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }}
    .legend i {{
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
      border: 1px solid rgba(0,0,0,.2);
    }}
    .legend .services {{
      margin-top: 4px;
    }}
    .today-swatch {{
      width: 2px !important;
      border-radius: 0 !important;
      background: #111;
    }}
    .future-swatch {{
      background: white;
      box-shadow: 0 0 0 2px var(--future);
    }}
    .cancelled-swatch {{
      background: white;
      box-shadow: 0 0 0 2px var(--cancelled);
      opacity: .65;
    }}
    .summary {{
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }}
    .summary div {{
      border: 1px solid var(--line);
      background: var(--paper);
      padding: 6px 8px;
      border-radius: 4px;
      min-width: 118px;
    }}
    .summary strong {{
      font-size: 17px;
      margin-right: 4px;
    }}
    .summary span, .subtitle, .contact, .facts {{
      color: var(--muted);
      font-size: 11px;
    }}
    .customer {{
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: 4px;
      margin-bottom: 6px;
      padding: 8px 10px;
      display: grid;
      grid-template-columns: 250px minmax(520px, 1fr) 190px;
      gap: 12px;
      min-height: 86px;
    }}
    .person {{
      min-width: 0;
      align-self: start;
    }}
    .contact, .counts, .facts {{
      display: flex;
      flex-wrap: wrap;
      gap: 3px 8px;
      margin-top: 4px;
    }}
    .counts {{
      color: var(--accent);
      font-size: 11px;
      font-weight: 700;
    }}
    .facts {{
      align-self: start;
      justify-content: flex-end;
      text-align: right;
    }}
    .reservation-only {{
      color: var(--cancelled);
      font-weight: 700;
    }}
    .timeline-wrap {{
      min-width: 0;
    }}
    .rail {{
      position: relative;
      height: 28px;
      margin-top: 4px;
      border-top: 2px solid #bdbdbd;
    }}
    .month-tick {{
      position: absolute;
      top: -8px;
      transform: translateX(-50%);
      color: var(--muted);
      font-size: 10px;
      white-space: nowrap;
    }}
    .month-tick:first-child {{
      transform: translateX(0);
    }}
    .month-tick i {{
      display: block;
      width: 1px;
      height: 11px;
      background: var(--line);
      margin: 0 auto 3px;
    }}
    .month-tick.minor {{
      top: -5px;
      font-size: 9px;
    }}
    .month-tick.minor i {{
      height: 7px;
      background: #ececec;
    }}
    .month-tick b {{
      font-weight: 400;
    }}
    .today {{
      position: absolute;
      top: -7px;
      width: 2px;
      height: 18px;
      background: #111;
      z-index: 2;
    }}
    .event-dot {{
      position: absolute;
      top: -6px;
      transform: translateX(-50%);
      width: 11px;
      height: 11px;
      border: 2px solid white;
      border-radius: 50%;
      background: var(--service-color);
      box-shadow: 0 0 0 1px rgba(0,0,0,.18);
      z-index: 3;
    }}
    .event-dot.future {{ box-shadow: 0 0 0 2px var(--future), 0 0 0 4px white; }}
    .event-dot.cancelled {{ box-shadow: 0 0 0 2px var(--cancelled), 0 0 0 4px white; opacity: .55; }}
    .events {{
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      max-height: 38px;
      overflow: auto;
      padding-top: 4px;
      scrollbar-width: thin;
    }}
    .event-chip {{
      display: inline-flex;
      align-items: center;
      gap: 4px;
      max-width: 165px;
      padding: 2px 6px;
      border: 1px solid #cfd6d4;
      border-left: 4px solid var(--service-color);
      border-radius: 4px;
      color: #222;
      background: #fbfbfb;
      font-size: 11px;
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }}
    .event-chip.future {{ box-shadow: inset 0 0 0 1px rgba(19,121,91,.5); }}
    .event-chip.cancelled {{ box-shadow: inset 0 0 0 1px rgba(162,59,53,.55); opacity: .68; }}
    .event-chip b {{
      flex: 0 0 auto;
      font-size: 10px;
    }}
    .empty {{
      color: var(--muted);
      font-size: 11px;
    }}
    .section-title {{
      margin: 18px 0 8px;
      font-size: 18px;
    }}
    @media (max-width: 980px) {{
      .header-top {{
        grid-template-columns: 1fr;
      }}
      .legend {{
        justify-self: start;
      }}
      .customer {{
        grid-template-columns: 1fr;
      }}
      .facts {{
        justify-content: flex-start;
        text-align: left;
      }}
      .rail {{ min-width: 720px; }}
      .timeline-wrap {{ overflow-x: auto; }}
    }}
    @media print {{
      body {{ background: white; }}
      header {{ position: static; }}
      .customer {{ break-inside: avoid; }}
      .customer {{ border-color: #bbb; }}
    }}
  </style>
</head>
<body>
  <header>
    <div class="header-top">
      <h1>Customer Timelines</h1>
      {legend}
    </div>
    <div class="summary">
      <div><strong>{len(customers)}</strong><span>customers in customer export</span></div>
      <div><strong>{len(mailing)}</strong><span>customers in mailing export</span></div>
      <div><strong>{len(reservations)}</strong><span>reservation rows</span></div>
      <div><strong>{customer_with_reservations}</strong><span>export customers with reservations</span></div>
      <div><strong>{future_reservations}</strong><span>future reservations</span></div>
      <div><strong>{cancelled_reservations}</strong><span>cancelled rows</span></div>
      <div><strong>{len(reservation_only_sections)}</strong><span>reservation-only groups</span></div>
    </div>
  </header>
  <main>
    {''.join(customer_sections)}
    {f'<h2 class="section-title">Reservation-only entries</h2>{"".join(reservation_only_sections)}' if reservation_only_sections else ''}
  </main>
</body>
</html>
"""
    OUTPUT.write_text(document, encoding="utf-8")
    print(OUTPUT)
    print(f"customers={len(customers)} mailing={len(mailing)} reservations={len(reservations)}")
    print(f"customers_with_reservations={customer_with_reservations}")
    print(f"reservation_only_groups={len(reservation_only_sections)}")
    print(f"future_reservations={future_reservations} cancelled={cancelled_reservations}")


if __name__ == "__main__":
    main()
