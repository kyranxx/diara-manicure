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

interface Service {
  title: string
  description: string
  price: string
}

export default function Home() {
  const [services, setServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [bookingOpen, setBookingOpen] = useState(false)
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
  const { resolvedTheme } = useTheme()
  const logoSrc = resolvedTheme === "dark" ? "/logo_black.png" : "/logo.png"

  const scrollToVisit = () => {
    document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
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
            <Image src={logoSrc} alt="diara manicure" width={840} height={420} className="mx-auto" priority />
          </div>

          <p className="text-xl text-neutral-600 dark:text-white mb-8 font-light leading-relaxed">
            Zaslúžite si manikúru, ktorá vydrží a vyzerá skvele.
          </p>

          <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
              <DialogTrigger asChild>
                <Button className="bg-neutral-900 hover:bg-neutral-800 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 px-16 py-6 text-xl font-light w-full">Rezervovať termín</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full h-[80vh]">
                <DialogTitle className="sr-only">Rezervácia termínu</DialogTitle>
                <DialogDescription className="sr-only">
                  Rezervujte si termín na manikúru prostredníctvom našej online rezervačnej platformy.
                </DialogDescription>
                <div className="w-full h-full">
                  <script type="text/javascript" src="https://bookio-services-eu.s3.eu-central-1.amazonaws.com/assets/widget.bookio.js"></script>
                  <iframe
                    id="bookio-iframe"
                    src="https://services.bookio.com/diaramanicure/widget?lang=sk"
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    scrolling="auto"
                    onLoad={() => {
                      // Call initBookioWidget if it exists
                      if (typeof window !== 'undefined' && (window as any).initBookioWidget) {
                        (window as any).initBookioWidget();
                      }
                    }}
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              onClick={scrollToVisit}
              className="border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white dark:border-gray-300 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-black px-12 py-4 text-lg font-light"
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
      <section className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-light mb-4 tracking-wide text-black dark:text-white">Služby</h3>
          </div>

          <div className="max-w-4xl mx-auto">
            {loadingServices ? (
              <div className="text-center text-neutral-500 dark:text-white">Načítavam služby...</div>
            ) : services.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
                {services.map((service, index) => (
                  <div key={index} className="flex justify-between items-start py-4 border-b border-neutral-200 dark:border-neutral-700">
                    <div className="flex-grow">
                      <h4 className="text-lg font-light text-black dark:text-white">{service.title}</h4>
                      <p className="text-sm text-neutral-600 dark:text-white">{service.description}</p>
                    </div>
                    <div className="w-24 text-right">
                      <span className="text-lg font-bold text-black dark:text-white">{service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-neutral-500 dark:text-white">Žiadne služby nie sú dostupné.</div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-light mb-4 tracking-wide text-black dark:text-white">Galéria</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/pic1.jpeg"
                alt="Francúzska manikúra"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/pic2.jpeg"
                alt="Gélové predĺženie"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/pic3.jpeg"
                alt="Nail art dizajn"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/pic4.jpg"
                alt="Klasická gélová manikúra"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=300&h=300&fit=crop&crop=center"
                alt="Ombre dizajn"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/pic5.jpg"
                alt="Trblietavé nechty"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/pic6.jpg"
                alt="Mramorový efekt"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=300&h=300&fit=crop&crop=center"
                alt="Kvetinový dizajn"
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
          </div>

          <div className="flex justify-center">
            <div className="w-[600px] h-[600px] rounded-lg overflow-hidden" style={{ height: '600px', width: '600px' }}>
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
              <Image src={logoSrc} alt="diara manicure" width={200} height={100} className="mx-auto" />
            </div>

            {/* Address */}
            <div className="text-center text-neutral-600 dark:text-white">
              <p className="mb-2">Nám. Jozefa Herdu 1, 91701 Trnava</p>
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
