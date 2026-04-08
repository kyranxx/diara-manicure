"use client"

import { useState, useEffect, useCallback } from "react"
import Script from "next/script"
import SchemaMarkup from "@/components/schema-markup"
import { Navbar } from "@/components/navbar"

// Section Components
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Gallery } from "@/components/sections/Gallery"
import { About } from "@/components/sections/About"
import { Testimonials } from "@/components/sections/Testimonials"
import { FAQ } from "@/components/sections/FAQ"
import { GiftCards } from "@/components/sections/GiftCards"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { Lightbox } from "@/components/sections/Lightbox"

interface Service {
  title: string
  description: string
  price: string
  discountedPrice?: string
}

interface Testimonial {
  text: string
  author: string
  photo?: string | null
  rating?: number
}

// Google API type declarations
interface GoogleReview {
  text?: string | { text?: string }
  rating?: number
  authorAttribution?: {
    displayName?: string
    photoURI?: string
  }
  publishTime?: string
  time?: number
  relativePublishTimeDescription?: string
}

interface GooglePlace {
  reviews?: GoogleReview[]
  fetchFields: (options: { fields: string[] }) => Promise<void>
}

interface GooglePlaceClass {
  searchByText: (request: { textQuery: string; fields: string[]; language: string }) => Promise<{ places: GooglePlace[] }>
}

interface WindowWithGoogle extends Window {
  google?: {
    maps?: {
      importLibrary: (library: string) => Promise<{ Place: GooglePlaceClass }>
    }
  }
}

// Gallery images for lightbox
const galleryImages = [
  { src: "/gelove-nechty-trnava-gallery-41.jpeg", alt: "Gélové nechty Trnava - ukážka práce 41" },
  { src: "/gelove-nechty-trnava-gallery-40.jpeg", alt: "Gélové nechty Trnava - ukážka práce 40" },
  { src: "/gelove-nechty-trnava-gallery-39.jpeg", alt: "Gélové nechty Trnava - ukážka práce 39" },
  { src: "/gelove-nechty-trnava-gallery-38.jpeg", alt: "Gélové nechty Trnava - ukážka práce 38" },
  { src: "/gelove-nechty-trnava-gallery-37.jpeg", alt: "Gélové nechty Trnava - ukážka práce 37" },
  { src: "/gelove-nechty-trnava-gallery-36.jpeg", alt: "Gélové nechty Trnava - ukážka práce 36" },
  { src: "/gelove-nechty-trnava-gallery-35.jpeg", alt: "Gélové nechty Trnava - ukážka práce 35" },
  { src: "/gelove-nechty-trnava-gallery-34.jpeg", alt: "Gélové nechty Trnava - ukážka práce 34" },
  { src: "/gelove-nechty-trnava-gallery-33.jpeg", alt: "Gélové nechty Trnava - ukážka práce 33" },
  { src: "/gelove-nechty-trnava-gallery-32.jpeg", alt: "Gélové nechty Trnava - ukážka práce 32" },
  { src: "/gelove-nechty-trnava-gallery-31.jpeg", alt: "Gélové nechty Trnava - ukážka práce 31" },
  { src: "/gelove-nechty-trnava-gallery-30.jpeg", alt: "Gélové nechty Trnava - ukážka práce 30" },
  { src: "/gelove-nechty-trnava-gallery-29.jpeg", alt: "Gelove nechty Trnava - ukazka prace 29" },
  { src: "/gelove-nechty-trnava-gallery-28.jpeg", alt: "Gelove nechty Trnava - ukazka prace 28" },
  { src: "/gelove-nechty-trnava-gallery-27.jpeg", alt: "Gelove nechty Trnava - ukazka prace 27" },
  { src: "/gelove-nechty-trnava-gallery-26.jpeg", alt: "Gélové nechty Trnava - ukážka práce 26" },
  { src: "/gelove-nechty-trnava-gallery-25.jpeg", alt: "Gélové nechty Trnava - ukážka práce 25" },
  { src: "/gelove-nechty-trnava-gallery-24.jpeg", alt: "Gélové nechty Trnava - ukážka práce 24" },
  { src: "/gelove-nechty-trnava-gallery-23.jpeg", alt: "Gélové nechty Trnava - ukážka práce 23" },
  { src: "/gelove-nechty-trnava-gallery-22.jpeg", alt: "Gélové nechty Trnava - ukážka práce 22" },
  { src: "/gelove-nechty-trnava-gallery-21.jpeg", alt: "Gélové nechty Trnava - ukážka práce 21" },
  { src: "/gelove-nechty-trnava-gallery-20.jpeg", alt: "Gélové nechty Trnava - ukážka práce 20" },
  { src: "/gelove-nechty-trnava-gallery-19.jpeg", alt: "Gélové nechty Trnava - ukážka práce 19" },
  { src: "/gelove-nechty-trnava-gallery-18.jpeg", alt: "Gélové nechty Trnava - ukážka práce 18" },
  { src: "/gelove-nechty-trnava-gallery-17.jpeg", alt: "Gélové nechty Trnava - ukážka práce 17" },
  { src: "/gelove-nechty-trnava-gallery-16.jpeg", alt: "Gélové nechty Trnava - ukážka práce 16" },
  { src: "/gelove-nechty-trnava-gallery-15.jpeg", alt: "Gélové nechty Trnava - ukážka práce 15" },
  { src: "/gelove-nechty-trnava-gallery-14.jpeg", alt: "Gélové nechty Trnava - ukážka práce 14" },
  { src: "/gelove-nechty-trnava-gallery-13.jpeg", alt: "Gélové nechty Trnava - ukážka práce 13" },
  { src: "/gelove-nechty-trnava-gallery-12.jpeg", alt: "Gélové nechty Trnava - ukážka práce 12" },
  { src: "/gelove-nechty-trnava-gallery-01.jpeg", alt: "Gélové nechty Trnava - ukážka práce 11" },
  { src: "/gelove-nechty-trnava-gallery-11.jpeg", alt: "Gélové nechty Trnava - ukážka práce 10" },
  { src: "/gelove-nechty-trnava-gallery-10.jpeg", alt: "Gélové nechty Trnava - ukážka práce 09" },
  { src: "/gelove-nechty-trnava-gallery-9.jpeg", alt: "Gélové nechty Trnava - ukážka práce 08" },
  { src: "/gelove-nechty-trnava-gallery-8.jpeg", alt: "Gélové nechty Trnava - ukážka práce 07" },
  { src: "/gelove-nechty-trnava-gallery-7.jpeg", alt: "Gélové nechty Trnava - ukážka práce 06" },
  { src: "/gelove-nechty-trnava-gallery-6.jpeg", alt: "Gélové nechty Trnava - ukážka práce 05" },
  { src: "/gelove-nechty-trnava-gallery-5.jpg", alt: "Gélové nechty Trnava - ukážka práce 04" },
  { src: "/gelove-nechty-trnava-gallery-4.jpeg", alt: "Gélové nechty Trnava - ukážka práce 03" },
  { src: "/gelove-nechty-trnava-gallery-3.jpeg", alt: "Gélové nechty Trnava - ukážka práce 02" },
  { src: "/gelove-nechty-trnava-gallery-2.jpeg", alt: "Gélové nechty Trnava - ukážka práce 01" },
  { src: "/gelove-nechty-trnava-gallery-1.jpeg", alt: "Gélové nechty Trnava - detailné zdobenie" },
]

export default function Home() {
  const [services, setServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false)
  const [shouldLoadGoogleMaps, setShouldLoadGoogleMaps] = useState(false)
  const [bookingUrl] = useState('https://services.bookio.com/diaramanicure/widget?lang=sk')

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      text: "Nechty vyzerajú super a hlavne vydržia bez jedinej chyby celé 3 týždne. Precízna práca, chválim detailnú úpravu.",
      author: "Mária Konečná",
      photo: null,
      rating: 5
    },
    {
      text: "Manikúra za dobrú cenu, Andrea je šikovná. Nechty robí krásne tenké a prirodzené, žiadne hrubé vrstvy. Určite sa vrátim.",
      author: "Janka Poláková",
      photo: null,
      rating: 5
    },
    {
      text: "Maximálna spokojnosť. Mamikérka je ústretová, poradila mi s tvarom a vždy sa snaží urobiť presne to, čo chcem. Nechty mi vydržia dlho lesklé.",
      author: "Lucia Miklošová",
      photo: null,
      rating: 5
    },
    {
      text: "Dobré rozhodnutie prísť sem. Gélové nechty som mala krásne, žiadne odchlipy a vydržali mi perfektne v kuse až do ďalšej dorábky.",
      author: "Petra Sýkorová",
      photo: null,
      rating: 5
    },
    {
      text: "Veľmi pekná a detailná práca s kožtičkou. Naozaj som spokojná s nechtami. Sú na pohľad prirodzené, ale zároveň veľmi pevné a vydržia.",
      author: "Katka Remišová",
      photo: null,
      rating: 5
    },
    {
      text: "Som veľmi spokojná, nechty mi vydržali celé týždne do ďalšieho termínu bez zlomenia. Vidno, že pani manikérka používa kvalitný materiál, ktorý neničí nechty.",
      author: "Peťa Sedláková",
      photo: null,
      rating: 5
    }
  ])

  // Lazy load Google Maps
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadGoogleMaps(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '500px' }
    );

    const reviewsSection = document.getElementById('recenzie');
    if (reviewsSection) {
      observer.observe(reviewsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Check if Google Maps is loaded
  useEffect(() => {
    if (!shouldLoadGoogleMaps) return;

    const checkGoogleMaps = () => {
      if ((window as WindowWithGoogle).google?.maps) {
        setIsGoogleApiLoaded(true);
        return true;
      }
      return false;
    };

    if (checkGoogleMaps()) return;

    const intervalId = setInterval(() => {
      if (checkGoogleMaps()) {
        clearInterval(intervalId);
      }
    }, 500);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 10000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [shouldLoadGoogleMaps]);

  // Fetch Google Reviews
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    let retryTimeout: NodeJS.Timeout;

    const fetchGoogleReviews = async () => {
      const isLoaded = isGoogleApiLoaded || (typeof window !== 'undefined' && !!(window as WindowWithGoogle).google?.maps);

      if (typeof window === 'undefined' || !isLoaded) {
        if (retryCount < maxRetries) {
          retryCount++;
          retryTimeout = setTimeout(fetchGoogleReviews, 2000);
        }
        return;
      }

      try {
        if (!(window as WindowWithGoogle).google?.maps?.importLibrary) {
          if (retryCount < maxRetries) {
            retryCount++;
            retryTimeout = setTimeout(fetchGoogleReviews, 2000);
          }
          return;
        }

        const { Place } = await (window as WindowWithGoogle).google!.maps!.importLibrary('places') as { Place: GooglePlaceClass };

        const request = {
          textQuery: 'Diara Manicure, Hospodárska 53, Trnava, Slovakia',
          fields: ['id', 'displayName'],
          language: 'sk',
        };

        const { places } = await Place.searchByText(request);

        if (!places || places.length === 0) return;

        const place = places[0];
        await place.fetchFields({ fields: ['reviews'] });

        if (place.reviews && place.reviews.length > 0) {
          const sortedReviews = [...place.reviews].sort((a: GoogleReview, b: GoogleReview) => {
            const getTime = (review: GoogleReview) => {
              if (review.publishTime) return new Date(review.publishTime).getTime();
              if (review.time) return review.time * 1000;
              return 0;
            };
            return getTime(b) - getTime(a);
          });

          const googleReviews: Testimonial[] = sortedReviews
            .filter((review: GoogleReview) => {
              const textObj = review.text;
              const textContent = typeof textObj === 'string' ? textObj : (textObj?.text || '');
              return (review.rating && review.rating >= 4) && (textContent && textContent.trim().length > 0);
            })
            .map((review: GoogleReview) => ({
              text: typeof review.text === 'string' ? review.text : (review.text?.text || ''),
              author: review.authorAttribution?.displayName || 'Anonymous',
              photo: review.authorAttribution?.photoURI || null,
              rating: review.rating
            }));

          if (googleReviews.length > 0) {
            setTestimonials(prev => {
              const uniqueHardcoded = prev.filter(pr => !googleReviews.some(gr => gr.author === pr.author));
              return [...googleReviews, ...uniqueHardcoded].sort(() => Math.random() - 0.5);
            });
          }
        }
      } catch (error) {
        console.log('Error fetching Google reviews:', error);
        if (retryCount < maxRetries) {
          retryCount++;
          retryTimeout = setTimeout(fetchGoogleReviews, 2000);
        }
      }
    };

    const initialTimeout = setTimeout(fetchGoogleReviews, 1000);
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(retryTimeout);
    };
  }, [isGoogleApiLoaded]);

  // Fetch Services
  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services', { signal: controller.signal })
        if (!res.ok) throw new Error('Failed to fetch services')
        const data = await res.json()
        if (isMounted) {
          setServices(data)
          setLoadingServices(false)
        }
      } catch {
        if (isMounted) {
          setServices([])
          setLoadingServices(false)
        }
      }
    }

    fetchServices()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  // Lightbox handles
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    setIsZoomed(false)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    setIsZoomed(false)
    document.body.style.overflow = 'unset'
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => prev === 0 ? galleryImages.length - 1 : prev - 1)
    setIsZoomed(false)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => prev === galleryImages.length - 1 ? 0 : prev + 1)
    setIsZoomed(false)
  }, [])

  const toggleZoom = () => setIsZoomed((prev) => !prev)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext])

  const scrollToVisit = () => document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" })

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <SchemaMarkup />
      <Navbar />

      <main>
        <Hero bookingUrl={bookingUrl} scrollToVisit={scrollToVisit} />
        <Services services={services} loadingServices={loadingServices} bookingUrl={bookingUrl} />
        <Gallery galleryImages={galleryImages} openLightbox={openLightbox} />
        <About />
        <Testimonials testimonials={testimonials} />
        <FAQ />
        <GiftCards />
        <Contact bookingUrl={bookingUrl} />
      </main>

      <Footer />

      {shouldLoadGoogleMaps && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly&loading=async`}
          strategy="lazyOnload"
          onReady={() => setIsGoogleApiLoaded(true)}
        />
      )}

      <Lightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={galleryImages}
        currentIndex={currentImageIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
        isZoomed={isZoomed}
        onToggleZoom={toggleZoom}
      />
    </div>
  )
}
