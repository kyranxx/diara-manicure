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
import { FadeIn } from "@/components/ui/fade-in"

interface Service {
  title: string
  description: string
  price: string
  discountedPrice?: string
}

export default function Home() {
  const [services, setServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeError, setIframeError] = useState(false)

  const { resolvedTheme } = useTheme()
  const logoSrc = resolvedTheme === "dark" ? "/logo_black.png" : "/logo.png"

  useEffect(() => {
    fetch('/api/services')
      .then(async res => {
        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.error || 'Failed to fetch services')
        }
        return res.json()
      })
      .then(setServices)
      .catch(error => {
        console.error('Error fetching services:', error)
        setServices([])
      })
      .finally(() => setLoadingServices(false))
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
        console.log('Dark mode application failed:', error)
      }
    }
  }, [resolvedTheme, bookingOpen, iframeLoaded, setIframeLoaded, setIframeError])

  const scrollToVisit = () => {
    document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleIframeLoad = () => {
    console.log('Bookio iframe loaded successfully')
    setIframeLoaded(true)
    setIframeError(false)

    // Call initBookioWidget if it exists
    if (typeof window !== 'undefined' && (window as any).initBookioWidget) {
      try {
        (window as any).initBookioWidget()
        console.log('initBookioWidget called successfully')
      } catch (error) {
        console.log('initBookioWidget call failed:', error)
      }
    }

    // Apply dark mode styling if in dark theme
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
        console.log('Dark mode application failed:', error)
      }
    }
  }

  const handleIframeError = (error: any) => {
    console.error('Bookio iframe failed to load:', error)
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

      {/* Preload dark logo for instant switching */}
      <Image
        src="/logo_black.png"
        alt=""
        width={840}
        height={420}
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

        <div className="mb-8 relative">
          <Image
            src={logoSrc}
            alt="Diara Manicure - Nechty Trnava"
            width={840}
            height={420}
            className="mx-auto w-full max-w-[660px] h-auto"
            priority
            sizes="(max-width: 768px) 100vw, 660px"
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 leading-tight">
            Exkluzívna starostlivosť <br />
            <span className="italic font-serif text-primary/80">o vaše ruky</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-primary/60 font-light mb-6">
            Nechtové štúdio Trnava | Gélové nechty & Manikúra
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 font-light leading-relaxed max-w-lg mx-auto">
            V srdci Trnavy. Kde sa krása stretáva s relaxom a precíznosťou.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
              <DialogTrigger asChild>
                <Button className="h-14 md:h-16 text-xl rounded-full px-10 md:px-12 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                  Rezervovať termín
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl w-full h-[85vh] p-0 overflow-hidden rounded-2xl border-none">
                <DialogTitle className="sr-only">Rezervácia termínu</DialogTitle>
                <DialogDescription className="sr-only">
                  Rezervujte si termín na manikúru prostredníctvom našej online rezervačnej platformy.
                </DialogDescription>
                <div className="w-full h-full flex flex-col bg-background">
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
                      <div className="absolute inset-0 flex items-center justify-center bg-background">
                        <div className="text-center p-6">
                          <p className="text-destructive mb-4">Rezervačný systém sa nepodarilo načítať.</p>
                          <Button onClick={retryIframe} variant="outline" className="text-sm">
                            Skúsiť znovu
                          </Button>
                          <div className="mt-8">
                            <a
                              href="https://services.bookio.com/diaramanicure/widget?lang=sk"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-sm"
                            >
                              Otvoriť v novom okne →
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    <iframe
                      id="bookio-iframe"
                      src="https://services.bookio.com/diaramanicure/widget?lang=sk"
                      width="100%"
                      height="100%"
                      style={{ border: 'none', display: 'block' }}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                      referrerPolicy="strict-origin-when-cross-origin"
                      onLoad={handleIframeLoad}
                      onError={handleIframeError}
                      title="Rezervačný systém"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              onClick={scrollToVisit}
              className="h-14 md:h-16 text-xl rounded-full px-10 md:px-12 border-primary/20 hover:bg-white/50 hover:text-foreground transition-all duration-300 w-full sm:w-auto"
            >
              Kde nás nájdete
            </Button>
          </div>

          <div className="animate-bounce text-muted-foreground/50">
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Services Section - White Background */}
      <section id="cennik" className="py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">Cenník Služieb</h2>
            <h3 className="text-xl text-muted-foreground font-light mb-4">Nechty Trnava Cenník</h3>
            <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <span className="text-primary font-medium mt-2 block">Promo ceny platné do 31.12.2025</span>
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
                    <div key={index} className="group flex justify-between items-start p-8 bg-beige dark:bg-card rounded-[2rem] hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 border border-transparent hover:border-primary/10 h-full">
                      <div className="flex-grow pr-4">
                        <h4 className="text-xl font-normal mb-2 group-hover:text-primary transition-colors text-black dark:text-white">{service.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                      </div>
                      <div className="text-right whitespace-nowrap">
                        {hasDiscount ? (
                          <div className="flex flex-col items-end">
                            <span className="text-sm text-muted-foreground/60 line-through decoration-1">{service.price}</span>
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
      </section>

      {/* Testimonials Section - White Background */}
      <section id="recenzie" className="pt-12 pb-24 overflow-hidden bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">Čo hovoria naše klientky</h2>
            <h3 className="text-xl text-muted-foreground font-light mb-4">Gélové nechty Trnava recenzie</h3>
            <div className="flex justify-center gap-1 text-primary mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                text: "Nechty vyzerajú super a vydržia. Pekná práca, chválim.",
                author: "Mária K."
              },
              {
                text: "Manikúra za dobrú cenu, Andrea je šikovná, určite sa vrátim.",
                author: "Janka P."
              },
              {
                text: "Maximálna spokojnosť. Manikérka je ústretová, milá, vždy sa snaží urobiť čo chcem. Nechty mi vydržia dlho.",
                author: "Lucia M."
              },
              {
                text: "Dobré rozhodnutie prísť sem. Gélové nechty som mala krásne a vydržali mi perfektne do ďalšej dorábky.",
                author: "Petra S."
              },
              {
                text: "Veľmi pekná a detajlná práca. Naozaj som spokojná s nechtami. Sú prirodzené a vydržia.",
                author: "Katka R."
              },
              {
                text: "Som veľmi spokojná, nechty mi vydržali celé týždne do dalšieho termínu. Vidno, že použiva pani manikérka kvalitný materiál.",
                author: "Peťa S."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-beige dark:bg-card p-6 rounded-[1.5rem] h-full flex flex-col justify-between hover:bg-beige dark:hover:bg-card/80 transition-colors duration-300">
                <p className="text-black/80 dark:text-white/80 italic text-base leading-relaxed mb-4 font-light">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif italic text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <p className="font-medium text-xs tracking-wide uppercase text-muted-foreground">{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - White Background */}
      <section id="galeria" className="pt-12 pb-24 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white">Nechty našich klientiek</h2>
            <h3 className="text-xl text-muted-foreground font-light mb-4">Nails Trnava - Galéria</h3>
            <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
              <div key={num} className="aspect-square overflow-hidden rounded-3xl relative group cursor-pointer">
                <Image
                  src={`/pic${num}.jpeg`}
                  alt={`Ukážka práce ${num} - Nechty Trnava`}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="h-16 md:h-20 text-xl rounded-full px-10 md:px-12 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all duration-300" asChild>
              <a href="https://instagram.com/diaramanicure" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <Instagram className="w-6 h-6" />
                Sledujte nás na Instagrame
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section - Beige Background (Merged with Footer) */}
      <section id="visit" className="py-24 bg-beige dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <div>
                <h2 className="text-5xl md:text-7xl font-light mb-4 tracking-tight text-black dark:text-white text-center lg:text-left">Kde nás nájdete</h2>
                <h3 className="text-xl text-muted-foreground font-light mb-4 text-center lg:text-left">Nechty Trnava objednanie</h3>
                <div className="w-24 h-1 bg-primary/20 mx-auto lg:mx-0 mb-8 rounded-full" />
                <div className="space-y-8">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-center lg:text-left">
                    <div className="p-3 rounded-full bg-white dark:bg-white text-primary dark:text-black shadow-sm">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-1 text-black dark:text-white">Adresa</h4>
                      <p className="text-muted-foreground text-lg">Hospodárska 53<br />91701 Trnava</p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-center lg:text-left">
                    <div className="p-3 rounded-full bg-white dark:bg-white text-primary dark:text-black shadow-sm">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-1 text-black dark:text-white">Telefón</h4>
                      <p className="text-muted-foreground text-lg">0902 163 144</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-center lg:justify-start">
                  <Button
                    onClick={() => setBookingOpen(true)}
                    className="h-16 md:h-20 text-xl rounded-full px-16 md:px-20 bg-primary text-primary-foreground hover:bg-primary/90 min-w-[250px]"
                  >
                    Rezervovať termín
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <Map />
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Beige Background (Merged with Contact) */}
      <footer className="py-12 bg-beige dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Image
                src={logoSrc}
                alt="DIARA"
                width={180}
                height={90}
                className="h-20 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-muted-foreground text-center">© 2025 Diara Manicure. Všetky práva vyhradené.</p>

            <div className="flex gap-6">
              <a
                href="https://instagram.com/diaramanicure"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white hover:bg-primary text-black hover:text-primary-foreground transition-all duration-300 shadow-sm"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/diaramanicure"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white hover:bg-primary text-black hover:text-primary-foreground transition-all duration-300 shadow-sm"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
