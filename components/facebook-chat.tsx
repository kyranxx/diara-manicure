'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { useTheme } from 'next-themes'

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export function FacebookChat() {
  const chatboxRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    // Ensure attributes are set
    if (chatboxRef.current) {
      chatboxRef.current.setAttribute("page_id", "791288010744786")
      chatboxRef.current.setAttribute("attribution", "biz_inbox")

      // Update theme color based on current theme
      if (resolvedTheme === 'dark') {
        chatboxRef.current.setAttribute("theme_color", "#000000")
      } else {
        // Remove attribute to use default Facebook blue
        chatboxRef.current.removeAttribute("theme_color")
      }
    }

    // If FB SDK is already loaded, re-parse to apply changes
    if (window.FB) {
      window.FB.XFBML.parse()
    }
  }, [resolvedTheme])

  return (
    <>
      <div id="fb-root" />
      <div
        id="fb-customer-chat"
        className="fb-customerchat"
        ref={chatboxRef}
        style={{ zIndex: 2147483647 }}
      />
      <Script
        id="messenger-tag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var chatbox = document.getElementById('fb-customer-chat');
            if (chatbox) {
              chatbox.setAttribute("page_id", "791288010744786");
              chatbox.setAttribute("attribution", "biz_inbox");
            }

            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v18.0'
              });
            };

            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/sk_SK/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `,
        }}
      />
    </>
  )
}
