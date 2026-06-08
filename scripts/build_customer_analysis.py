from __future__ import annotations

import argparse
import html
import json
import math
import re
from pathlib import Path

import pandas as pd


MIN_EXPECTED_CYCLE = 14
MAX_EXPECTED_CYCLE = 42
OVERDUE_BUFFER_DAYS = 14
OVERDUE_RATIO = 1.5


def normalize_text(value: object) -> str:
    if pd.isna(value):
        return ""
    return re.sub(r"\s+", " ", str(value).strip().lower())


def normalize_phone(value: object) -> str:
    if pd.isna(value):
        return ""
    return re.sub(r"\D+", "", str(value).split(".")[0])


def normalize_name(value: object) -> str:
    if pd.isna(value):
        return "Unknown"
    text = re.sub(r"\s+", " ", str(value).strip())
    return text or "Unknown"


def build_customer_key(row: pd.Series) -> str:
    return (
        normalize_text(row.get("Email"))
        or normalize_phone(row.get("Telefón"))
        or normalize_text(row.get("Meno"))
    )


def parse_datetime(value: object) -> pd.Timestamp | pd.NaT:
    if pd.isna(value) or value == "Neznáme":
        return pd.NaT
    return pd.to_datetime(value, dayfirst=True, errors="coerce")


def to_iso(value: pd.Timestamp | pd.NaT) -> str | None:
    if pd.isna(value):
        return None
    return value.isoformat()


def clamp_cycle(value: float | None) -> float | None:
    if value is None or math.isnan(value):
        return None
    return float(min(max(value, MIN_EXPECTED_CYCLE), MAX_EXPECTED_CYCLE))


def month_label(month_key: str) -> str:
    return pd.Period(month_key, freq="M").strftime("%b %Y")


def fmt_number(value: int | float | None) -> str:
    if value is None or (isinstance(value, float) and math.isnan(value)):
        return "—"
    if isinstance(value, float) and not value.is_integer():
        return f"{value:.1f}"
    return f"{int(value)}"


def fmt_percent(value: float) -> str:
    return f"{value:.1f}%"


def fmt_date(value: str | None) -> str:
    if not value:
        return "—"
    return pd.to_datetime(value).strftime("%d %b %Y")


def fmt_day_count(value: float | int | None) -> str:
    if value is None or (isinstance(value, float) and math.isnan(value)):
        return "—"
    rounded = int(round(value))
    return f"{rounded} d"


def sparkline_path(points: list[tuple[float, float]]) -> str:
    return " ".join(
        f"{'M' if index == 0 else 'L'} {x:.2f} {y:.2f}"
        for index, (x, y) in enumerate(points)
    )


def build_growth_chart(rows: list[dict[str, object]]) -> str:
    width = 920
    height = 280
    padding_left = 56
    padding_right = 18
    padding_top = 24
    padding_bottom = 44
    inner_width = width - padding_left - padding_right
    inner_height = height - padding_top - padding_bottom
    max_bar = max((row["newCustomers"] for row in rows), default=1)
    max_line = max((row["cumulativeCustomers"] for row in rows), default=1)
    step = inner_width / max(len(rows), 1)
    bar_width = min(58, step * 0.48)

    def bar_y(value: int) -> float:
        return padding_top + inner_height - (value / max_bar) * inner_height

    def line_y(value: int) -> float:
        return padding_top + inner_height - (value / max_line) * inner_height

    bars = []
    points = []
    labels = []
    for index, row in enumerate(rows):
        center_x = padding_left + step * index + step / 2
        x = center_x - bar_width / 2
        y = bar_y(int(row["newCustomers"]))
        h = padding_top + inner_height - y
        bars.append(
            f'<rect x="{x:.2f}" y="{y:.2f}" width="{bar_width:.2f}" '
            f'height="{h:.2f}" rx="10" fill="#cfb08a" opacity="0.95" />'
        )
        points.append((center_x, line_y(int(row["cumulativeCustomers"]))))
        labels.append(
            f'<text x="{center_x:.2f}" y="{height - 16}" text-anchor="middle" '
            f'fill="#6d6359" font-size="12">{html.escape(str(row["shortLabel"]))}</text>'
        )

    area_points = [(points[0][0], padding_top + inner_height)] + points + [
        (points[-1][0], padding_top + inner_height)
    ]
    grid = []
    for tick in range(5):
        ratio = tick / 4
        y = padding_top + inner_height - ratio * inner_height
        grid.append(
            f'<line x1="{padding_left}" y1="{y:.2f}" x2="{width - padding_right}" '
            f'y2="{y:.2f}" stroke="#d9d0c7" stroke-dasharray="4 6" />'
        )
    return f"""
    <svg viewBox="0 0 {width} {height}" class="chart-svg" role="img" aria-label="Customer growth chart">
      {''.join(grid)}
      <path d="{sparkline_path(area_points)} Z" fill="rgba(24,22,19,0.08)" />
      {''.join(bars)}
      <path d="{sparkline_path(points)}" fill="none" stroke="#181613" stroke-width="3" stroke-linecap="round" />
      {''.join(f'<circle cx="{x:.2f}" cy="{y:.2f}" r="4.5" fill="#181613" />' for x, y in points)}
      {''.join(labels)}
      <text x="{padding_left}" y="16" fill="#6d6359" font-size="12">new customers</text>
      <text x="{width - padding_right}" y="16" fill="#6d6359" font-size="12" text-anchor="end">cumulative customers</text>
    </svg>
    """


def build_distribution_html(items: list[dict[str, object]]) -> str:
    max_value = max((int(item["count"]) for item in items), default=1)
    rows = []
    for item in items:
        width = 100 * (int(item["count"]) / max_value if max_value else 0)
        rows.append(
            """
            <div class="distribution-row">
              <div class="distribution-head">
                <span>{label}</span>
                <span>{count}</span>
              </div>
              <div class="distribution-track">
                <div class="distribution-bar" style="width:{width:.1f}%"></div>
              </div>
            </div>
            """.format(
                label=html.escape(str(item["label"])),
                count=html.escape(fmt_number(int(item["count"]))),
                width=width,
            )
        )
    return "".join(rows)


def source_label(value: object) -> str:
    source = str(value or "").strip()
    return {
        "WIDGET_WEB": "Web",
        "WIDGET_FACEBOOK": "Facebook",
        "WIDGET_INSTAGRAM": "Instagram",
        "SCHEDULER": "Manual",
    }.get(source, source.replace("_", " ").title() or "Unknown")


def icon_svg(name: str) -> str:
    icons = {
        "users": """
            <path d="M16 21v-1.2a3.8 3.8 0 0 0-3.8-3.8H6.8A3.8 3.8 0 0 0 3 19.8V21" />
            <circle cx="9.5" cy="8" r="3" />
            <path d="M21 21v-1.2a3.8 3.8 0 0 0-2.8-3.65" />
            <path d="M15.5 5.1a3 3 0 0 1 0 5.8" />
        """,
        "spark": """
            <path d="M4 16.5 9 11l3.2 3.2L20 6.5" />
            <path d="M15.5 6.5H20v4.5" />
        """,
        "repeat": """
            <path d="M17 2.5 21 6l-4 3.5" />
            <path d="M3 11V9a3 3 0 0 1 3-3h15" />
            <path d="M7 21.5 3 18l4-3.5" />
            <path d="M21 13v2a3 3 0 0 1-3 3H3" />
        """,
        "calendar": """
            <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
            <path d="M8 2.5v4M16 2.5v4M3 9.5h18" />
        """,
        "alert": """
            <path d="M12 4 21 19H3L12 4Z" />
            <path d="M12 9v4.5M12 17h.01" />
        """,
        "clock": """
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5v5l3.5 2" />
        """,
        "source": """
            <path d="M4 7h10" />
            <path d="M14 7l-2.5-2.5M14 7l-2.5 2.5" />
            <path d="M20 17H10" />
            <path d="M10 17l2.5-2.5M10 17l2.5 2.5" />
        """,
        "list": """
            <path d="M9 6h11M9 12h11M9 18h11" />
            <circle cx="4.5" cy="6" r="1" />
            <circle cx="4.5" cy="12" r="1" />
            <circle cx="4.5" cy="18" r="1" />
        """,
    }
    paths = icons.get(name, icons["list"])
    return (
        '<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-svg" '
        'fill="none" stroke="currentColor" stroke-width="1.8" '
        'stroke-linecap="round" stroke-linejoin="round">'
        f"{paths}</svg>"
    )


def status_badge(status: str) -> str:
    tone = {
        "Lead / no visit yet": "muted",
        "First visit booked": "accent",
        "New customer": "muted",
        "Second visit booked": "accent",
        "Returning and booked": "accent",
        "Returning on cycle": "good",
        "Watchlist": "watch",
        "Overdue returner": "late",
        "History outside current export": "muted",
    }.get(status, "good")
    return f'<span class="state state-{tone}">{html.escape(status)}</span>'


def render_customer_row(row: dict[str, object]) -> str:
    return """
    <tr>
      <td>
        <div class="name-cell">
          <strong>{name}</strong>
          <span>{segment}</span>
        </div>
      </td>
      <td class="cell-number">{visits}</td>
      <td>
        <div class="cell-stack">
          <strong>{last_visit}</strong>
          <span>{days_since}</span>
        </div>
      </td>
      <td>{cycle}</td>
      <td class="next-cell">{next_visit}</td>
      <td>{status}</td>
    </tr>
    """.format(
        name=html.escape(str(row["name"])),
        segment=html.escape(str(row["segment"])),
        visits=html.escape(fmt_number(int(row["loyaltyVisits"]))),
        last_visit=html.escape(fmt_date(row["lastVisit"])),
        cycle=html.escape(fmt_day_count(row["expectedCycleDays"])),
        days_since=html.escape(
            "no visit yet"
            if row["daysSinceLastVisit"] is None
            else f"{fmt_day_count(row['daysSinceLastVisit'])} ago"
        ),
        next_visit=html.escape(fmt_date(row["nextVisit"])),
        status=status_badge(str(row["status"])),
    )


def build_html(report: dict[str, object]) -> str:
    snapshot = report["snapshot"]
    growth_chart = build_growth_chart(report["growth"])
    frequency_html = build_distribution_html(report["frequencyBuckets"])
    cycle_html = build_distribution_html(report["cycleBuckets"])
    actions_html = "".join(
        """
        <article class="action-card action-card-{tone}">
          <div class="action-top">
            <div>
              <div class="action-label">{label}</div>
              <div class="action-count">{count}</div>
            </div>
            <span class="icon icon-small">{icon}</span>
          </div>
          <p class="action-note">{note}</p>
          <div class="name-tags">{names}</div>
        </article>
        """.format(
            tone=html.escape(str(item["tone"])),
            label=html.escape(str(item["label"])),
            count=html.escape(fmt_number(int(item["count"]))),
            icon=icon_svg(str(item["icon"])),
            note=html.escape(str(item["note"])),
            names="".join(
                f'<span class="name-tag">{html.escape(str(name))}</span>'
                for name in item["names"]
            )
            or '<span class="name-tag name-tag-muted">none</span>',
        )
        for item in report["actions"]
    )
    source_rows = "".join(
        """
        <tr>
          <td>{source}</td>
          <td class="cell-number">{customers}</td>
          <td class="cell-number">{repeat_rate}</td>
          <td class="cell-number">{booked}</td>
        </tr>
        """.format(
            source=html.escape(str(row["source"])),
            customers=html.escape(fmt_number(int(row["customers"]))),
            repeat_rate=html.escape(fmt_percent(float(row["repeatRate"]))),
            booked=html.escape(fmt_number(int(row["booked"]))),
        )
        for row in report["sourcePerformance"]
    )
    customer_rows = "".join(render_customer_row(row) for row in report["customers"])

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Diara Manicure Customer Analysis</title>
  <style>
    :root {{
      --bg: #f3eee7;
      --surface: rgba(255, 255, 255, 0.74);
      --surface-soft: rgba(255, 255, 255, 0.52);
      --line: #d8cec3;
      --line-strong: #c5b6a8;
      --text: #181613;
      --muted: #6a6057;
      --accent: #ae8357;
      --accent-soft: #d7b997;
      --good: #2d4a37;
      --watch: #8a6127;
      --late: #7e3227;
      --radius: 18px;
    }}

    * {{
      box-sizing: border-box;
    }}

    html {{
      background: var(--bg);
    }}

    body {{
      margin: 0;
      font-family: "Aptos", "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at top left, rgba(174, 131, 87, 0.14), transparent 26%),
        linear-gradient(180deg, #f7f3ed 0%, #f1ece5 100%);
      color: var(--text);
      font-variant-numeric: tabular-nums;
    }}

    .page {{
      width: min(1180px, calc(100vw - 28px));
      margin: 0 auto;
      padding: 24px 0 52px;
    }}

    h1, h2, p {{
      margin: 0;
    }}

    .topbar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--line);
    }}

    .brand {{
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--muted);
    }}

    .brand-mark {{
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--accent) 0%, #191613 100%);
    }}

    .stamp {{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 14px;
      color: var(--muted);
      font-size: 12px;
    }}

    .stamp span {{
      white-space: nowrap;
    }}

    .hero {{
      padding: 22px 0 18px;
    }}

    .hero h1 {{
      font-size: clamp(34px, 5.6vw, 66px);
      line-height: 0.96;
      letter-spacing: -0.06em;
      max-width: 8.8ch;
    }}

    .hero-copy {{
      margin-top: 12px;
      max-width: 52ch;
      color: var(--muted);
      font-size: 15px;
      line-height: 1.6;
    }}

    .hero-notes {{
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }}

    .hero-note {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 11px;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: var(--surface-soft);
      color: var(--muted);
      font-size: 12px;
      line-height: 1;
    }}

    section {{
      padding-top: 16px;
    }}

    .stats {{
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
    }}

    .stat {{
      padding: 14px 14px 16px 0;
      border-right: 1px solid var(--line);
    }}

    .stat:last-child {{
      border-right: 0;
      padding-right: 0;
    }}

    .stat-head {{
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      color: var(--muted);
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }}

    .icon {{
      width: 28px;
      height: 28px;
      display: inline-grid;
      place-items: center;
      border-radius: 999px;
      border: 1px solid var(--line);
      color: var(--accent);
      background: rgba(255, 255, 255, 0.55);
    }}

    .icon-small {{
      width: 24px;
      height: 24px;
    }}

    .icon-svg {{
      width: 14px;
      height: 14px;
    }}

    .stat-value {{
      display: block;
      font-size: clamp(25px, 3vw, 42px);
      line-height: 0.95;
      letter-spacing: -0.06em;
      margin-bottom: 8px;
    }}

    .stat-copy {{
      display: block;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.45;
      max-width: 22ch;
    }}

    .main-grid {{
      display: grid;
      grid-template-columns: 1.22fr 0.96fr;
      gap: 16px;
    }}

    .sub-grid {{
      display: grid;
      grid-template-columns: 0.95fr 0.95fr 1.1fr;
      gap: 16px;
    }}

    .sheet {{
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--surface);
      backdrop-filter: blur(8px);
      padding: 16px 18px 18px;
    }}

    .sheet-head {{
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 12px;
      margin-bottom: 14px;
    }}

    .sheet-title {{
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    .sheet-title h2 {{
      font-size: 20px;
      line-height: 1;
      letter-spacing: -0.04em;
    }}

    .sheet-copy {{
      color: var(--muted);
      font-size: 12px;
      line-height: 1.5;
      max-width: 38ch;
    }}

    .chart-svg {{
      width: 100%;
      height: auto;
      display: block;
    }}

    .action-grid {{
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }}

    .action-card {{
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 12px 13px 13px;
      background: rgba(255, 255, 255, 0.48);
    }}

    .action-card-accent {{
      border-color: rgba(174, 131, 87, 0.45);
    }}

    .action-card-watch {{
      border-color: rgba(138, 97, 39, 0.38);
    }}

    .action-card-late {{
      border-color: rgba(126, 50, 39, 0.38);
    }}

    .action-card-good {{
      border-color: rgba(45, 74, 55, 0.34);
    }}

    .action-top {{
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 10px;
    }}

    .action-label {{
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 8px;
    }}

    .action-count {{
      font-size: 32px;
      line-height: 0.95;
      letter-spacing: -0.06em;
    }}

    .action-note {{
      margin-top: 6px;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.45;
    }}

    .name-tags {{
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }}

    .name-tag {{
      display: inline-flex;
      align-items: center;
      padding: 5px 8px;
      border-radius: 999px;
      background: rgba(24, 22, 19, 0.05);
      color: var(--text);
      font-size: 12px;
    }}

    .name-tag-muted {{
      color: var(--muted);
    }}

    .distribution-grid {{
      display: grid;
      gap: 12px;
    }}

    .distribution-row {{
      display: grid;
      gap: 7px;
    }}

    .distribution-head {{
      display: flex;
      justify-content: space-between;
      gap: 12px;
      font-size: 13px;
    }}

    .distribution-track {{
      height: 8px;
      border-radius: 999px;
      background: rgba(24, 22, 19, 0.06);
      overflow: hidden;
    }}

    .distribution-bar {{
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #181613 0%, #cfb08a 100%);
    }}

    table {{
      width: 100%;
      border-collapse: collapse;
    }}

    th, td {{
      padding: 11px 0;
      text-align: left;
      border-top: 1px solid var(--line);
      vertical-align: middle;
      font-size: 13px;
    }}

    th {{
      color: var(--muted);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      font-weight: 500;
    }}

    .name-cell {{
      display: grid;
      gap: 3px;
    }}

    .name-cell span {{
      color: var(--muted);
      font-size: 12px;
    }}

    .cell-stack {{
      display: grid;
      gap: 3px;
    }}

    .cell-stack span,
    .next-cell {{
      color: var(--muted);
      font-size: 12px;
    }}

    .cell-number {{
      white-space: nowrap;
    }}

    .state {{
      position: relative;
      display: inline-flex;
      align-items: center;
      padding-left: 12px;
      white-space: nowrap;
      font-size: 12px;
      color: var(--text);
    }}

    .state::before {{
      content: "";
      position: absolute;
      left: 0;
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: currentColor;
    }}

    .state-good {{
      color: var(--good);
    }}

    .state-accent {{
      color: var(--accent);
    }}

    .state-watch {{
      color: var(--watch);
    }}

    .state-late {{
      color: var(--late);
    }}

    .state-muted {{
      color: var(--muted);
    }}

    .footnote {{
      margin-top: 14px;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.55;
    }}

    .table-wrap {{
      overflow-x: auto;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: rgba(255, 255, 255, 0.52);
      padding: 0 18px;
    }}

    .table-wrap table {{
      min-width: 640px;
    }}

    @media (max-width: 960px) {{
      .hero,
      .main-grid,
      .sub-grid,
      .stats {{
        grid-template-columns: 1fr;
      }}

      .stat {{
        border-right: 0;
        border-bottom: 1px solid var(--line);
        padding-right: 0;
      }}

      .stat:last-child {{
        border-bottom: 0;
      }}

      .action-grid {{
        grid-template-columns: 1fr;
      }}
    }}
  </style>
</head>
<body>
  <main class="page">
    <header class="topbar">
      <div class="brand">
        <span class="brand-mark"></span>
        <span>Diara customer board</span>
      </div>
      <div class="stamp">
        <span>as of {html.escape(fmt_date(report["meta"]["analysisDate"]))}</span>
        <span>window {html.escape(fmt_date(report["meta"]["visitWindowStart"]))} → {html.escape(fmt_date(report["meta"]["visitWindowEnd"]))}</span>
      </div>
    </header>

    <section class="hero">
      <div>
        <h1>Grow the base. Pull back the late returners.</h1>
        <p class="hero-copy">{html.escape(report["summary"])}</p>
        <div class="hero-notes">
          <span class="hero-note">{html.escape(fmt_number(snapshot["singleVisitCustomers"]))} one-visit customers</span>
          <span class="hero-note">{html.escape(fmt_number(snapshot["returningCustomers"]))} repeat customers</span>
          <span class="hero-note">{html.escape(fmt_number(snapshot["bookedNext"]))} already booked next</span>
        </div>
      </div>
    </section>

    <section>
      <div class="stats">
        <div class="stat">
          <div class="stat-head"><span class="icon">{icon_svg("users")}</span><span>Base</span></div>
          <span class="stat-value">{fmt_number(snapshot["totalCustomers"])}</span>
          <span class="stat-copy">all customer records</span>
        </div>
        <div class="stat">
          <div class="stat-head"><span class="icon">{icon_svg("spark")}</span><span>New {html.escape(snapshot["currentMonthShort"])}</span></div>
          <span class="stat-value">{fmt_number(snapshot["newThisMonth"])}</span>
          <span class="stat-copy">first-time customers this month</span>
        </div>
        <div class="stat">
          <div class="stat-head"><span class="icon">{icon_svg("repeat")}</span><span>2nd visit</span></div>
          <span class="stat-value">{fmt_percent(snapshot["secondVisitRate"]) if snapshot["secondVisitRate"] is not None else "—"}</span>
          <span class="stat-copy">customers with 2+ visits</span>
        </div>
        <div class="stat">
          <div class="stat-head"><span class="icon">{icon_svg("clock")}</span><span>Cycle</span></div>
          <span class="stat-value">{fmt_day_count(snapshot["medianCycleDays"])}</span>
          <span class="stat-copy">median return rhythm</span>
        </div>
        <div class="stat">
          <div class="stat-head"><span class="icon">{icon_svg("calendar")}</span><span>Booked</span></div>
          <span class="stat-value">{fmt_number(snapshot["bookedNext"])}</span>
          <span class="stat-copy">customers already rebooked</span>
        </div>
        <div class="stat">
          <div class="stat-head"><span class="icon">{icon_svg("alert")}</span><span>Late</span></div>
          <span class="stat-value">{fmt_number(snapshot["overdueReturners"])}</span>
          <span class="stat-copy">overdue returners</span>
        </div>
      </div>
    </section>

    <section class="main-grid">
      <article class="sheet">
        <div class="sheet-head">
          <div>
            <div class="sheet-title">
              <span class="icon">{icon_svg("spark")}</span>
              <h2>Snowball growth</h2>
            </div>
            <p class="sheet-copy">new customers by month, with cumulative active base layered on top</p>
          </div>
        </div>
        {growth_chart}
      </article>

      <article class="sheet">
        <div class="sheet-head">
          <div>
            <div class="sheet-title">
              <span class="icon">{icon_svg("list")}</span>
              <h2>Action now</h2>
            </div>
            <p class="sheet-copy">the compact list worth acting on first</p>
          </div>
        </div>
        <div class="action-grid">
          {actions_html}
        </div>
      </article>
    </section>

    <section class="sub-grid">
      <article class="sheet">
        <div class="sheet-head">
          <div>
            <div class="sheet-title">
              <span class="icon">{icon_svg("users")}</span>
              <h2>Visit mix</h2>
            </div>
            <p class="sheet-copy">how deep the customer base really is</p>
          </div>
        </div>
        <div class="distribution-grid">{frequency_html}</div>
      </article>

      <article class="sheet">
        <div class="sheet-head">
          <div>
            <div class="sheet-title">
              <span class="icon">{icon_svg("clock")}</span>
              <h2>Return rhythm</h2>
            </div>
            <p class="sheet-copy">usual cycle among repeat customers</p>
          </div>
        </div>
        <div class="distribution-grid">{cycle_html}</div>
      </article>

      <article class="sheet">
        <div class="sheet-head">
          <div>
            <div class="sheet-title">
              <span class="icon">{icon_svg("source")}</span>
              <h2>Source quality</h2>
            </div>
            <p class="sheet-copy">which channels bring customers who actually return</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Acquired</th>
              <th>2+ visit rate</th>
              <th>Booked</th>
            </tr>
          </thead>
          <tbody>
            {source_rows}
          </tbody>
        </table>
      </article>
    </section>

    <section>
      <article class="sheet">
        <div class="sheet-head">
          <div>
            <div class="sheet-title">
              <span class="icon">{icon_svg("list")}</span>
              <h2>Customer base</h2>
            </div>
            <p class="sheet-copy">latest visit always uses the fresher date from either export; rhythm uses confirmed reservation history</p>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Visits</th>
                <th>Last</th>
                <th>Rhythm</th>
                <th>Next</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {customer_rows}
            </tbody>
          </table>
        </div>
        <p class="footnote">
          Same-day duplicate reservations are merged into one visit. Customers with older history outside this reservation export can still appear here, but their cycle may stay blank until that history is visible in the reservation file.
        </p>
      </article>
    </section>
  </main>
</body>
</html>
"""


def build_report(
    reservations_path: Path,
    customers_path: Path,
    output_html_path: Path,
    output_json_path: Path,
    analysis_date: str,
) -> dict[str, object]:
    as_of = pd.Timestamp(f"{analysis_date} 23:59:59")

    reservations = pd.read_excel(reservations_path)
    customers = pd.read_excel(customers_path)

    reservations["start"] = reservations["Začiatok"].apply(parse_datetime)
    reservations["created"] = reservations["Vytvorená"].apply(parse_datetime)
    reservations["key"] = reservations.apply(build_customer_key, axis=1)
    reservations["name"] = reservations["Meno"].apply(normalize_name)
    reservations["day"] = reservations["start"].dt.floor("D")

    customers["key"] = customers.apply(build_customer_key, axis=1)
    customers["name"] = customers["Meno"].apply(normalize_name)
    customers["lastVisitParsed"] = customers["Posledná návšteva"].apply(parse_datetime)
    customer_name_map = (
        customers.sort_values("name").drop_duplicates("key").set_index("key")["name"].to_dict()
    )
    loyalty_by_key = (
        customers.sort_values("Vernosť").drop_duplicates("key", keep="last").set_index("key")["Vernosť"].to_dict()
    )
    customer_last_visit_map = (
        customers.sort_values("lastVisitParsed")
        .drop_duplicates("key", keep="last")
        .set_index("key")["lastVisitParsed"]
        .to_dict()
    )

    completed = reservations[
        (reservations["Stav"] == "CONFIRMED") & (reservations["start"] <= as_of)
    ].copy()
    future = reservations[
        (reservations["Stav"] == "CONFIRMED") & (reservations["start"] > as_of)
    ].copy()
    completed_visits = completed.sort_values(["key", "start"]).drop_duplicates(
        ["key", "day"], keep="last"
    )
    completed_visits = completed_visits.sort_values(["key", "start"]).reset_index(drop=True)

    overall_gaps: list[int] = []
    visit_metrics: dict[str, dict[str, object]] = {}
    for key, group in completed_visits.groupby("key"):
        starts = list(group["start"])
        gaps = [(starts[index] - starts[index - 1]).days for index in range(1, len(starts))]
        overall_gaps.extend(gaps)
        visit_metrics[key] = {
            "name": customer_name_map.get(key, group["name"].iloc[-1]),
            "visitsInWindow": int(len(group)),
            "firstVisit": starts[0],
            "lastVisit": starts[-1],
            "gaps": gaps,
        }

    overall_cycle = float(pd.Series(overall_gaps).median()) if overall_gaps else None
    future_map = (
        future.sort_values("start")
        .drop_duplicates("key", keep="first")
        .set_index("key")["start"]
        .to_dict()
    )

    overdue_customers: list[dict[str, object]] = []
    for key, metrics in visit_metrics.items():
        gaps = metrics["gaps"]
        personal_cycle = float(pd.Series(gaps).median()) if gaps else None
        expected_cycle = clamp_cycle(personal_cycle if personal_cycle is not None else overall_cycle)
        reservation_last_visit = metrics["lastVisit"]
        customer_last_visit = customer_last_visit_map.get(key, pd.NaT)
        if pd.notna(customer_last_visit) and (
            pd.isna(reservation_last_visit) or customer_last_visit > reservation_last_visit
        ):
            last_visit = customer_last_visit
        else:
            last_visit = reservation_last_visit
        days_since = (as_of - last_visit).days if pd.notna(last_visit) else None
        next_visit = future_map.get(key)
        overdue_days = (
            float(days_since - expected_cycle)
            if days_since is not None and expected_cycle is not None
            else None
        )
        overdue_flag = bool(
            metrics["visitsInWindow"] >= 2
            and next_visit is None
            and expected_cycle is not None
            and days_since is not None
            and overdue_days is not None
            and overdue_days >= OVERDUE_BUFFER_DAYS
            and (days_since / expected_cycle) >= OVERDUE_RATIO
        )
        metrics.update(
            {
                "personalCycleDays": personal_cycle,
                "expectedCycleDays": expected_cycle,
                "lastVisit": last_visit,
                "reservationLastVisit": reservation_last_visit,
                "daysSinceLastVisit": days_since,
                "nextVisit": next_visit,
                "overdueDays": overdue_days,
                "overdueFlag": overdue_flag,
            }
        )
        if overdue_flag:
            overdue_customers.append(
                {
                    "name": metrics["name"],
                    "visits": metrics["visitsInWindow"],
                    "expectedCycleDays": expected_cycle,
                    "lastVisit": to_iso(last_visit),
                    "daysSinceLastVisit": days_since,
                    "overdueDays": overdue_days,
                }
            )

    visit_counts = customers["Vernosť"].value_counts().to_dict()
    frequency_buckets = [
        {"label": "0 visits", "count": int(visit_counts.get(0, 0))},
        {"label": "1 visit", "count": int(visit_counts.get(1, 0))},
        {"label": "2 visits", "count": int(visit_counts.get(2, 0))},
        {"label": "3 visits", "count": int(visit_counts.get(3, 0))},
        {
            "label": "4+ visits",
            "count": int(
                sum(count for loyalty, count in visit_counts.items() if int(loyalty) >= 4)
            ),
        },
    ]

    cycle_bucket_counts = {
        "<= 14 d": 0,
        "15-21 d": 0,
        "22-28 d": 0,
        "29-42 d": 0,
        "43+ d": 0,
    }
    for metrics in visit_metrics.values():
        if metrics["visitsInWindow"] < 2 or metrics["expectedCycleDays"] is None:
            continue
        cycle = float(metrics["expectedCycleDays"])
        if cycle <= 14:
            cycle_bucket_counts["<= 14 d"] += 1
        elif cycle <= 21:
            cycle_bucket_counts["15-21 d"] += 1
        elif cycle <= 28:
            cycle_bucket_counts["22-28 d"] += 1
        elif cycle <= 42:
            cycle_bucket_counts["29-42 d"] += 1
        else:
            cycle_bucket_counts["43+ d"] += 1

    first_visits = (
        completed_visits.groupby("key", as_index=False)["start"].min().rename(
            columns={"start": "firstVisit"}
        )
    )
    monthly_new = (
        first_visits.assign(month=first_visits["firstVisit"].dt.to_period("M").astype(str))
        .groupby("month")
        .size()
    )
    monthly_total = (
        completed_visits.assign(month=completed_visits["start"].dt.to_period("M").astype(str))
        .groupby("month")
        .size()
    )
    repeat_visit_rows = completed_visits.merge(first_visits, on="key", how="left")
    monthly_repeat = (
        repeat_visit_rows[repeat_visit_rows["start"] > repeat_visit_rows["firstVisit"]]
        .assign(month=lambda frame: frame["start"].dt.to_period("M").astype(str))
        .groupby("month")
        .size()
    )

    if len(completed_visits) > 0:
        month_range = pd.period_range(
            completed_visits["start"].min().to_period("M"),
            completed_visits["start"].max().to_period("M"),
            freq="M",
        )
    else:
        month_range = pd.PeriodIndex([], freq="M")

    cumulative = 0
    growth = []
    for month in month_range.astype(str):
        cumulative += int(monthly_new.get(month, 0))
        growth.append(
            {
                "month": month,
                "label": month_label(month),
                "shortLabel": pd.Period(month, freq="M").strftime("%b"),
                "newCustomers": int(monthly_new.get(month, 0)),
                "repeatVisits": int(monthly_repeat.get(month, 0)),
                "totalVisits": int(monthly_total.get(month, 0)),
                "cumulativeCustomers": cumulative,
            }
        )

    first_visit_sources = completed_visits.sort_values("start").drop_duplicates("key", keep="first")
    source_performance = []
    for source, group in first_visit_sources.groupby("Zdroj rezervácie"):
        keys = set(group["key"])
        customers_acquired = len(keys)
        repeaters = sum(1 for key in keys if int(loyalty_by_key.get(key, 0)) >= 2)
        booked = sum(1 for key in keys if key in future_map)
        source_performance.append(
            {
                "source": source_label(source),
                "customers": customers_acquired,
                "repeaters": repeaters,
                "repeatRate": float(repeaters / customers_acquired * 100)
                if customers_acquired
                else 0.0,
                "booked": booked,
            }
        )
    source_performance = sorted(
        source_performance,
        key=lambda row: (-int(row["customers"]), -float(row["repeatRate"]), str(row["source"])),
    )

    customer_rows = []
    for row in customers.sort_values(["Vernosť", "name"], ascending=[False, True]).to_dict("records"):
        key = row["key"]
        history = visit_metrics.get(key, {})
        loyalty = int(row["Vernosť"])
        next_visit = future_map.get(key)
        last_visit = history.get("lastVisit", row["lastVisitParsed"])
        expected_cycle = history.get("expectedCycleDays")
        days_since = history.get("daysSinceLastVisit")
        overdue_flag = bool(history.get("overdueFlag"))
        has_window_history = bool(history)

        if loyalty == 0 and next_visit is not None:
            status = "First visit booked"
        elif loyalty == 0:
            status = "Lead / no visit yet"
        elif loyalty == 1 and next_visit is not None:
            status = "Second visit booked"
        elif loyalty == 1:
            status = "New customer"
        elif overdue_flag:
            status = "Overdue returner"
        elif next_visit is not None:
            status = "Returning and booked"
        elif expected_cycle is None and not has_window_history:
            status = "History outside current export"
        elif expected_cycle is not None and days_since is not None and days_since > expected_cycle:
            status = "Watchlist"
        else:
            status = "Returning on cycle"

        if loyalty == 0:
            segment = "Lead"
        elif loyalty == 1:
            segment = "New"
        else:
            segment = "Returning"

        customer_rows.append(
            {
                "name": row["name"],
                "segment": segment,
                "loyaltyVisits": loyalty,
                "lastVisit": to_iso(last_visit),
                "expectedCycleDays": expected_cycle,
                "daysSinceLastVisit": days_since,
                "nextVisit": to_iso(next_visit),
                "status": status,
                "sortScore": (
                    0
                    if status == "Overdue returner"
                    else 1
                    if status == "Watchlist"
                    else 2
                    if "booked" in status.lower()
                    else 3
                ),
            }
        )

    customer_rows = sorted(
        customer_rows,
        key=lambda row: (
            row["sortScore"],
            -(row["daysSinceLastVisit"] or -1),
            -row["loyaltyVisits"],
            row["name"],
        ),
    )
    for row in customer_rows:
        row.pop("sortScore", None)

    first_booked_rows = [row for row in customer_rows if row["status"] == "First visit booked"]
    return_booked_rows = [
        row
        for row in customer_rows
        if row["status"] in {"Second visit booked", "Returning and booked"}
    ]
    watchlist_rows = [row for row in customer_rows if row["status"] == "Watchlist"]
    overdue_rows = [row for row in customer_rows if row["status"] == "Overdue returner"]
    actions = [
        {
            "label": "1st booked",
            "count": len(first_booked_rows),
            "note": "new leads already scheduled",
            "names": [row["name"] for row in first_booked_rows[:4]],
            "tone": "accent",
            "icon": "calendar",
        },
        {
            "label": "Return booked",
            "count": len(return_booked_rows),
            "note": "second or repeat visits already in",
            "names": [row["name"] for row in return_booked_rows[:4]],
            "tone": "good",
            "icon": "repeat",
        },
        {
            "label": "Watchlist",
            "count": len(watchlist_rows),
            "note": "at or just past the usual cycle",
            "names": [row["name"] for row in watchlist_rows[:4]],
            "tone": "watch",
            "icon": "clock",
        },
        {
            "label": "Overdue",
            "count": len(overdue_rows),
            "note": "well past the usual cycle",
            "names": [row["name"] for row in overdue_rows[:4]],
            "tone": "late",
            "icon": "alert",
        },
    ]

    total_customers = int(len(customers))
    zero_visit_customers = int((customers["Vernosť"] == 0).sum())
    first_visit_booked = int(
        ((customers["Vernosť"] == 0) & customers["key"].isin(future_map.keys())).sum()
    )
    visited_customers = int((customers["Vernosť"] >= 1).sum())
    single_visit_customers = int((customers["Vernosť"] == 1).sum())
    returning_customers = int((customers["Vernosť"] >= 2).sum())
    repeat_share = (
        float(returning_customers / visited_customers * 100) if visited_customers else None
    )
    latest_growth = growth[-1] if growth else None
    booked_next = int(sum(1 for row in customer_rows if row["nextVisit"] is not None))
    summary = (
        f"{single_visit_customers} customers are still one-visit only, "
        f"{returning_customers} have already become repeat clients, "
        f"and {len(overdue_customers)} now look overdue without a future booking."
    )

    report = {
        "meta": {
            "analysisDate": analysis_date,
            "generatedAt": pd.Timestamp.now("UTC").isoformat(),
            "reservationFile": reservations_path.name,
            "customerFile": customers_path.name,
            "visitWindowStart": to_iso(completed_visits["start"].min()) if len(completed_visits) else None,
            "visitWindowEnd": to_iso(completed_visits["start"].max()) if len(completed_visits) else None,
        },
        "summary": summary,
        "snapshot": {
            "totalCustomers": total_customers,
            "visitedCustomers": visited_customers,
            "zeroVisitCustomers": zero_visit_customers,
            "firstVisitBooked": first_visit_booked,
            "singleVisitCustomers": single_visit_customers,
            "returningCustomers": returning_customers,
            "secondVisitRate": repeat_share,
            "repeatShareAmongVisited": repeat_share,
            "activeCustomersInWindow": int(completed_visits["key"].nunique()),
            "completedVisitsInWindow": int(len(completed_visits)),
            "dedupedVisitsInWindow": int(len(completed_visits)),
            "upcomingBookings": int(len(future)),
            "bookedNext": booked_next,
            "medianCycleDays": overall_cycle,
            "watchlistCount": len(watchlist_rows),
            "overdueReturners": int(len(overdue_customers)),
            "newThisMonth": int(latest_growth["newCustomers"]) if latest_growth else 0,
            "currentMonthLabel": str(latest_growth["label"]) if latest_growth else as_of.strftime("%b %Y"),
            "currentMonthShort": as_of.strftime("%b"),
        },
        "growth": growth,
        "frequencyBuckets": frequency_buckets,
        "cycleBuckets": [
            {"label": label, "count": count} for label, count in cycle_bucket_counts.items()
        ],
        "actions": actions,
        "sourcePerformance": source_performance,
        "overdueCustomers": sorted(
            overdue_customers,
            key=lambda row: (-(row["overdueDays"] or 0), -(row["daysSinceLastVisit"] or 0)),
        ),
        "customers": customer_rows,
    }

    output_json_path.parent.mkdir(parents=True, exist_ok=True)
    output_json_path.write_text(
        json.dumps(report, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    output_html_path.write_text(build_html(report), encoding="utf-8")
    return report


def main() -> None:
    parser = argparse.ArgumentParser(description="Build a standalone customer analysis HTML report.")
    parser.add_argument("--reservations", required=True, type=Path)
    parser.add_argument("--customers", required=True, type=Path)
    parser.add_argument(
        "--analysis-date",
        default="2026-04-21",
        help="Date to treat as today in YYYY-MM-DD format.",
    )
    parser.add_argument(
        "--html-output",
        default=Path("private/customer-analysis.html"),
        type=Path,
    )
    parser.add_argument(
        "--json-output",
        default=Path("private/customer-analysis-data.json"),
        type=Path,
    )
    args = parser.parse_args()

    build_report(
        reservations_path=args.reservations,
        customers_path=args.customers,
        output_html_path=args.html_output,
        output_json_path=args.json_output,
        analysis_date=args.analysis_date,
    )


if __name__ == "__main__":
    main()
