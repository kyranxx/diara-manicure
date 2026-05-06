export function AnalyticsRuntime() {
  return (
    <script
      id="site-runtime-loader"
      dangerouslySetInnerHTML={{
        __html: `
(() => {
  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    const script = document.createElement("script");
    script.src = "/site-runtime.js";
    script.defer = true;
    document.head.appendChild(script);
  };
  ["pointerdown", "keydown", "touchstart", "scroll"].forEach((eventName) => {
    window.addEventListener(eventName, load, { once: true, passive: true });
  });
  window.addEventListener("load", () => {
    window.setTimeout(load, 7000);
  });
})();
`,
      }}
    />
  )
}
