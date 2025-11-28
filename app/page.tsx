"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, ChevronDown, Star, MapPin, Phone, Mail } from "lucide-react"
import Map from "@/components/ui/custom-map"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
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

export default function Home() {
  const [services, setServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeError, setIframeError] = useState(false)
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false)

  const [bookingUrl, setBookingUrl] = useState('https://services.bookio.com/diaramanicure/widget?lang=sk')
  const [bookingStartTime, setBookingStartTime] = useState<number | null>(null)
  const [bookingCompleted, setBookingCompleted] = useState(false)
  const [previousHeight, setPreviousHeight] = useState<number>(0)
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

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      if (typeof window === 'undefined') {
        return;
      }

      if (!(window as any).google?.maps) {
        return;
      }

      try {
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
          const googleReviews: Testimonial[] = place.reviews
            .filter((review: any) => review.rating && review.rating >= 4)
            .slice(0, 5)
            .map((review: any) => ({
              text: review.text?.text || review.text || '',
              author: review.authorAttribution?.displayName || 'Anonymous',
              photo: review.authorAttribution?.photoURI || null,
              rating: review.rating
            }));

          setTestimonials(prev => {
            const uniqueHardcoded = prev.filter(pr => !googleReviews.some(gr => gr.author === pr.author));
            const merged = [...googleReviews, ...uniqueHardcoded];
            const shuffled = merged.sort(() => Math.random() - 0.5);
            return shuffled;
          });
        }
      } catch (error) {
        // Silent error handling - fallback to hardcoded reviews
      }
    };

    // Wait for Google Maps to be available
    const checkInterval = setInterval(() => {
      if ((window as any).google?.maps) {
        clearInterval(checkInterval);
        fetchGoogleReviews();
      }
    }, 500);

    // Cleanup after 15 seconds
    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 15000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, []);

  const { resolvedTheme } = useTheme()
  const logoSrc = resolvedTheme === "dark" ? "/diara-manicure-logo-black-trnava-v2.png" : "/diara-manicure-logo-trnava.png"

  // Set booking URL with success redirect on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const successUrl = `${window.location.origin}/dakujeme`
      setBookingUrl(`https://services.bookio.com/diaramanicure/widget?lang=sk&success_url=${encodeURIComponent(successUrl)}`)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/services', { signal: controller.signal })
      .then(async res => {
        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.error || 'Failed to fetch services')
        }
        return res.json()
      })
      .then(setServices)
      .catch(error => {
        if (error.name === 'AbortError') return
        setServices([])
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoadingServices(false)
        }
      })

    return () => controller.abort()
  }, [])

  // Handle theme changes for iframe
  useEffect(() => {
    if (bookingOpen && iframeLoaded && resolvedTheme === 'dark') {
      try {
        const iframe = document.getElementById('bookio-iframe') as HTMLIFrameElement
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage({
            type: 'SET_THEME',
            theme: 'dark'
          }, '*')
        }
      } catch (error) {
        // Silent error handling
      }
    }
  }, [resolvedTheme, bookingOpen, iframeLoaded, setIframeLoaded, setIframeError])

  const scrollToVisit = () => {
    document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleIframeLoad = () => {
    setIframeLoaded(true)
    setIframeError(false)

    if (resolvedTheme === 'dark') {
      try {
        const iframe = document.getElementById('bookio-iframe') as HTMLIFrameElement
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage({
            type: 'SET_THEME',
            theme: 'dark'
          }, '*')
        }
      } catch (error) {
        // Silent error handling
      }
    }
  }



  // Track when booking dialog opens
  useEffect(() => {
    if (bookingOpen) {
      setBookingStartTime(Date.now());
      setBookingCompleted(false);
    }
  }, [bookingOpen]);

  // Listen for Bookio booking completion and redirect to thank you page
  useEffect(() => {
    const handleBookioMessage = (event: MessageEvent) => {
      if (!event.origin.includes('bookio.com')) {
        return;
      }

      if (event.data?.type === 'WIDGET_HEIGHT' && typeof event.data?.widgetHeight === 'number') {
        const currentHeight = event.data.widgetHeight;

        if (currentHeight < 900 && previousHeight > 950 && !bookingCompleted) {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'conversion', {
              'send_to': 'AW-17746151386/EYF2CN27xMMbENqPg45C'
            });
          }
          setBookingCompleted(true);
        }

        setPreviousHeight(currentHeight);
      }

      if (
        event.data?.type === 'booking_completed' ||
        event.data?.type === 'reservation_completed' ||
        event.data?.type === 'booking_created' ||
        event.data?.event === 'booking_completed' ||
        event.data?.event === 'reservation_completed' ||
        event.data?.event === 'booking_created' ||
        event.data?.status === 'completed' ||
        event.data?.success === true ||
        event.data?.action === 'booking_success' ||
        event.data?.step === 'finish' ||
        (event.data?.type === 'navigation' && event.data?.path?.includes('success'))
      ) {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17746151386/EYF2CN27xMMbENqPg45C'
          });
        }

        setBookingCompleted(true);
      }
    };

    let iframeCheckInterval: NodeJS.Timeout | null = null;

    if (bookingOpen) {
      iframeCheckInterval = setInterval(() => {
        try {
          const iframe = document.getElementById('bookio-iframe') as HTMLIFrameElement;
          if (iframe && iframe.contentWindow) {
            try {
              const iframeUrl = iframe.contentWindow.location.href;

              if (
                iframeUrl.includes('/success') ||
                iframeUrl.includes('/confirmed') ||
                iframeUrl.includes('/booking-confirmed') ||
                iframeUrl.includes('/completed') ||
                iframeUrl.includes('?status=success') ||
                iframeUrl.includes('&status=success')
              ) {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-17746151386/EYF2CN27xMMbENqPg45C'
                  });
                }

                setBookingCompleted(true);
                if (iframeCheckInterval) clearInterval(iframeCheckInterval);
              }
            } catch (e) {
              // CORS error - expected
            }
          }
        } catch (error) {
          // Silent error handling
        }
      }, 1000);
    }

    window.addEventListener('message', handleBookioMessage);

    return () => {
      window.removeEventListener('message', handleBookioMessage);
      if (iframeCheckInterval) {
        clearInterval(iframeCheckInterval);
      }
    };
  }, [bookingOpen, previousHeight, bookingCompleted]);

  // Timeout check for iframe loading (detects AdBlock)
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (bookingOpen && !iframeLoaded && !iframeError) {
      timeout = setTimeout(() => {
        if (!iframeLoaded) {
          setIframeError(true);
        }
      }, 5000); // 5 seconds timeout
    }
    return () => clearTimeout(timeout);
  }, [bookingOpen, iframeLoaded, iframeError]);

  const handleIframeError = (error: any) => {
    setIframeError(true)
  }

  const retryIframe = () => {
    setIframeError(false)
    setIframeLoaded(false)
    const iframe = document.getElementById('bookio-iframe') as HTMLIFrameElement
    if (iframe) {
      iframe.src = iframe.src // Force reload
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <SchemaMarkup />
      <Navbar />

      <main>
        {/* Preload dark logo for instant switching */}
        <Image
          src="/diara-manicure-logo-black-trnava-v2.png"
          alt=""
          width={1536}
          height={600}
          className="hidden"
          priority
        />

        {/* Hero Section - Beige Background */}
        <section className="relative min-h-[auto] md:min-h-[90vh] flex flex-col justify-start pt-20 md:pt-20 pb-12 md:pb-0 items-center text-center px-6 overflow-hidden bg-beige dark:bg-black">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40 pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
            <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-primary/5 to-transparent blur-3xl" />
          </div>

          <div className="mb-8 relative w-full md:max-w-[660px] mx-auto">
            <Image
              src={logoSrc}
              alt="Diara Manicure - Nechty Trnava"
              width={1536}
              height={600}
              className="w-full h-auto"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 660px"
            />
          </div>

          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 leading-tight">
              Gélové nechty a manikúra Trnava
            </h1>
            <p className="text-xl md:text-2xl font-light text-muted-foreground mb-10">
              Exkluzívna starostlivosť o vaše ruky. <span className="italic font-serif text-primary/80">Best nails Trnava can offer.</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
            <div className="flex flex-col justify-center gap-4 w-full">
              <Dialog open={bookingOpen} onOpenChange={(open) => {
                setBookingOpen(open);
                // If closing and booking was completed, redirect to thank you page
                if (!open && bookingCompleted) {
                  window.location.href = '/dakujeme';
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="h-auto py-2 text-xl md:text-2xl rounded-full px-12 md:px-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 w-full flex flex-col items-center gap-2">
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
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full h-[85vh] p-0 overflow-hidden rounded-2xl border-none">
                  <DialogTitle className="sr-only">Rezervácia termínu</DialogTitle>
                  <DialogDescription className="sr-only">
                    Rezervujte si termín na manikúru prostredníctvom našej online rezervačnej platformy.
                  </DialogDescription>
                  <div className="w-full h-full flex flex-col bg-background relative">
                    {/* Success Banner - Shows when booking is completed */}
                    {bookingCompleted && (
                      <div className="absolute top-0 left-0 w-full bg-green-500 text-white p-4 z-50 flex items-center justify-center gap-2 animate-in slide-in-from-top duration-500 shadow-lg">
                        <div className="bg-white rounded-full p-1">
                          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="font-medium">Rezervácia bola úspešne zaznamenaná!</span>
                      </div>
                    )}

                    <div className="flex-1 relative">
                      {!iframeLoaded && !iframeError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Načítavam rezervačný systém...</p>
                          </div>
                        </div>
                      )}

                      {iframeError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background p-6">
                          <div className="text-center max-w-md mx-auto">
                            <div className="mb-4 text-destructive">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <h3 className="text-lg font-semibold">Rezervačný systém sa nepodarilo načítať</h3>
                            </div>
                            <p className="text-muted-foreground mb-6">
                              Váš prehliadač alebo <strong>AdBlock</strong> pravdepodobne blokuje rezervačný systém.
                              Prosím, vypnite blokovanie reklám pre túto stránku alebo otvorte rezerváciu v novom okne.
                            </p>
                            <div className="flex flex-col gap-3">
                              <Button onClick={retryIframe} variant="outline">
                                Skúsiť znovu
                              </Button>
                              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                                <a
                                  href="https://services.bookio.com/diaramanicure/widget?lang=sk"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Otvoriť rezerváciu v novom okne
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      <iframe
                        id="bookio-iframe"
                        src={bookingUrl}
                        onLoad={handleIframeLoad}
                        onError={handleIframeError}
                        width="100%"
                        height="100%"
                        style={{ border: 'none', display: 'block' }}
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Micro-copy below booking button */}
              <p className="text-sm text-muted-foreground italic text-center -mt-2 mb-4">
                Nezáväzná rezervácia • Parkovanie zdarma • Káva zdarma
              </p>

              <Button
                variant="outline"
                onClick={scrollToVisit}
                className="h-14 md:h-16 text-xl rounded-full px-10 md:px-12 border-primary/20 hover:bg-white/50 hover:text-foreground transition-all duration-300 w-full mb-8"
              >
                Kde nás nájdete
              </Button>

              {/* Floating Bubble - Desktop: Upper Left, Mobile: Above Arrow */}
              <div className="relative mt-0 xl:absolute xl:left-8 xl:top-0 xl:mt-0 w-80 max-w-full mx-auto p-6 rounded-[2rem] bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 shadow-lg text-center hover:scale-105 transition-transform duration-300 hover:shadow-xl z-10">
                <p className="text-lg font-light leading-relaxed text-black dark:text-white">
                  Našou prioritou sú <span className="italic font-serif text-primary">kvalitné európske gély</span> a precízne odvedená práca.
                  <br className="my-6 block" />
                  Ak hľadáte expresnú službu do 30 minút, <span className="italic font-serif text-primary">náš koncept je iný – my si na kvalite dávame záležať</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Founder & Shop */}
        <section className="py-16 bg-beige/30 dark:bg-black overflow-hidden">
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
        </section>

        {/* Services Section - White Background */}
        < section id="cennik" className="py-24 bg-white dark:bg-black" >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">Cenník služieb</h2>
              <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                <span className="text-primary font-medium mt-2 block">
                  Otváracia akcia nového salónu! <br />
                  <span className="underline underline-offset-4">Promo ceny platné do 31.12.2025</span>
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
                      <div key={index} className="group relative flex justify-between items-start p-8 bg-beige dark:bg-card rounded-[2rem] hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 border border-transparent hover:border-primary/10 h-full">
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
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">Žiadne služby nie sú momentálne dostupné.</div>
              )}
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
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div key={num} className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
                  <Image
                    src={`/gelove-nechty-trnava-gallery-${num}.jpeg`}
                    alt={`Ukážka práce ${num}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
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
        <section id="faq" className="py-24 bg-white dark:bg-black">
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
                  Náš salón Diara Nails Trnava sa nachádza na Hospodárskej 53. Máme vlastné parkovanie zdarma priamo pred vchodom.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-beige dark:bg-card p-8 rounded-[2rem] hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-medium mb-3 text-black dark:text-white">
                  Aká je cena za nové gélové nechty?
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Aktuálne máme akciu. Cenník začína na sume 29 € za kompletnú modeláciu nechtov. Táto cena platí aj pre doplnenie nechtov.
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
                  Áno, špecializujeme sa na gélové nechty, ale v ponuke je aj japonská manikúra, gél lak a klasická manikúra Trnava.
                </p>
              </div>
            </div>
          </div>
        </section>

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
                        <p className="text-muted-foreground text-lg">
                          0902 <span className="hidden">null</span>163 <span className="hidden">null</span>144
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col items-center lg:items-start gap-4">
                    <Button
                      onClick={() => setBookingOpen(true)}
                      className="h-16 md:h-20 text-xl rounded-full px-16 md:px-20 bg-primary text-primary-foreground hover:bg-primary/90 min-w-[250px]"
                    >
                      Pozrieť voľné termíny
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
                  src={logoSrc}
                  alt="DIARA"
                  width={1536}
                  height={600}
                  className="h-20 w-auto object-contain"
                />
                <p className="text-sm font-medium text-black dark:text-white tracking-wide">Professional Nails & Manicure in Trnava</p>
              </div>

              <p className="text-sm text-muted-foreground text-center">© 2025 diara manicure. Všetky práva vyhradené.</p>

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
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                Populárne vyhľadávania: Nechty Trnava | Gélové nechty Trnava | Manikúra Trnava | Nails Trnava | Nechtové štúdio Trnava | Modelácia nechtov | Gél lak Trnava | Nechty Cenník | Voľné termíny na nechty
              </p>
            </div>
          </div>
        </footer >
      </main >
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=weekly`}
        strategy="afterInteractive"
        onReady={() => {
          setIsGoogleApiLoaded(true);
        }}
      />
    </div >
  )
}
