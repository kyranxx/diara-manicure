import { fullAddress, siteConfig } from "@/lib/site-config"

export async function GET() {
  return Response.json(
    {
      openapi: "3.1.0",
      info: {
        title: "diara manicure public API",
        version: "1.0.0",
        description: "Public read-only endpoints for live services, health checks, and agent discovery.",
      },
      servers: [
        {
          url: siteConfig.baseUrl,
        },
      ],
      paths: {
        "/api/health": {
          get: {
            operationId: "getHealth",
            summary: "Health status",
            responses: {
              "200": {
                description: "Health status response",
                content: {
                  "application/health+json": {
                    schema: {
                      $ref: "#/components/schemas/HealthResponse",
                    },
                  },
                },
              },
            },
          },
        },
        "/api/services": {
          get: {
            operationId: "listServices",
            summary: "List live public services and pricing",
            responses: {
              "200": {
                description: "Public list of services",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Service",
                      },
                    },
                  },
                },
              },
              "429": {
                description: "Rate limit exceeded",
              },
              "500": {
                description: "Service fetch failed",
              },
            },
          },
        },
      },
      components: {
        schemas: {
          HealthResponse: {
            type: "object",
            properties: {
              status: { type: "string", example: "ok" },
              service: { type: "string", example: siteConfig.name },
              time: { type: "string", format: "date-time" },
            },
            required: ["status", "service", "time"],
          },
          Service: {
            type: "object",
            properties: {
              title: { type: "string", example: "Gélové nechty" },
              description: { type: "string", example: "Precízna modelácia a úprava nechtov." },
              price: { type: "string", example: "35 €" },
              discountedPrice: { type: "string", example: "32 €" },
            },
            required: ["title", "description", "price"],
          },
          BusinessInfo: {
            type: "object",
            properties: {
              businessName: { type: "string", example: siteConfig.name },
              address: { type: "string", example: fullAddress },
              phone: { type: "string", example: siteConfig.phone },
              bookingUrl: { type: "string", format: "uri", example: siteConfig.bookingUrl },
            },
          },
        },
      },
    },
    {
      headers: {
        "Content-Type": "application/openapi+json; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    }
  )
}
