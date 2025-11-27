"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

export function HeroSection() {
    const { resolvedTheme } = useTheme()
    const logoSrc = resolvedTheme === "dark" ? "/diara-manicure-logo-black-trnava-v2.png" : "/diara-manicure-logo-trnava.png"

    const [bookingOpen, setBookingOpen] = useState(false)
    const [iframeLoaded, setIframeLoaded] = useState(false)
    const [iframeError, setIframeError] = useState(false)
    const [bookingUrl, setBookingUrl] = useState('https://services.bookio.com/diaramanicure/widget?lang=sk')
    const [bookingStartTime, setBookingStartTime] = useState<number | null>(null)
    const [bookingCompleted, setBookingCompleted] = useState(false)
    const [previousHeight, setPreviousHeight] = useState<number>(0)

    // Set booking URL with success redirect on client side only
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const successUrl = `${window.location.origin}/dakujeme`
            setBookingUrl(`https://services.bookio.com/diaramanicure/widget?lang=sk&success_url=${encodeURIComponent(successUrl)}`)
        }
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
    }, [resolvedTheme, bookingOpen, iframeLoaded])

    const scrollToVisit = () => {
        document.getElementById("visit")?.scrollIntoView({ behavior: "smooth" })
    }

    const retryIframe = () => {
        setIframeError(false)
        setIframeLoaded(false)
        const iframe = document.getElementById('bookio-iframe') as HTMLIFrameElement
        if (iframe) {
            iframe.src = iframe.src // Force reload
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
            // Only accept messages from Bookio domain
            if (!event.origin.includes('bookio.com')) {
                return;
            }

            console.log('Received message from Bookio:', event.data);

            // Check for height change (Thank you page is often shorter)
            if (event.data?.type === 'WIDGET_HEIGHT' && typeof event.data?.widgetHeight === 'number') {
                const currentHeight = event.data.widgetHeight;
                console.log(`Widget height update: ${currentHeight}px (Previous: ${previousHeight}px)`);

                // Logic: If height drops significantly (e.g. below 900px) after being tall (e.g. > 950px)
                // This usually indicates moving from calendar/form to the thank you page
                if (currentHeight < 900 && previousHeight > 950 && !bookingCompleted) {
                    console.log('Height drop detected (likely Thank You page)! Firing conversion...');

                    // Fire Google Ads conversion tag immediately
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                        console.log('Firing Google Ads conversion tag (from height drop)...');
                        (window as any).gtag('event', 'conversion', {
                            'send_to': 'AW-17746151386/EYF2CN27xMMbENqPg45C'
                        });
                    }
                    setBookingCompleted(true);
                }

                setPreviousHeight(currentHeight);
            }

            // Check if booking was completed
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
                console.log('Booking completed! Firing conversion tag and marking as done...');

                // Fire Google Ads conversion tag immediately
                if (typeof window !== 'undefined' && (window as any).gtag) {
                    console.log('Firing Google Ads conversion tag...');
                    (window as any).gtag('event', 'conversion', {
                        'send_to': 'AW-17746151386/EYF2CN27xMMbENqPg45C'
                    });
                }

                setBookingCompleted(true);
            }
        };

        // Also monitor iframe URL for completion indicators
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
                                console.log('Booking completion detected in URL! Firing conversion tag and marking as done...');

                                if (typeof window !== 'undefined' && (window as any).gtag) {
                                    console.log('Firing Google Ads conversion tag (from URL check)...');
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
                    // Silently handle errors
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

    return (
        <>
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
                    <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-10 leading-tight">
                        Exkluzívna starostlivosť <br />
                        <span className="italic font-serif text-primary/80">o vaše ruky</span>
                    </h1>
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
                                <Button className="h-auto py-4 text-xl md:text-2xl rounded-full px-12 md:px-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 w-full flex flex-col items-center gap-2">
                                    <span>Pozrieť voľné termíny</span>
                                    <div className="bg-beige rounded-full px-4 py-1.5 mt-1">
                                        <div className="relative h-4 w-16">
                                            <Image
                                                src="/bookio_logo.png"
                                                alt="Bookio"
                                                fill
                                                className="object-contain"
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
                                            src={bookingUrl}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 'none', display: 'block' }}
                                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                                            allow="microphone 'none'; camera 'none'; geolocation 'none'; unload 'none'"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            onLoad={() => {
                                                console.log('Bookio iframe loaded successfully')
                                                setIframeLoaded(true)
                                                setIframeError(false)
                                            }}
                                            onError={() => {
                                                console.error('Bookio iframe failed to load')
                                                setIframeError(true)
                                            }}
                                        />
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>

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
        </>
    )
}
