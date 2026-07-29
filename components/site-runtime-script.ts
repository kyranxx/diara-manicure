export const siteRuntimeScript = String.raw`
(() => {
  const consentKey = "cookie-consent-prefs";
  const consentEvent = "diara:consent-changed";
  const interactionEvents = ["scroll", "pointerdown", "keydown", "touchstart"];
  let analyticsLoaded = false;
  let clarityLoaded = false;
  const trackedScrollPoints = new Set();
  const trackedLinks = new WeakSet();

  function readConsent() {
    try {
      const stored = window.localStorage.getItem(consentKey);
      return stored ? JSON.parse(stored) : null;
    } catch (_) {
      return null;
    }
  }

  function writeConsent(consent) {
    try {
      window.localStorage.setItem(consentKey, JSON.stringify(consent));
    } catch (_) {}
    window.dispatchEvent(new CustomEvent(consentEvent, { detail: consent }));
  }

  function allDenied() {
    return {
      adStorage: "denied",
      analyticsStorage: "denied",
      adUserData: "denied",
      adPersonalization: "denied",
    };
  }

  function allGranted() {
    return {
      adStorage: "granted",
      analyticsStorage: "granted",
      adUserData: "granted",
      adPersonalization: "granted",
    };
  }

  function currentConsent() {
    return readConsent() || allDenied();
  }

  function clarityConsentPayload(consent) {
    const current = consent || allDenied();
    return {
      ad_Storage: current.adStorage === "granted" ? "granted" : "denied",
      analytics_Storage: current.analyticsStorage === "granted" ? "granted" : "denied",
    };
  }

  function updateClarityConsent(consent) {
    if (typeof window.clarity !== "function") return;
    window.clarity("consentv2", clarityConsentPayload(consent));
  }

  function initThemeButtons() {
    document.addEventListener("click", (event) => {
      const button = event.target && event.target.closest ? event.target.closest("[data-theme-toggle]") : null;
      if (!button) return;
      const next = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", next);
      try {
        window.localStorage.setItem("theme", next ? "dark" : "light");
      } catch (_) {}
    });
  }

  function initMobileMenus() {
    const roots = Array.from(document.querySelectorAll("[data-mobile-menu-root]"));
    if (!roots.length) return;

    roots.forEach((root) => {
      const button = root.querySelector("[data-mobile-menu-toggle]");
      const menu = root.querySelector("[data-mobile-menu]");
      if (!button || !menu) return;
      const openLabel = button.getAttribute("data-open-label") || "Otvoriť menu";
      const closeLabel = button.getAttribute("data-close-label") || "Zavrieť menu";

      function setOpen(open) {
        menu.hidden = !open;
        button.setAttribute("aria-expanded", open ? "true" : "false");
        button.setAttribute("aria-label", open ? closeLabel : openLabel);
      }

      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        setOpen(menu.hidden);
      });

      menu.addEventListener("click", (event) => {
        if (event.target && event.target.closest && event.target.closest("[data-mobile-menu-close]")) {
          setOpen(false);
        }
      });

      document.addEventListener("click", (event) => {
        if (menu.hidden) return;
        if (event.target && root.contains(event.target)) return;
        setOpen(false);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
      });
    });
  }

  function initCookieBanner() {
    const banner = document.getElementById("cookie-consent");
    if (!banner) return;

    if (!readConsent()) {
      setTimeout(() => {
        banner.hidden = false;
      }, 800);
    }

    banner.addEventListener("click", (event) => {
      const button = event.target && event.target.closest ? event.target.closest("[data-cookie-action]") : null;
      if (!button) return;
      const action = button.getAttribute("data-cookie-action");
      writeConsent(action === "accept" ? allGranted() : allDenied());
      banner.hidden = true;
    });
  }

  function shouldLoadAnalytics(consent) {
    return consent && (consent.analyticsStorage === "granted" || consent.adStorage === "granted");
  }

  function getUserId() {
    try {
      let userId = window.localStorage.getItem("ga-anon-user-id");
      if (!userId) {
        userId = (crypto.randomUUID && crypto.randomUUID()) || (Date.now() + "-" + Math.random().toString(36).slice(2, 11));
        window.localStorage.setItem("ga-anon-user-id", userId);
      }
      return userId;
    } catch (_) {
      return "";
    }
  }

  function loadAnalytics(consent) {
    if (analyticsLoaded || !shouldLoadAnalytics(consent)) return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
    window.gtag("consent", "default", consent);
    window.gtag("js", new Date());
    const userId = getUserId();
    window.gtag("config", "G-QCMMZCQZTP", { user_id: userId || undefined });
    window.gtag("config", "AW-17746151386", { user_id: userId || undefined, allow_enhanced_conversions: true });
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-QCMMZCQZTP";
    document.head.appendChild(script);
  }

  function loadClarity(consent) {
    if (!clarityLoaded) {
      clarityLoaded = true;
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "ugccqd16dq");
    }
    updateClarityConsent(consent);
  }

  function loadConsentAwareScripts() {
    const consent = currentConsent();
    loadAnalytics(consent);
    loadClarity(consent);
  }

  function trackEvent(name, params) {
    const consent = readConsent();
    if (!consent || consent.analyticsStorage !== "granted" || typeof window.gtag !== "function") return;
    window.gtag("event", name, params);
  }

  function initTracking() {
    document.addEventListener("click", (event) => {
      const anchor = event.target && event.target.closest ? event.target.closest("a") : null;
      if (!anchor || trackedLinks.has(anchor)) return;
      const href = anchor.href || "";
      let name = "";
      let params = {};
      if (href.includes("bookio.com")) {
        name = href.includes("gift") || href.includes("darcek") ? "gift_card_cta_click" : "booking_cta_click";
        params = {
          event_category: name === "gift_card_cta_click" ? "gift_card" : "booking",
          event_label: (anchor.textContent || "").trim().slice(0, 100) || "tracked_link",
          link_url: href,
        };
      } else if (href.startsWith("tel:")) {
        name = "phone_call_click";
        params = { event_category: "contact", event_label: href.slice(4) };
      } else if (href.includes("instagram.com") || href.includes("facebook.com") || href.includes("m.me") || href.includes("wa.me") || href.includes("whatsapp.com")) {
        name = "social_click";
        params = {
          event_category: "social",
          event_label: href.includes("instagram.com")
            ? "instagram"
            : href.includes("m.me")
              ? "messenger"
              : href.includes("wa.me") || href.includes("whatsapp.com")
                ? "whatsapp"
                : "facebook",
          link_url: href,
        };
      }
      if (!name) return;
      trackedLinks.add(anchor);
      trackEvent(name, params);
    }, { capture: true });

    let scrollTimeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;
        const pct = Math.round((window.scrollY / docHeight) * 100);
        [25, 50, 75, 90, 100].forEach((point) => {
          if (pct >= point && !trackedScrollPoints.has(point)) {
            trackedScrollPoints.add(point);
            trackEvent("scroll_depth", {
              event_category: "engagement",
              event_label: "scroll_" + point,
              value: point,
            });
            if (point === 100) {
              trackEvent("page_read_complete", { event_category: "engagement" });
            }
          }
        });
      }, 300);
    }, { passive: true });
  }

  function initAnalyticsLoading() {
    function removeInteractionListeners(handler) {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handler, { capture: true });
      });
    }
    function handleInteraction() {
      loadConsentAwareScripts();
      removeInteractionListeners(handleInteraction);
    }
    loadClarity(currentConsent());
    window.addEventListener(consentEvent, (event) => {
      loadAnalytics(event.detail);
      loadClarity(event.detail);
    });
    if (window.location.pathname === "/dakujeme") {
      setTimeout(loadConsentAwareScripts, 1000);
    } else {
      interactionEvents.forEach((eventName) => {
        window.addEventListener(eventName, handleInteraction, { once: true, passive: true, capture: true });
      });
      setTimeout(loadConsentAwareScripts, 45000);
    }
  }

  function initGallery() {
    const root = document.querySelector("[data-gallery-root]");
    if (!root) return;
    const content = root.querySelector("[data-gallery-content]");
    if (!content) return;
    const fallbackIds = {
      french: ["60", "55", "54", "49", "47", "44", "41", "40", "34", "25", "24", "21", "17", "12", "9"],
      singleColor: ["64", "62", "58", "53", "52", "50", "46", "42", "39", "37", "33", "32", "30", "29", "28", "27", "26", "23", "20", "19", "16", "15", "14", "13", "11", "10", "6", "5", "4", "3", "2", "1"],
      delicateArt: ["67", "66", "65", "63", "61", "59", "57", "56", "51", "48", "45", "43", "38", "36", "35", "31", "22", "18", "8", "7"],
    };
    function parseIds(value, fallback) {
      const ids = (value || "").split(",").map((id) => id.trim()).filter(Boolean);
      return ids.length ? ids : fallback;
    }
    const sections = [
      { title: root.dataset.french || "", ids: parseIds(root.dataset.frenchIds, fallbackIds.french) },
      { title: root.dataset.singleColor || "", ids: parseIds(root.dataset.singleColorIds, fallbackIds.singleColor) },
      { title: root.dataset.delicateArt || "", ids: parseIds(root.dataset.delicateArtIds, fallbackIds.delicateArt) },
    ];
    const altPrefix = root.dataset.altPrefix || "Gélové nechty Trnava";
    const openLabel = root.dataset.openLabel || "Otvoriť obrázok";
    const instagramLabel = root.dataset.instagram || "Instagram";
    const jpgImageIds = new Set(["5", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67"]);

    function imageSrc(id) {
      return "/gelove-nechty-trnava-gallery-" + id + "." + (jpgImageIds.has(id) ? "jpg" : "jpeg");
    }

    function enhanceExistingGallery() {
      const triggers = Array.from(content.querySelectorAll("[data-gallery-trigger]"));
      if (!triggers.length) return false;
      const allImages = triggers.map((trigger) => {
        const image = trigger.querySelector("img");
        return {
          src: trigger.getAttribute("data-gallery-src") || trigger.getAttribute("href") || (image && image.currentSrc) || "",
          alt: trigger.getAttribute("data-gallery-alt") || (image && image.getAttribute("alt")) || altPrefix,
        };
      }).filter((image) => image.src);
      triggers.forEach((trigger, index) => {
        if (trigger.dataset.galleryBound === "true") return;
        trigger.dataset.galleryBound = "true";
        trigger.addEventListener("click", (event) => {
          event.preventDefault();
          openLightbox(allImages, index);
        });
      });
      return true;
    }

    function openLightbox(images, index) {
      const overlay = document.createElement("div");
      overlay.className = "runtime-lightbox-overlay";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.innerHTML = '<button type="button" data-lightbox-close class="runtime-lightbox-button runtime-lightbox-close" aria-label="Zavrieť">×</button><button type="button" data-prev class="runtime-lightbox-button runtime-lightbox-prev" aria-label="Predchádzajúci">‹</button><button type="button" data-next class="runtime-lightbox-button runtime-lightbox-next" aria-label="Ďalší">›</button><img class="runtime-lightbox-image" alt=""><div class="runtime-lightbox-counter"></div>';
      const img = overlay.querySelector("img");
      const counter = overlay.querySelector(".runtime-lightbox-counter");
      let current = index;
      function render() {
        img.src = images[current].src;
        img.alt = images[current].alt;
        counter.textContent = (current + 1) + " / " + images.length;
      }
      function close() {
        overlay.remove();
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKey);
      }
      function handleKey(event) {
        if (event.key === "Escape") close();
        if (event.key === "ArrowLeft") {
          current = current === 0 ? images.length - 1 : current - 1;
          render();
        }
        if (event.key === "ArrowRight") {
          current = current === images.length - 1 ? 0 : current + 1;
          render();
        }
      }
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay || event.target.closest("[data-lightbox-close]")) close();
        if (event.target.closest("[data-prev]")) {
          current = current === 0 ? images.length - 1 : current - 1;
          render();
        }
        if (event.target.closest("[data-next]")) {
          current = current === images.length - 1 ? 0 : current + 1;
          render();
        }
      });
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      document.body.appendChild(overlay);
      render();
    }

    function renderGallery() {
      const allImages = sections.flatMap((section) => section.ids.map((id) => ({ id, src: imageSrc(id), alt: altPrefix + " " + id })));
      const wrapper = document.createElement("div");
      wrapper.className = "mx-auto mt-12 max-w-6xl space-y-12";
      sections.forEach((section) => {
        const block = document.createElement("div");
        block.innerHTML = '<h3 class="mb-6 text-center text-3xl font-light tracking-tight text-black md:text-4xl dark:text-white"></h3><div class="gallery-centered-grid"></div>';
        block.querySelector("h3").textContent = section.title;
        const grid = block.querySelector(".gallery-centered-grid");
        section.ids.forEach((id) => {
          const item = document.createElement("div");
          item.className = "gallery-centered-item";
          const src = imageSrc(id);
          const alt = altPrefix + " " + id;
          item.innerHTML = '<button type="button" class="group relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-black/10 bg-white/40 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:z-20 hover:shadow-xl dark:border-white/15 dark:bg-white/5"><div class="absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-black/10 transition-colors group-hover:from-black/40"></div><img loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" alt=""></button>';
          const button = item.querySelector("button");
          const image = item.querySelector("img");
          button.setAttribute("aria-label", openLabel + " " + alt);
          image.src = src;
          image.alt = alt;
          button.addEventListener("click", () => openLightbox(allImages, allImages.findIndex((image) => image.src === src)));
          grid.appendChild(item);
        });
        wrapper.appendChild(block);
      });
      const cta = document.createElement("div");
      cta.className = "mt-10 flex flex-col items-center gap-4 text-center";
      cta.innerHTML = '<a href="https://instagram.com/diaramanicure" target="_blank" rel="noopener noreferrer" class="instagram-gradient-border inline-flex h-16 items-center gap-2 rounded-2xl px-10 text-xl font-normal shadow-sm md:h-20 md:px-12"><img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Instagram_Glyph_Gradient_RGB_logo.svg" alt="" loading="lazy" decoding="async" class="size-7" referrerpolicy="no-referrer">' + instagramLabel + '</a>';
      wrapper.appendChild(cta);
      content.appendChild(wrapper);
    }

    if (enhanceExistingGallery()) return;

    if (!("IntersectionObserver" in window)) {
      renderGallery();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      renderGallery();
    }, { rootMargin: "1200px 0px" });
    observer.observe(root);
  }

  function initGoogleReviewsMarquee() {
    const root = document.querySelector("[data-google-reviews-marquee-root]");
    if (!root) return;

    const content = root.querySelector("[data-google-reviews-marquee-content]");
    const status = root.querySelector("[data-google-reviews-status]");
    const googleMapsUrl = root.dataset.googleMapsUrl || "";
    const endpoint = root.dataset.reviewsEndpoint || "/api/google-reviews";
    const loadingLabel = root.dataset.loadingLabel || "Načítavame recenzie z Google Maps...";
    const errorLabel = root.dataset.errorLabel || "Recenzie sa nepodarilo načítať.";

    function setStatus(message) {
      if (status) status.textContent = message;
    }

    function renderFallback(message) {
      setStatus(message);
      if (!content) return;
      content.innerHTML = "";
      const item = document.createElement("div");
      item.className = "google-review-marquee-placeholder mx-auto";
      item.textContent = message;
      content.appendChild(item);
    }

    function reviewText(review) {
      const text = review && review.text;
      if (typeof text === "string") return text.trim();
      return ((text && text.text) || "").trim();
    }

    function reviewTime(review) {
      if (!review) return 0;
      if (review.publishTime) return new Date(review.publishTime).getTime();
      if (review.time) return review.time * 1000;
      return 0;
    }

    function renderStars(rating) {
      const stars = document.createElement("div");
      stars.className = "google-review-stars";
      const score = Math.max(0, Math.min(5, Number(rating) || 0));
      for (let index = 1; index <= 5; index += 1) {
        const star = document.createElement("span");
        star.textContent = "★";
        star.className = index <= score ? "google-review-star-filled" : "google-review-star-empty";
        stars.appendChild(star);
      }
      return stars;
    }

    function createCard(review) {
      const card = document.createElement("article");
      card.className = "google-review-card";

      const top = document.createElement("div");
      top.className = "google-review-topline";
      top.appendChild(renderStars(review.rating));

      const text = document.createElement("p");
      text.className = "google-review-text";
      text.textContent = reviewText(review);

      const author = document.createElement("div");
      author.className = "google-review-author";

      const photoUri =
        review.authorPhotoUri ||
        (review.authorAttribution && (review.authorAttribution.photoUri || review.authorAttribution.photoURI)) ||
        review.profile_photo_url;
      if (photoUri) {
        const photo = document.createElement("img");
        photo.src = photoUri;
        photo.alt = "";
        photo.loading = "lazy";
        photo.decoding = "async";
        photo.referrerPolicy = "no-referrer";
        author.appendChild(photo);
      }

      const authorUri = review.authorUri || (review.authorAttribution && review.authorAttribution.uri) || review.author_url;
      const name = document.createElement(authorUri ? "a" : "span");
      name.textContent =
        review.author ||
        (review.authorAttribution && review.authorAttribution.displayName) ||
        review.author_name ||
        "Google recenzia";
      if (authorUri) {
        name.href = authorUri;
        name.target = "_blank";
        name.rel = "noopener noreferrer";
      }
      author.appendChild(name);

      card.appendChild(top);
      card.appendChild(text);
      card.appendChild(author);
      return card;
    }

    function reviewAuthor(review) {
      return (
        review.author ||
        (review.authorAttribution && review.authorAttribution.displayName) ||
        review.author_name ||
        "Google recenzia"
      );
    }

    function reviewKey(review) {
      return (reviewAuthor(review) + "|" + reviewText(review).slice(0, 120)).toLowerCase();
    }

    function uniqueReviews(reviews) {
      const seen = new Set();
      return reviews.filter((review) => {
        const key = reviewKey(review);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    function shuffledReviews(reviews) {
      const shuffled = reviews.slice();
      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        const current = shuffled[index];
        shuffled[index] = shuffled[randomIndex];
        shuffled[randomIndex] = current;
      }
      return shuffled;
    }

    function sequenceReviews(reviews) {
      if (!reviews.length) return [];
      if (reviews.length === 1) return Array(8).fill(reviews[0]);

      const targetLength = Math.max(reviews.length, 10);
      const sequence = [];

      while (sequence.length < targetLength) {
        const cycle = shuffledReviews(reviews);
        if (sequence.length && sequence[sequence.length - 1] === cycle[0]) {
          cycle.push(cycle.shift());
        }
        sequence.push(...cycle);
      }

      return sequence.slice(0, targetLength);
    }

    function buildTrack(reviews, reverse, extraClass) {
      const track = document.createElement("div");
      track.className =
        "review-marquee-track flex w-max gap-3" +
        (reverse ? " review-marquee-track-reverse" : "") +
        (extraClass ? " " + extraClass : "");
      const sequence = sequenceReviews(reviews);
      sequence.concat(sequence).forEach((review) => {
        track.appendChild(createCard(review));
      });
      return track;
    }

    function setTrackSpeed(track, pixelsPerSecond) {
      const distance = track.scrollWidth / 2;
      track.style.setProperty("--review-marquee-duration", distance / pixelsPerSecond + "s");
    }

    function renderRows(reviews) {
      if (!content) return;
      content.innerHTML = "";
      const rowReviews = [[], [], []];
      shuffledReviews(reviews).forEach((review, index) => {
        rowReviews[index % rowReviews.length].push(review);
      });
      const rows = [
        { track: buildTrack(rowReviews[0], false, ""), pixelsPerSecond: 58 },
        { track: buildTrack(rowReviews[1], true, "mt-4"), pixelsPerSecond: 54 },
        { track: buildTrack(rowReviews[2], false, "review-marquee-track-third mt-4"), pixelsPerSecond: 61 },
      ];
      rows.forEach(({ track }) => content.appendChild(track));
      rows.forEach(({ track, pixelsPerSecond }) => setTrackSpeed(track, pixelsPerSecond));
    }

    function renderReviews(reviews, googleMapsUrl, sourceLabel) {
      const usableReviews = uniqueReviews(
        (reviews || [])
          .filter((review) => Number(review.rating) >= 4 && reviewText(review).length > 0)
          .sort((a, b) => reviewTime(b) - reviewTime(a)),
      );

      if (!usableReviews.length) {
        renderFallback(errorLabel);
        return;
      }

      setStatus(sourceLabel || "Google Maps");
      renderRows(usableReviews);
      if (googleMapsUrl) {
        root.querySelectorAll('a[href*="google.com/maps"]').forEach((anchor) => {
          anchor.href = googleMapsUrl;
        });
      }
    }

    async function loadReviews() {
      setStatus(loadingLabel);
      try {
        const response = await fetch(endpoint, {
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (!data.error && data.reviews && data.reviews.length) {
            renderReviews(data.reviews, data.googleMapsUrl || googleMapsUrl, data.source);
            return;
          }
        }
      } catch (_) {}

      renderFallback(errorLabel);
    }

    function startLoading() {
      loadReviews().catch(() => renderFallback(errorLabel));
    }

    if (!("IntersectionObserver" in window)) {
      startLoading();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      startLoading();
    }, { rootMargin: "700px 0px" });
    observer.observe(root);
  }

  function initLazyImages() {
    const images = Array.from(document.querySelectorAll("img[data-lazy-src]"));
    if (!images.length) return;
    const loadImage = (image) => {
      if (image.dataset.lazySrcset) {
        image.srcset = image.dataset.lazySrcset;
      }
      image.src = image.dataset.lazySrc;
      image.removeAttribute("data-lazy-src");
      image.removeAttribute("data-lazy-srcset");
    };
    if (!("IntersectionObserver" in window)) {
      images.forEach(loadImage);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        loadImage(entry.target);
      });
    }, { rootMargin: "800px 0px" });
    images.forEach((image) => observer.observe(image));
  }

  initThemeButtons();
  initMobileMenus();
  initCookieBanner();
  initTracking();
  initAnalyticsLoading();
  initLazyImages();
  initGallery();
  initGoogleReviewsMarquee();
})();

`
