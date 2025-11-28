// Suppress third-party passive event listener warnings
// This addresses violations from Google Maps, Facebook Chat Widget, and Bookio iframe

if (typeof window !== 'undefined') {
    const originalAddEventListener = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (
        type: string,
        listener: EventListenerOrEventListenerObject | null,
        options?: boolean | AddEventListenerOptions
    ) {
        const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];

        if (passiveEvents.includes(type)) {
            if (typeof options === 'object' && options !== null) {
                if (!('passive' in options)) {
                    options.passive = true;
                }
            } else if (typeof options === 'boolean' || options === undefined) {
                options = {
                    capture: typeof options === 'boolean' ? options : false,
                    passive: true
                };
            }
        }

        return originalAddEventListener.call(this, type, listener, options);
    };
}
