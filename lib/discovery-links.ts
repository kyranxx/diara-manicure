export function getDiscoveryLinkHeader() {
  return [
    `</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
    `</docs/api>; rel="service-doc"; type="text/html"`,
    `</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"`,
    `</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"`,
  ].join(", ")
}
