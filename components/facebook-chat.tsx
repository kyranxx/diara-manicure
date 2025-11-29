'use client'

import { MessageCircle } from 'lucide-react'

export function FacebookChat() {
    return (
        <a
            href="https://m.me/diaramanicure"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[9999] group"
            aria-label="Napíšte nám na Messenger"
        >
            {/* Messenger Button */}
            <div className="relative">
                {/* Pulse animation ring */}
                <div className="absolute inset-0 rounded-full bg-[#d4b5a0] opacity-75 animate-ping" />

                {/* Main button */}
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#d4b5a0] to-[#c19a7a] shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                    {/* Facebook Messenger Icon - using SVG for exact look */}
                    <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                    >
                        <path d="M12 2C6.477 2 2 6.145 2 11.256c0 2.91 1.445 5.502 3.707 7.206V22l3.39-1.858c.905.25 1.857.385 2.842.385 5.523 0 10-4.145 10-9.256C22 6.145 17.523 2 12 2zm.995 12.463l-2.557-2.73-4.992 2.73 5.49-5.828 2.618 2.73 4.932-2.73-5.491 5.828z" />
                    </svg>
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-xl">
                        Napíšte nám na Messenger
                        <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900" />
                    </div>
                </div>
            </div>
        </a>
    )
}
