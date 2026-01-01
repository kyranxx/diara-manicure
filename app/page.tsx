"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, ChevronDown, Star, MapPin, Phone, Mail, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, MessageCircle } from "lucide-react"
import Map from "@/components/ui/custom-map"
import { useTheme } from "next-themes"
import { useState, useEffect, useCallback } from "react"

import SchemaMarkup from "@/components/schema-markup"
import { Navbar } from "@/components/navbar"
import { PricingSkeleton } from "@/components/pricing-skeleton"
import Script from "next/script"

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

// Gallery images for lightbox (newest first)
const galleryImages = [
  { src: "/gelove-nechty-trnava-gallery-11.jpeg", alt: "Gélové nechty ukážka 11" },
  { src: "/gelove-nechty-trnava-gallery-10.jpeg", alt: "Gélové nechty ukážka 10" },
  { src: "/gelove-nechty-trnava-gallery-9.jpeg", alt: "Gélové nechty ukážka 9" },
  { src: "/gelove-nechty-trnava-gallery-8.jpeg", alt: "Gélové nechty ukážka 8" },
  { src: "/gelove-nechty-trnava-gallery-7.jpeg", alt: "Gélové nechty ukážka 7" },
  { src: "/gelove-nechty-trnava-gallery-6.jpeg", alt: "Gélové nechty ukážka 6" },
  { src: "/gelove-nechty-trnava-gallery-5.jpeg", alt: "Gélové nechty ukážka 5" },
  { src: "/gelove-nechty-trnava-gallery-4.jpeg", alt: "Gélové nechty ukážka 4" },
  { src: "/gelove-nechty-trnava-gallery-3.jpeg", alt: "Gélové nechty ukážka 3" },
  { src: "/gelove-nechty-trnava-gallery-2.jpeg", alt: "Gélové nechty ukážka 2" },
  { src: "/gelove-nechty-trnava-gallery-1.jpeg", alt: "Gélové nechty ukážka 1" },
]

export default function Home() {
  const [services, setServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false)
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

  // Check if Google Maps is already loaded (e.g. from cache)
  useEffect(() => {
    const checkGoogleMaps = () => {
      if ((window as any).google?.maps) {
        setIsGoogleApiLoaded(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkGoogleMaps()) return;

    // Poll every 500ms for 10 seconds
    const intervalId = setInterval(() => {
      if (checkGoogleMaps()) {
        clearInterval(intervalId);
      }
    }, 500);

    // Stop polling after 10 seconds
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 10000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      // Check if API is loaded via state OR directly on window
      const isLoaded = isGoogleApiLoaded || (typeof window !== 'undefined' && !!(window as any).google?.maps);

      if (typeof window === 'undefined' || !isLoaded) {
        return;
      }

      try {
        // Double check availability
        if (!(window as any).google?.maps?.importLibrary) {
          return;
        }

        const { Place } = await (window as any).google.maps.importLibrary('places');

        // Search for the place by text instead of using hardcoded ID
        const request = {
          textQuery: 'Diara Manicure, Hospodárska 53, Trnava, Slovakia',
          fields: ['id', 'displayName'],
          language: 'sk',
        };

        const { places } = await Place.searchByText(request);

        if (!places || places.length === 0) {
          return;
        }

        const place = places[0];

        // Fetch reviews for the found place
        await place.fetchFields({
          fields: ['reviews']
        });

        if (place.reviews && place.reviews.length > 0) {
          // Sort by publish time (newest first) before processing
          const sortedReviews = [...place.reviews].sort((a: any, b: any) => {
            const timeA = a.publishTime ? new Date(a.publishTime).getTime() : 0;
            const timeB = b.publishTime ? new Date(b.publishTime).getTime() : 0;
            return timeB - timeA; // Newest first
          });

          const googleReviews: Testimonial[] = sortedReviews
            .filter((review: any) => {
              // Handle both new API (object) and potential legacy/other formats
              const textObj = review.text;
              const textContent = typeof textObj === 'string' ? textObj : (textObj?.text || '');

              const hasText = textContent && textContent.trim().length > 0;
              const isHighRating = review.rating && review.rating >= 4;

              // Filter out those without text and keep only high ratings
              return isHighRating && hasText;
            })
            .map((review: any) => {
              const textObj = review.text;
              const textContent = typeof textObj === 'string' ? textObj : (textObj?.text || '');

              return {
                text: textContent,
                author: review.authorAttribution?.displayName || 'Anonymous',
                photo: review.authorAttribution?.photoURI || null,
                rating: review.rating
              };
            });

          if (googleReviews.length > 0) {
            setTestimonials(prev => {
              // Remove hardcoded reviews that might duplicate the Google ones (by author name)
              const uniqueHardcoded = prev.filter(pr => !googleReviews.some(gr => gr.author === pr.author));
              const merged = [...googleReviews, ...uniqueHardcoded];
              // Shuffle
              const shuffled = merged.sort(() => Math.random() - 0.5);
              return shuffled;
            });
          }
        }
      } catch {
        // Silently handle errors - reviews are not critical
      }
    };

    fetchGoogleReviews();
  }, [isGoogleApiLoaded]);

  const { resolvedTheme } = useTheme()




  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services', { signal: controller.signal })
        if (!res.ok) {
          throw new Error('Failed to fetch services')
        }
        const data = await res.json()
        if (isMounted) {
          setServices(data)
          setLoadingServices(false)
        }
      } catch {
        // Silently ignore all errors (including AbortError)
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



  const scrollToVisit = () => {
    document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" })
  }

  // Lightbox functions
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
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    )
    setIsZoomed(false)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    )
    setIsZoomed(false)
  }, [])

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev)
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return

      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext])







  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <SchemaMarkup />
      <Navbar />

      <main>


        {/* Hero Section - Beige Background */}
        <section className="relative min-h-[auto] md:min-h-[90vh] flex flex-col justify-start pt-20 md:pt-20 pb-12 md:pb-0 items-center text-center px-6 overflow-hidden bg-beige dark:bg-black">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40 pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
            <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-primary/5 to-transparent blur-3xl" />
          </div>

          <div className="mb-8 relative w-full md:max-w-[660px] mx-auto">
            {/* Light Mode Logo */}
            <Image
              src="/logo_day.png"
              alt="Diara Manicure - Nechty Trnava"
              width={1536}
              height={600}
              className="w-full h-auto dark:hidden"
              priority
            />
            {/* Dark Mode Logo */}
            <Image
              src="/logo_night.png"
              alt="Diara Manicure - Nechty Trnava"
              width={1536}
              height={600}
              className="w-full h-auto hidden dark:block"
              priority
            />
          </div>

          <div className="max-w-2xl mx-auto relative">
            <div className="absolute -top-10 -right-2 md:-right-8 rotate-12 bg-white dark:bg-zinc-900 text-primary border border-primary/20 px-5 py-3 rounded-full shadow-xl z-10 animate-in fade-in zoom-in duration-500 delay-300 flex items-baseline gap-1 hover:scale-110 transition-transform cursor-default">
              <span className="font-serif italic text-base text-muted-foreground">od</span>
              <span className="text-2xl font-bold">25€</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 leading-tight">
              Gélové nechty Trnava – nails & manikúra
            </h1>
            <h2 className="text-xl md:text-2xl font-light text-muted-foreground mb-10">
              Exkluzívna starostlivosť o vaše ruky.
              <br className="my-2" />
              <span className="italic font-serif text-primary/80">Best nails Trnava can offer.</span>
            </h2>
          </div>

          <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
            <div className="flex flex-col justify-center gap-4 w-full">
              <Button
                asChild
                className="h-auto py-2 text-xl md:text-2xl rounded-full px-12 md:px-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 w-full flex flex-col items-center gap-2"
              >
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  <span>Pozrieť voľné termíny</span>
                  <div className="bg-beige rounded-full px-4 py-1.5 mt-1">
                    <div className="relative h-4 w-16">
                      <Image
                        src="/bookio_logo.png"
                        alt="Bookio"
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                  </div>
                </a>
              </Button>

              {/* Micro-copy below booking button */}
              <p className="text-sm text-muted-foreground italic text-center -mt-2 mb-4">
                <span className="not-italic font-medium text-primary">💳 Platba možná aj kartou</span> • Nezáväzná rezervácia • Parkovanie zdarma • Káva zdarma
              </p>

              {/* Gift Card Button */}
              <a
                href="#darcekove-poukazky"
                className="w-full py-3 px-6 text-center rounded-full border-2 border-primary/30 hover:border-primary/60 bg-primary/5 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 group flex items-center justify-center gap-2"
              >
                <span className="text-lg">💅</span>
                <span className="font-medium text-foreground">Darčekové poukazy</span>
                <span className="text-lg">✨</span>
              </a>

              {/* Phone Reservation - Anti-scam protected */}
              <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-primary/10 shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Rezervácie telefonicky</p>
                  <a
                    href="tel:+421902163144"
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors tracking-[0.15em]"
                    aria-label="Zavolať na rezerváciu"
                  >
                    <span>+421 902 163 144</span>
                  </a>
                </div>
              </div>

              {/* Facebook Messenger - Contact via chat */}
              <a
                href="https://m.me/diaramanicure"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-[#0084FF]/10 hover:bg-[#0084FF]/20 backdrop-blur-sm border border-[#0084FF]/20 shadow-sm transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0084FF]/20">
                  <MessageCircle className="w-5 h-5 text-[#0084FF]" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Napíšte nám správu</p>
                  <span className="text-lg font-semibold text-foreground">Facebook Messenger</span>
                </div>
              </a>

              <Button
                variant="outline"
                onClick={scrollToVisit}
                className="h-14 md:h-16 text-xl rounded-full px-10 md:px-12 border-primary/20 hover:bg-white/50 hover:text-foreground transition-all duration-300 w-full mb-8"
              >
                Kde nás nájdete
              </Button>

              {/* Quality Message Bubble - Desktop: Upper Left, Mobile: Below buttons */}
              <div className="relative mt-0 xl:absolute xl:left-8 xl:top-[370px] xl:mt-0 w-80 max-w-full mx-auto p-6 rounded-[2rem] bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 shadow-lg text-center hover:scale-105 transition-transform duration-300 hover:shadow-xl z-10">
                <p className="text-lg font-light leading-relaxed text-black dark:text-white">
                  Našou prioritou sú <span className="italic font-serif text-primary">kvalitné európske gély</span> a precízne odvedená práca.
                  <br className="my-6 block" />
                  Ak hľadáte expresnú službu do 30 minút, <span className="italic font-serif text-primary">náš koncept je iný – my si na kvalite dávame záležať</span>.
                </p>
              </div>
            </div>
          </div>
        </section >


        {/* Services Section - White Background */}
        < section id="cennik" className="py-24 bg-white dark:bg-black" >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">Cenník služieb</h2>
              <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                <span className="text-primary font-medium mt-2 block">
                  Otváracia akcia nového salónu! <br />
                  <span className="underline underline-offset-4">Promo ceny platné do 31.1.2026</span>
                </span>
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              {loadingServices ? (
                <PricingSkeleton />
              ) : services.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service, index) => {
                    const hasDiscount = service.discountedPrice && service.discountedPrice.trim() !== '';
                    return (
                      <a
                        key={index}
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex justify-between items-start p-8 bg-beige dark:bg-card rounded-[2rem] hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 border border-transparent hover:border-primary/10 h-full cursor-pointer hover:scale-[1.02]"
                      >
                        {/* TIP Badge for discounted services */}
                        {hasDiscount && (
                          <div className="absolute top-2 right-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                            Najžiadanejšie
                          </div>
                        )}
                        <div className="flex-grow pr-4">
                          <h3 className="text-xl font-normal mb-2 group-hover:text-primary transition-colors text-black dark:text-white">{service.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                        </div>
                        <div className="text-right whitespace-nowrap">
                          {hasDiscount ? (
                            <div className="flex flex-col items-end">
                              <span className="text-sm text-black line-through decoration-1">{service.price}</span>
                              <span className="text-xl font-medium text-primary">{service.discountedPrice}</span>
                            </div>
                          ) : (
                            <span className="text-xl font-medium text-black dark:text-white">{service.price}</span>
                          )}
                        </div>
                      </a>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">Žiadne služby nie sú momentálne dostupné.</div>
              )}
            </div>
          </div>
        </section >

        {/* Gift Cards Section */}
        <section id="darcekove-poukazky" className="py-24 bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-primary/10 dark:via-black dark:to-primary/5 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 text-4xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>✨</div>
            <div className="absolute top-20 right-20 text-3xl opacity-20 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>💅</div>
            <div className="absolute bottom-20 left-1/4 text-5xl opacity-15 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>✨</div>
            <div className="absolute top-1/3 right-10 text-2xl opacity-20 animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.3s' }}>⭐</div>
            <div className="absolute bottom-10 right-1/3 text-3xl opacity-15 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '0.7s' }}>💖</div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Content Column */}
                <div className="text-center md:text-left order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <span>💅</span>
                    <span>Ideálny darček</span>
                    <span>✨</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight text-black dark:text-white">
                    Darčekové poukazy
                  </h2>
                  <div className="w-24 h-1 bg-primary/30 mx-auto md:mx-0 mb-6 rounded-full" />
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                    Hľadáte <span className="text-primary font-medium">praktický darček</span> pre vašich blízkych? Potešte mamu, sestru, priateľku či kolegyňu darčekovým poukazom na profesionálnu manikúru!
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-light">
                    Naše poukazy sú ideálnym darčekom, ktorý poteší každú ženu.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button
                      asChild
                      className="h-14 md:h-16 text-lg md:text-xl rounded-full px-8 md:px-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <a href="https://services.bookio.com/diaramanicure/gift-cards#/" target="_blank" rel="noopener noreferrer">
                        <span className="mr-2">💅</span>
                        Kúpiť poukaz online
                      </a>
                    </Button>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Okamžité doručenie emailom</span>
                    </div>
                  </div>
                </div>

                {/* Image Column */}
                <div className="relative order-1 md:order-2">
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Decorative frame */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-white to-primary/10 dark:from-primary/30 dark:via-black dark:to-primary/20 rounded-[2.5rem] -z-10" />
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
                      {/* Placeholder image - replace with actual gift card image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 flex items-center justify-center">
                        <Image
                          src="/giftcard-winter.jpg"
                          alt="Darčekový poukaz Diara Manicure"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                    {/* Badge */}
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12">
                      ✨ Darček
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Founder & Shop */}
        < section className="py-16 bg-beige/30 dark:bg-black overflow-hidden" >
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              {/* Images Column */}
              <div className="relative h-[400px] w-full max-w-md mx-auto md:mx-0">
                <div className="absolute left-0 top-0 w-[55%] h-[90%] z-10 shadow-xl rounded-2xl overflow-hidden border-4 border-white/50">
                  <Image
                    src="/Andrea_Heckova_diara_manicure_necht_nails_trnava.jpeg"
                    alt="Andrea Hecková - Zakladateľka Diara Manicure Trnava"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700 sepia-[.15]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="absolute right-0 bottom-0 w-[55%] h-[70%] z-20 shadow-xl rounded-2xl overflow-hidden border-4 border-white/50">
                  <Image
                    src="/diara_nails_nechty_trnava_hospodarska.jpeg"
                    alt="Interiér salónu Diara Manicure"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700 sepia-[.15]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>

              {/* Content Column */}
              <div className="md:pl-8 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tight text-black dark:text-white">
                  O nás
                </h2>
                <div className="w-24 h-1 bg-primary/20 mx-auto md:mx-0 mb-6 rounded-full" />
                <h3 className="text-lg text-primary/80 font-serif italic mb-6">
                  Andrea Hečková & diara manicure.
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4 font-light">
                  Vítame vás v našom salóne, kde sa staráme o krásu a zdravie vašich nechtov s láskou a profesionalitou.
                  Ako zakladateľka <strong>diara manicure.</strong> som si splnila sen o vytvorení miesta, kde sa každá klientka bude cítiť výnimočne.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                  Používame len tie najkvalitnejšie materiály a neustále sa vzdelávame v nových trendoch, aby sme vám priniesli tú najlepšiu starostlivosť a najkrajšie nails v Trnave.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="h-px w-12 bg-primary/30"></div>
                  <span className="text-xs uppercase tracking-widest text-primary/60">Zakladateľka</span>
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* Testimonials Section - White Background */}
        < section id="recenzie" className="pt-12 pb-24 overflow-hidden bg-white dark:bg-black" >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">Čo hovoria naše klientky</h2>
              <div className="flex justify-center gap-1 text-primary mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial: Testimonial, index) => (
                <div key={index} className="bg-beige dark:bg-card p-6 rounded-[1.5rem] h-full flex flex-col justify-between hover:bg-beige dark:hover:bg-card/80 transition-colors duration-300">
                  <div>
                    {testimonial.rating && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= (testimonial.rating ?? 0)
                                ? 'fill-primary text-primary'
                                : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                                }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1">
                          {testimonial.photo && testimonial.photo.includes('googleusercontent') && (
                            <div className="relative w-4 h-4 flex-shrink-0" title="Recenzia z Google Maps">
                              <Image
                                src="/Google_Favicon_2025.png"
                                alt="Google"
                                width={16}
                                height={16}
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                          )}
                          <span className="text-sm font-medium text-black dark:text-white">
                            {testimonial.rating?.toFixed(1) ?? '0.0'}
                          </span>
                        </div>
                      </div>
                    )}
                    <p className="text-black/80 dark:text-white/80 italic text-base leading-relaxed mb-4 font-light">
                      "{testimonial.text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {testimonial.photo ? (
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.author}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif italic text-sm">
                        {testimonial.author.charAt(0)}
                      </div>
                    )}
                    <p className="font-medium text-xs tracking-wide uppercase text-muted-foreground">{testimonial.author}</p>
                  </div>
                </div>
              ))}
            </div >
          </div >
        </section >

        {/* Gallery Section - Beige Background */}
        < section id="galeria" className="pt-12 pb-24 bg-white dark:bg-black overflow-hidden" >
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">Nechty našich klientiek</h2>
              <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {galleryImages.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => openLightbox(index)}
                  className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`Otvoriť obrázok: ${image.alt}`}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors z-10 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </button>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                variant="outline"
                className="rounded-full h-16 md:h-20 px-10 md:px-12 text-xl font-normal"
                asChild
              >
                <a
                  href="https://instagram.com/diaramanicure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Instagram className="w-6 h-6" />
                  Sledujte nás na Instagrame
                </a>
              </Button>
            </div>
          </div>
        </section >

        {/* FAQ Section - White Background */}
        < section id="faq" className="py-24 bg-white dark:bg-black" >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">
                Časté otázky<br />o našom nechtovom štúdiu
              </h2>
              <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-beige dark:bg-card p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-medium mb-3 text-black dark:text-white">
                  Kde nájdem vaše nechtové štúdio v Trnave?
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Náš salón diara manicure. Trnava sa nachádza na Hospodárskej 53. Máme vlastné parkovanie zdarma priamo pred vchodom.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-beige dark:bg-card p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-medium mb-3 text-black dark:text-white">
                  Aká je cena za nové gélové nechty?
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Aktuálne máme akciu. Cenník začína na sume 25 € za kompletnú modeláciu nechtov. Táto cena platí aj pre doplnenie nechtov.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-beige dark:bg-card p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-medium mb-3 text-black dark:text-white">
                  Musím sa objednať telefonicky?
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Nie, preferujeme online rezervácie. Kliknite na tlačidlo "Pozrieť voľné termíny" a vyberte si čas, ktorý vám vyhovuje. Objednanie na nechty trvá menej ako minútu.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-beige dark:bg-card p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-medium mb-3 text-black dark:text-white">
                  Robíte aj iné služby ako gélové nechty?
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Áno, špecializujeme sa na gélové nechty, ale v ponuke je aj gél lak a klasická manikúra Trnava.
                </p>
              </div>
            </div>
          </div>
        </section >

        {/* Contact Section - Beige Background (Merged with Footer) */}
        < section id="visit" className="pt-24 pb-12 bg-beige dark:bg-black" >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div>
                <div>
                  <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white text-center lg:text-left">Kde nás nájdete</h2>
                  <div className="w-24 h-1 bg-primary/20 mx-auto lg:mx-0 mb-8 rounded-full" />
                  <div className="space-y-8">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-center lg:text-left">
                      <div className="p-3 rounded-full bg-white dark:bg-white text-primary dark:text-black shadow-sm">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-1 text-black dark:text-white">Adresa</h3>
                        <p className="text-muted-foreground text-lg">Hospodárska 53<br />91701 Trnava</p>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-center lg:text-left">
                      <div className="p-3 rounded-full bg-white dark:bg-white text-primary dark:text-black shadow-sm">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-1 text-black dark:text-white">Telefón</h3>
                        <a
                          href="tel:+421902163144"
                          className="text-muted-foreground text-lg hover:text-primary transition-colors inline-flex items-center gap-1"
                          aria-label="Zavolať na číslo +421 902 163 144"
                        >
                          {/* Anti-scraping: CSS direction + hidden decoys + Unicode spaces */}
                          <span aria-hidden="true" className="select-none">
                            <span>0</span>
                            <span className="hidden">bot-trap</span>
                            <span>9</span>
                            <span>0</span>
                            <span className="hidden">fake</span>
                            <span>2</span>
                            <span>{'\u2009'}</span>
                            <span>1</span>
                            <span>6</span>
                            <span className="hidden">null</span>
                            <span>3</span>
                            <span>{'\u2009'}</span>
                            <span>1</span>
                            <span className="hidden">spam</span>
                            <span>4</span>
                            <span>4</span>
                          </span>
                          <span className="sr-only">+421 902 163 144</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col items-center lg:items-start gap-4">
                    <Button
                      asChild
                      className="h-16 md:h-20 text-xl rounded-full px-16 md:px-20 bg-primary text-primary-foreground hover:bg-primary/90 min-w-[250px]"
                    >
                      <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                        Pozrieť voľné termíny
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <Map />
              </div>
            </div>
          </div>
        </section >



        {/* Footer - Beige Background (Merged with Contact) */}
        < footer className="py-12 bg-beige dark:bg-black" >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center gap-3">
                <Image
                  src="/logo_day.png"
                  alt="DIARA"
                  width={1536}
                  height={600}
                  className="h-20 w-auto object-contain dark:hidden"
                />
                <Image
                  src="/logo_night.png"
                  alt="DIARA"
                  width={1536}
                  height={600}
                  className="h-20 w-auto object-contain hidden dark:block"
                />
                <p className="text-sm font-medium text-black dark:text-white tracking-wide">Professional Nails & Manicure in Trnava</p>
              </div>

              <p className="text-sm text-foreground/80 text-center">© 2025 diara manicure. Všetky práva vyhradené.</p>

              <div className="flex gap-6">
                <a
                  href="https://instagram.com/diaramanicure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white hover:bg-primary text-black hover:text-primary-foreground transition-all duration-300 shadow-sm"
                  aria-label="Instagram Diara Manicure"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com/diaramanicure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white hover:bg-primary text-black hover:text-primary-foreground transition-all duration-300 shadow-sm"
                  aria-label="Facebook Diara Manicure"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* SEO Keywords Line */}
            <div className="mt-8 pt-6 border-t border-primary/10 text-center">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Populárne vyhľadávania: Nechty Trnava | Gélové nechty Trnava | Manikúra Trnava | Nails Trnava | Nechtové štúdio Trnava | Modelácia nechtov | Gél lak Trnava | Nechty Cenník | Voľné termíny na nechty
              </p>
            </div>
          </div>
        </footer >
      </main >
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly&loading=async`}
        strategy="afterInteractive"
        onReady={() => {
          setIsGoogleApiLoaded(true);
        }}
      />

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Prehliadač galérie"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
            aria-label="Zavrieť"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Zoom toggle button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleZoom()
            }}
            className="absolute top-4 right-20 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
            aria-label={isZoomed ? "Oddialiť" : "Priblížiť"}
          >
            {isZoomed ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
          </button>

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
            aria-label="Predchádzajúci obrázok"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[101] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
            aria-label="Nasledujúci obrázok"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image container */}
          <div
            className={`relative transition-all duration-500 ease-out ${isZoomed
              ? 'w-[95vw] h-[95vh] cursor-zoom-out overflow-auto'
              : 'w-[90vw] h-[85vh] max-w-5xl cursor-zoom-in'
              }`}
            onClick={(e) => {
              e.stopPropagation()
              toggleZoom()
            }}
          >
            <Image
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].alt}
              fill
              className={`transition-all duration-500 ${isZoomed ? 'object-contain scale-150' : 'object-contain'
                }`}
              sizes="100vw"
              priority
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/40 px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>

          {/* Image description */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white text-lg font-light">
            {galleryImages[currentImageIndex].alt}
          </div>
        </div>
      )}
    </div >
  )
}
