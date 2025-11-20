import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Ďakujeme | Diara Manicure",
    robots: {
        index: false,
        follow: false,
    },
}

export default function ThankYouLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
