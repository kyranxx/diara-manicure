import type React from "react"
import "@/app/globals.css"
import { Poppins } from "next/font/google"
import StagewiseToolbarProvider from "@/components/StagewiseProvider";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

export const metadata = {
  title: "diara manicure | Luxusný nechtový salón Trnava",
  description:
    "Prémiové gélové manikúry a nail art v Trnave, Slovensko. Zažite luxusnú starostlivosť o nechty v elegantnej atmosfére.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk">
      <body className={poppins.className}>
        {children}
        <StagewiseToolbarProvider />
      </body>
    </html>
  )
}
