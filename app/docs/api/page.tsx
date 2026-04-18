import Link from "next/link"
import { fullAddress, siteConfig } from "@/lib/site-config"

export const dynamic = "force-dynamic"

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Public Docs</p>
          <h1 className="text-4xl font-light tracking-tight md:text-5xl">API and Agent Discovery</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Public machine-readable endpoints for live services, health checks, agent discovery, and a small read-only MCP surface.
          </p>
        </header>

        <section className="space-y-4 rounded-[2rem] bg-beige p-8 dark:bg-card">
          <h2 className="text-2xl font-medium">Base URLs</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>Website: {siteConfig.baseUrl}</li>
            <li>HTTP API: {siteConfig.baseUrl}/api</li>
            <li>MCP endpoint: {siteConfig.baseUrl}/mcp</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">HTTP Endpoints</h2>
          <div className="space-y-4">
            <div className="rounded-3xl border border-border p-6">
              <p className="font-mono text-sm text-primary">GET /api/services</p>
              <p className="mt-2 text-muted-foreground">Live service names, descriptions, prices, and optional discounted prices.</p>
            </div>
            <div className="rounded-3xl border border-border p-6">
              <p className="font-mono text-sm text-primary">GET /api/health</p>
              <p className="mt-2 text-muted-foreground">Health status for monitors, API catalog links, and agent discovery checks.</p>
            </div>
            <div className="rounded-3xl border border-border p-6">
              <p className="font-mono text-sm text-primary">GET /api/openapi</p>
              <p className="mt-2 text-muted-foreground">OpenAPI description for the public HTTP endpoints.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">Well-Known Endpoints</h2>
          <div className="space-y-4">
            <div className="rounded-3xl border border-border p-6">
              <p className="font-mono text-sm text-primary">GET /.well-known/api-catalog</p>
              <p className="mt-2 text-muted-foreground">RFC 9727 API catalog using the linkset JSON format.</p>
            </div>
            <div className="rounded-3xl border border-border p-6">
              <p className="font-mono text-sm text-primary">GET /.well-known/agent-skills/index.json</p>
              <p className="mt-2 text-muted-foreground">Agent skills discovery index with SHA-256 digests for the published skills.</p>
            </div>
            <div className="rounded-3xl border border-border p-6" id="mcp">
              <p className="font-mono text-sm text-primary">GET /.well-known/mcp/server-card.json</p>
              <p className="mt-2 text-muted-foreground">Server card for the public read-only MCP endpoint at <span className="font-mono">{siteConfig.baseUrl}/mcp</span>.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-[2rem] bg-beige p-8 dark:bg-card">
          <h2 className="text-2xl font-medium">Authentication</h2>
          <p className="text-muted-foreground">
            The published HTTP endpoints are public and do not currently require OAuth or OIDC. Because there is no protected API resource or authorization server in this app, OAuth discovery documents are intentionally not published.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">Business Details</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>Booking: {siteConfig.bookingUrl}</li>
            <li>Gift cards: {siteConfig.giftCardUrl}</li>
            <li>Phone: {siteConfig.phone}</li>
            <li>Address: {fullAddress}</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-border p-6">
          <p className="text-muted-foreground">
            Back to the <Link href="/" className="text-primary underline-offset-4 hover:underline">homepage</Link>.
          </p>
        </section>
      </div>
    </main>
  )
}
