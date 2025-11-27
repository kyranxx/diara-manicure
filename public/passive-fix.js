// Passive Event Listener Fix - Suppresses third-party console warnings
// This must run BEFORE any third-party scripts load
(function () {
    'use strict';

    // Feature detection
    if (typeof window === 'undefined' || typeof EventTarget === 'undefined') {
        return;
    }

    // Test if passive is supported
    let supportsPassive = false;
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) { }

    if (!supportsPassive) {
        return;
    }

    // Store original
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    const originalRemoveEventListener = EventTarget.prototype.removeEventListener;

    // Events that should be passive
    const passiveEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel', 'mousewheel'];

    // Override addEventListener
    EventTarget.prototype.addEventListener = function (type, listener, options) {
        if (passiveEvents.includes(type)) {
            let newOptions = options;

            if (typeof options === 'undefined' || options === null) {
                newOptions = { passive: true };
            } else if (typeof options === 'boolean') {
                newOptions = {
                    capture: options,
                    passive: true
                };
            } else if (typeof options === 'object') {
                // FORCE passive: true even if explicitly set to false
                // This is aggressive but ensures no scroll-blocking listeners exist
                newOptions = Object.assign({}, options, { passive: true });
            }

            return originalAddEventListener.call(this, type, listener, newOptions);
        }

        return originalAddEventListener.call(this, type, listener, options);
    };

    // Override removeEventListener to match
    EventTarget.prototype.removeEventListener = function (type, listener, options) {
        if (passiveEvents.includes(type) && typeof options === 'boolean') {
            const newOptions = {
                capture: options,
                passive: true
            };
            return originalRemoveEventListener.call(this, type, listener, newOptions);
        }

        return originalRemoveEventListener.call(this, type, listener, options);
    };

    if (typeof console !== 'undefined' && console.log) {
        console.log('%c✅ Passive event listeners patch applied', 'color: #10b981; font-weight: bold');
    }
})();
