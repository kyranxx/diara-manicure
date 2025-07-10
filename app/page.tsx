"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook } from "lucide-react"

export default function Home() {
  const scrollToVisit = () => {
    document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-6">{/* Empty header for clean look */}</div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-8">
            <Image src="/logo.png" alt="diara manicure" width={600} height={300} className="mx-auto" />
          </div>

          <p className="text-xl text-neutral-600 mb-8 font-light leading-relaxed">
            Zaslúžite si manikúru, ktorá vydrží a vyzerá skvele.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-neutral-900 hover:bg-neutral-800 px-12 py-4 text-lg font-light">Rezervovať</Button>
            <Button
              variant="outline"
              onClick={scrollToVisit}
              className="border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white px-12 py-4 text-lg font-light"
            >
              Kde nás nájdete
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-light mb-4 tracking-wide">Služby</h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
              <div className="flex justify-between items-center py-4 border-b border-neutral-200">
                <div className="flex-grow">
                  <h4 className="text-lg font-light">Klasická manikúra</h4>
                  <p className="text-sm text-neutral-600">Čistenie nechtov, odstránenie kožičky, úprava - bez lakovania</p>
                </div>
                <span className="text-lg font-light ml-4">17 €</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-neutral-200">
                <div className="flex-grow">
                  <h4 className="text-lg font-light">Spevnenie prirodzených nechtov gélovou bázou</h4>
                  <p className="text-sm text-neutral-600">Vhodné na krátke nechty v naturálnych farbách</p>
                </div>
                <span className="text-lg font-light ml-4">25 €</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-neutral-200">
                <div className="flex-grow">
                  <h4 className="text-lg font-light">Spevnenie prirodzených nechtov gélovou bázou + farebný gél lak alebo francúzska manikúra</h4>
                  <p className="text-sm text-neutral-600">Klasická manikúra s aplikáciou gélovej bázy</p>
                </div>
                <span className="text-lg font-light ml-4">27 €</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-neutral-200">
                <div className="flex-grow">
                  <h4 className="text-lg font-light">Doplnenie</h4>
                  <p className="text-sm text-neutral-600">Doplnenie gélovej bázy</p>
                </div>
                <span className="text-lg font-light ml-4">27 €</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-neutral-200">
                <div className="flex-grow">
                  <h4 className="text-lg font-light">Modelácia gélových nechtov (nové)</h4>
                  <p className="text-sm text-neutral-600">Zahŕňa aj klasickú manikúru</p>
                </div>
                <span className="text-lg font-light ml-4">34 €</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-neutral-200">
                <div className="flex-grow">
                  <h4 className="text-lg font-light">Modelácia gélových nechtov (doplnenie)</h4>
                  <p className="text-sm text-neutral-600">Zahŕňa aj klasickú manikúru</p>
                </div>
                <span className="text-lg font-light ml-4">29 €</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-neutral-200">
                <div className="flex-grow">
                  <h4 className="text-lg font-light">Odstránenie gélových nechtov</h4>
                  <p className="text-sm text-neutral-600">Odstránenie materiálu</p>
                </div>
                <span className="text-lg font-light ml-4">10 €</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-neutral-200">
                <div className="flex-grow">
                  <h4 className="text-lg font-light">Odstránenie gélových nechtov z iného salónu</h4>
                  <p className="text-sm text-neutral-600">Odstránenie materiálu z iného salónu</p>
                </div>
                <span className="text-lg font-light ml-4">15 €</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-light mb-4 tracking-wide">Galéria</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/gallery-1.jpg"
                alt="Francúzska manikúra"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/gallery-2.jpg"
                alt="Gélové predĺženie"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="/gallery-3.jpg"
                alt="Nail art dizajn"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1583797227225-4233106c5a2a?w=300&h=300&fit=crop&crop=center"
                alt="Klasická gélová manikúra"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center"
                alt="Trblietavé nechty"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop&crop=center"
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
      <section id="visit" className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-light mb-4 tracking-wide">Navštívte nás</h3>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[40%] h-96 rounded-lg overflow-hidden">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=17.5814814,48.3575849,17.5834814,48.3595849&layer=mapnik&marker=48.3585849,17.5824814"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(100%) contrast(120%) brightness(90%) invert(0%)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="diara manicure Poloha v Trnave"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo */}
            <div className="mb-4">
              <Image src="/logo.png" alt="diara manicure" width={200} height={100} className="mx-auto" />
            </div>

            {/* Address */}
            <div className="text-center text-neutral-600">
              <p className="mb-2">Ul. Generála Goliana 33, 917 01 Trnava</p>
              <p className="mb-2">0902 163 144</p>
              <p>andrea.heckova92@gmail.com</p>
            </div>

            {/* Social Media */}
            <div className="flex gap-6">
              <a
                href="https://instagram.com/diaramanicure"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/diaramanicure"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center pt-4 border-t border-neutral-200 w-full">
              <p className="text-neutral-500 font-light">© 2025 diara manicure</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
