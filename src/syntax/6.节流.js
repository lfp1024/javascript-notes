'use strict';


(async () => {
    function throttle(fn, delay) {
        let previous = 0;
        return (...args) => {
            const now = Date.now();
            if (now - previous > delay) {
                fn.call(this, ...args);
                previous = now;
            }
        };
    }

    function bark(n, g) {
        console.log('汪汪', n, g);
    }

    const throttleBark = throttle(bark, 1000);

    let n = 0;
    while (true) {
        n++;
        throttleBark(n, 'hi');
    }

})();
