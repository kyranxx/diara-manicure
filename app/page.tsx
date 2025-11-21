"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, ChevronDown } from "lucide-react"
import Map from "@/components/ui/custom-map"
import { ThemeToggle } from "@/components/theme-toggle"
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
    <div className="min-h-screen bg-white dark:bg-black">
      <SchemaMarkup />

      {/* Preload dark logo for instant switching */}
      <Image
        src="/logo_black.png"
        alt=""
        width={840}
        height={420}
        className="hidden"
        priority
      />

      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-6 flex justify-end">
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-4">
            <Image src={logoSrc} alt="diara manicure" width={840} height={420} className="mx-auto" style={{ width: 'auto', height: 'auto' }} priority />
          </div>

          <p className="text-xl text-neutral-600 dark:text-white mb-8 font-light leading-relaxed">
            Zaslúžite si manikúru, ktorá vydrží a vyzerá skvele.
          </p>

          <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-16 py-6 text-xl font-normal w-full rounded-full transition-all duration-300">Rezervovať termín</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full h-[95vh]">
                <DialogTitle className="sr-only">Rezervácia termínu</DialogTitle>
                <DialogDescription className="sr-only">
                  Rezervujte si termín na manikúru prostredníctvom našej online rezervačnej platformy.
                </DialogDescription>
                <div className="w-full h-full flex flex-col">
                  <div className="flex-1 relative">
                    {!iframeLoaded && !iframeError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
                          <p className="text-gray-600 dark:text-gray-400">Načítavam rezervačný systém...</p>
                        </div>
                      </div>
                    )}

                    {iframeError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="text-center p-6">
                          <p className="text-red-600 dark:text-red-400 mb-4">Rezervačný systém sa nepodarilo načítať.</p>
                          <Button
                            onClick={retryIframe}
                            variant="outline"
                            className="text-sm"
                          >
                            Skúsiť znovu
                          </Button>
                          <div className="mt-4">
                            <p className="text-sm text-gray-500 mb-2">Nebo môžete rezervovať:</p>
                            <a
                              href="https://services.bookio.com/diaramanicure/widget?lang=sk"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
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
                      style={{
                        border: 'none',
                        display: 'block'
                      }}
                      scrolling="auto"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                      referrerPolicy="strict-origin-when-cross-origin"
                      onLoad={handleIframeLoad}
                      onError={handleIframeError}
                      title="Rezervačný systém"
                    />
                  </div>

                  <div className="text-center py-3 text-sm text-gray-500 bg-white dark:bg-black">
                    <a
                      href="https://services.bookio.com/diaramanicure/widget?lang=sk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Otvoriť rezervačný systém v novom okne
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              onClick={scrollToVisit}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black px-12 py-4 text-lg font-normal rounded-full transition-all duration-300"
            >
              Kde nás nájdete
            </Button>
            <div className="flex justify-center mt-4">
              <ChevronDown className="h-8 w-8 text-gray-400 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="cennik" className="-mt-16 py-8 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-light mb-0 tracking-wide text-black dark:text-white">Cenník</h3>
            <p className="text-lg text-red-600 dark:text-red-400 font-medium">Promo ceny do 31.12.2025!</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {loadingServices ? (
              <div className="text-center text-neutral-500 dark:text-white">Načítavam služby...</div>
            ) : services.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service, index) => {
                  const hasDiscount = service.discountedPrice && service.discountedPrice.trim() !== '';
                  return (
                    <div key={index} className="flex justify-between items-start p-6 bg-card rounded-2xl hover:bg-secondary/50 transition-colors duration-300">
                      <div className="flex-grow">
                        <h4 className="text-lg font-medium text-foreground">{service.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                      </div>
                      <div className="w-32 text-right">
                        {hasDiscount ? (
                          <div className="flex flex-col items-end">
                            <span className="text-sm text-muted-foreground line-through">{service.price}</span>
                            <span className="text-lg font-bold text-foreground">{service.discountedPrice}</span>
                          </div>
                        ) : (
                          <span className="text-lg font-medium text-foreground">{service.price}</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center text-neutral-500 dark:text-white">Žiadne služby nie sú dostupné.</div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="recenzie" className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-light mb-4 tracking-wide text-black dark:text-white">Naše klientky:</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
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
                text: "Maximálna spokojnosť. Manikérka je ústretová, milá, vždy sa snaží urobiť čo chcem. Nechty mi vydržia dlho. Budem odporúčať.",
                author: "Lucia M."
              },
              {
                text: "Dobré rozhodnutie prísť sem. Gélové nechty som mala krásne a vydržali mi perfektne do ďalšej dorábky. Odporúčam aj kamoškám.",
                author: "Petra S."
              },
              {
                text: "Veľmi pekná a detajlná práca. Naozaj som spokojná s nechtami. Sú prirodzené a vydržia.",
                author: "Katka R."
              },
              {
                text: "Som veľmi spokojná, nechty mi vydržali celé týždne do dalšieho termínu. Vidno, že použiva pani manikérka kvalitný materiál. Spokojnosť.",
                author: "Peťa S."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-2xl transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center mb-4">
                  <div className="flex text-foreground/80 text-xs tracking-widest">
                    ★★★★★
                  </div>
                </div>
                <p className="text-foreground/80 mb-4 italic text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-sm font-medium text-foreground">-{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="galeria" className="py-16 dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-light mb-4 tracking-wide text-black dark:text-white">Naše práce</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/pic1.jpeg"
                alt="Francúzska manikúra"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/pic2.jpeg"
                alt="Gélové predĺženie"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/pic3.jpeg"
                alt="Nail art dizajn"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/pic4.jpeg"
                alt="Klasická gélová manikúra"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/pic5.jpeg"
                alt="Trblietavé nechty"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/pic6.jpeg"
                alt="Mramorový efekt"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/pic7.jpeg"
                alt="Nail art vzory"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/pic8.jpeg"
                alt="Kreatívne nechty"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="visit" className="py-16 dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-light mb-4 tracking-wide text-black dark:text-white">Navštívte nás</h3>
            <p className="text-lg text-neutral-600 dark:text-white font-light mt-2">na Hospodárska 53 v Trnave</p>
          </div>

          <div className="flex justify-center">
            <div className="w-[600px] h-[600px] rounded-2xl overflow-hidden" style={{ height: '600px', width: '600px' }}>
              <Map />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo */}
            <div className="mb-4">
              <Image src={logoSrc} alt="diara manicure" width={840} height={420} className="mx-auto" style={{ width: '400px', height: 'auto' }} priority />
            </div>

            {/* Address */}
            <div className="text-center text-neutral-600 dark:text-white">
              <p className="mb-2">Hospodárska 53, 91701 Trnava</p>
              <p className="mb-2">0902 163 144</p>
              <p>andrea.heckova92@gmail.com</p>
            </div>

            {/* Social Media */}
            <div className="flex gap-6">
              <a
                href="https://instagram.com/diaramanicure"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-white hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/diaramanicure"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-white hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center pt-4 border-t border-neutral-200 dark:border-neutral-700 w-full">
              <p className="text-neutral-500 dark:text-white font-light">© 2025 diara manicure</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
