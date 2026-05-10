import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog - tipy o starostlivosti o nechty",
    description: "Čítajte naše články o starostlivosti o gélové nechty, trendoch v nail arte a tipoch pre zdravé a krásne ruky. Blog nechtového štúdia diara manicure. v Trnave.",
    keywords: [
        "nechty blog",
        "starostlivosť o gélové nechty",
        "nail art trendy",
        "tipy na nechty",
        "ako sa starať o gélové nechty",
        "nechty trnava blog"
    ],
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
