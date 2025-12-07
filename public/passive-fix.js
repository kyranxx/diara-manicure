// Passive Event Listener Fix - Suppresses third-party console warnings
// This must run BEFORE any third-party scripts load
(function () {
    'use strict';

    if (typeof window === 'undefined' || typeof EventTarget === 'undefined') {
        return;
    }

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

    const originalAddEventListener = EventTarget.prototype.addEventListener;
    const originalRemoveEventListener = EventTarget.prototype.removeEventListener;

    const passiveEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel', 'mousewheel', 'scroll'];

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
                newOptions = Object.assign({}, options, { passive: true });
            }

            return originalAddEventListener.call(this, type, listener, newOptions);
        }

        return originalAddEventListener.call(this, type, listener, options);
    };

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
})();
