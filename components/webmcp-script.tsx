import { fullAddress, siteConfig } from "@/lib/site-config"

export function WebMcpScript() {
  const info = {
    businessName: siteConfig.name,
    bookingUrl: siteConfig.bookingUrl,
    giftCardPageUrl: siteConfig.giftCardPageUrl,
    giftCardUrl: siteConfig.giftCardUrl,
    phone: siteConfig.phone,
    address: fullAddress,
  }

  const script = `
(() => {
  const modelContext = navigator.modelContext;
  if (!modelContext || typeof modelContext.provideContext !== "function") return;
  const info = ${JSON.stringify(info)};
  const sectionIds = { pricing: "cennik", gallery: "galeria", faq: "faq", contact: "visit" };

  modelContext.provideContext({
    tools: [
      {
        name: "get_business_info",
        description: "Return official booking, contact, and location info for diara manicure.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: () => info,
      },
      {
        name: "open_booking",
        description: "Open the official booking flow or gift-card flow in the browser.",
        inputSchema: {
          type: "object",
          properties: {
            intent: { type: "string", enum: ["appointment", "gift-card"], default: "appointment" },
          },
          additionalProperties: false,
        },
        execute: (args) => {
          const intent = args && args.intent === "gift-card" ? "gift-card" : "appointment";
          const url = intent === "gift-card" ? info.giftCardUrl : info.bookingUrl;
          window.open(url, "_blank", "noopener,noreferrer");
          return { intent, opened: true, url };
        },
      },
      {
        name: "scroll_to_section",
        description: "Scroll to a key section on the page such as pricing, gallery, FAQ, or contact.",
        inputSchema: {
          type: "object",
          properties: { section: { type: "string", enum: ["pricing", "gallery", "faq", "contact"] } },
          required: ["section"],
          additionalProperties: false,
        },
        execute: (args) => {
          const section = args && args.section;
          const element = sectionIds[section] ? document.getElementById(sectionIds[section]) : null;
          if (!element) return { section, found: false };
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return { section, found: true };
        },
      },
    ],
  });
})();
`

  return (
    <script
      id="webmcp-runtime"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  )
}
