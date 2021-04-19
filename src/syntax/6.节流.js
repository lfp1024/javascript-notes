'use strict';

/**
 * 节流：持续触发时，每n秒执行一次函数
 * 参考：
 *  https://github.com/mqyqingfeng/Blog/issues/26
 *  
 */

(async () => {
    // 时间戳
    // 触发后立即执行，停止触发后不再执行
    // function throttle(fn, delay) {
    //     let previous = 0;
    //     return (...args) => {
    //         const now = Date.now();
    //         if (now - previous > delay) {
    //             fn.call(this, ...args);
    //             previous = now;
    //         }
    //     };
    // }

    // 定时器
    // 触发后延迟 delay 秒执行，停止触发后再执行一次
    // function throttle(fn, delay) {
    //     let timer;
    //     return (...args) => {
    //         if (!timer) {
    //             timer = setTimeout(() => { // 主进程进入死循环后，定时器无法执行
    //                 fn.call(this, ...args);
    //                 timer = null; // 可以再次添加定时器了（区别于 clearTimeout），不是为了垃圾回收
    //             }, delay)
    //         }
    //     }
    // }
    // 触发后立即执行，停止触发后不再执行
    // function throttle(fn, delay) {
    //     let timer;
    //     return (...args) => {
    //         if (!timer) {
    //             timer = setTimeout(() => { // 主进程进入死循环后，定时器无法执行
    //                 timer = null; // 可以再次添加定时器了（区别于 clearTimeout），不是为了垃圾回收
    //             }, delay)
    //             fn.call(this, ...args);
    //         }
    //     }
    // }

    // 双剑合璧
    // 触发间隔 > delay 走时间戳；触发间隔 < delay 第一次走时间戳，后续走定时器
    // function throttle(fn, delay) {
    //     let timer;
    //     let previous = 0;
    //     return (...args) => {
    //         const now = Date.now();
    //         const remaining = delay - (now - previous);
    //         if (remaining <= 0 || remaining > delay) {
    //             // 1. 不调整时间，now > previous; remaining <= 0 时，执行
    //             // 2. 时间调快，now >> previous => remaining <= 0 时，执行
    //             // 3. 时间调慢，now < previous => remaining > delay，执行
    //             if (timer) {
    //                 clearTimeout(timer);
    //                 timer = null;
    //             }
    //             previous = now;
    //             fn.call(this, ...args);
    //         } else if (!timer) {
    //             timer = setTimeout(() => {
    //                 previous = Date.now();
    //                 timer = null;
    //                 fn.call(this, ...args);
    //             }, remaining);
    //         }
    //     }
    // }

    /**
     * 第四版 有头无尾 或者 无头有尾
     * leading：false 表示禁用第一次执行
     * trailing: false 表示禁用停止触发的回调
     */
    // function throttle(fn, delay, options = {}) {
    //     let timer;
    //     let previous = 0;
    //     return (...args) => {
    //         const now = Date.now();
    //         if (!previous && options.leading === false) previous = now;
    //         const remaining = delay - (now - previous);
    //         if (remaining <= 0 || remaining > delay) {
    //             if (timer) {
    //                 clearTimeout(timer);
    //                 timer = null;
    //             }
    //             previous = now;
    //             fn.call(this, ...args);
    //         } else if (!timer && options.trailing !== false) {
    //             timer = setTimeout(() => {
    //                 // 有必要。如果直接 previous = Date.now()，则第一次「执行」后等待 delay 时间再次「触发」
    //                 // 此时 previous 是第一次触发，等待delay时间后，定时器回调执行时的时间。而 `now` 是当前触发的时间。第一次执行后又等待了 delay 时间
    //                 // 因此 now-previous >= delay, remaining <=0; 函数会立即执行，违反了‘禁用第一次执行的前提’
    //                 previous = options.leading === false ? 0 : Date.now();
    //                 timer = null;
    //                 fn.call(this, ...args);
    //             }, remaining);
    //         }
    //     }
    // }

    function throttle(fn, delay, options = {}) {
        let timer;
        let previous = 0;
        const throttled = (...args) => {
            const now = Date.now();
            if (!previous && options.leading === false) previous = now;
            const remaining = delay - (now - previous);
            if (remaining <= 0 || remaining > delay) {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                previous = now;
                fn.call(this, ...args);
            } else if (!timer && options.trailing !== false) {
                timer = setTimeout(() => {
                    // 有必要。如果直接 previous = Date.now()，则第一次「执行」后等待 delay 时间再次「触发」
                    // 此时 previous 是第一次触发，等待delay时间后，定时器回调执行时的时间。而 `now` 是当前触发的时间。第一次执行后又等待了 delay 时间
                    // 因此 now-previous >= delay, remaining <=0; 函数会立即执行，违反了‘禁用第一次执行的前提’
                    previous = options.leading === false ? 0 : Date.now();
                    timer = null;
                    fn.call(this, ...args);
                }, remaining);
            }
        }
        throttled.cancel = () => {
            clearTimeout(timer);
            previous = 0;
            timer = null;
        }
        return throttled;
    }

    function bark(n, m) {
        console.log('汪汪', n, m);
    }

    const throttleBark = throttle(bark, 10, { trailing: true });

    let n = 0;
    while (true) {
        n++;
        await new Promise(res => setTimeout(res, 5))
        throttleBark(n, 'hi');
        console.log('n = ', n);
        if (n > 5) {
            console.log('exit');
            throttleBark.cancel();
            break;
        };
    }

})();
