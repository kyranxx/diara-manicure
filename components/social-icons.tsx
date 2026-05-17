import { Facebook, Instagram } from "lucide-react"

type SocialIconProps = {
  className?: string
}

export function InstagramIcon({ className = "size-5" }: SocialIconProps) {
  return <Instagram className={className} aria-hidden="true" focusable="false" />
}

export function FacebookIcon({ className = "size-5" }: SocialIconProps) {
  return <Facebook className={className} aria-hidden="true" focusable="false" />
}

export function MessengerIcon({ className = "size-5" }: SocialIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="diara-messenger-gradient" x1="8" x2="40" y1="42" y2="6">
          <stop stopColor="#00B2FF" />
          <stop offset="0.48" stopColor="#006AFF" />
          <stop offset="1" stopColor="#FF2DBB" />
        </linearGradient>
      </defs>
      <path
        fill="url(#diara-messenger-gradient)"
        d="M24 5.5C13.6 5.5 5.5 13 5.5 23.1c0 5.3 2.2 9.9 5.8 13.1v6.3l5.9-3.2c2.1.6 4.4 1 6.8 1 10.4 0 18.5-7.5 18.5-17.6S34.4 5.5 24 5.5Z"
      />
      <path
        fill="white"
        d="m13.1 28.3 5.5-8.7c.8-1.3 2.6-1.6 3.8-.6l4.4 3.3c.4.3.9.3 1.3-.1l6-6.5c.8-.8 2.1.2 1.5 1.2l-5.5 8.7c-.8 1.3-2.6 1.6-3.8.6l-4.4-3.3c-.4-.3-.9-.3-1.3.1l-6 6.5c-.8.8-2.1-.2-1.5-1.2Z"
      />
    </svg>
  )
}

export function WhatsAppIcon({ className = "size-5" }: SocialIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path
        fill="#25D366"
        d="M24 5.2c-10 0-18.2 8.1-18.2 18.1 0 3.2.9 6.3 2.4 8.9L5.6 42.8l10.9-2.6c2.3 1.2 4.9 1.8 7.5 1.8 10 0 18.2-8.1 18.2-18.2S34 5.2 24 5.2Z"
      />
      <path
        fill="white"
        d="M18.6 14.7c-.4-.9-.8-.9-1.2-.9h-1c-.4 0-.9.1-1.4.7-.5.5-1.8 1.8-1.8 4.4s1.9 5.1 2.2 5.5c.3.4 3.7 5.9 9.1 8 4.5 1.8 5.4 1.4 6.4 1.3 1-.1 3.1-1.3 3.6-2.5.4-1.2.4-2.2.3-2.5-.1-.2-.5-.4-1-.7l-3.5-1.7c-.5-.2-.9-.4-1.3.2-.4.5-1.5 1.7-1.8 2.1-.3.4-.7.4-1.2.1-.5-.2-2.2-.8-4.3-2.6-1.6-1.4-2.6-3.1-2.9-3.7-.3-.5 0-.8.2-1.1.2-.2.5-.6.7-.8.2-.3.3-.5.5-.8.2-.4.1-.7 0-.9l-1.6-3.7Z"
      />
    </svg>
  )
}
