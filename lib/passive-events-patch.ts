// Suppress third-party passive event listener warnings
// This addresses violations from Google Maps, Facebook Chat Widget, and Bookio iframe

if (typeof window !== 'undefined') {
    // Store the original addEventListener
    const originalAddEventListener = EventTarget.prototype.addEventListener;

    // Override addEventListener to make touch/wheel/mousewheel events passive by default
    EventTarget.prototype.addEventListener = function (
        type: string,
        listener: EventListenerOrEventListenerObject | null,
        options?: boolean | AddEventListenerOptions
    ) {
        // List of events that should be passive for better scroll performance
        const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];

        // Only modify if it's a passive event and passive option isn't explicitly set
        if (passiveEvents.includes(type)) {
            if (typeof options === 'object' && options !== null) {
                // If options is an object and passive isn't set, set it to true
                if (!('passive' in options)) {
                    options.passive = true;
                }
            } else if (typeof options === 'boolean' || options === undefined) {
                // If options is a boolean or undefined, convert to object with passive: true
                options = {
                    capture: typeof options === 'boolean' ? options : false,
                    passive: true
                };
            }
        }

        return originalAddEventListener.call(this, type, listener, options);
    };

    if (process.env.NODE_ENV === 'development') {
        console.log('✅ Passive event listener patch applied');
    }
}
