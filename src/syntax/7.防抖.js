'use strict';

/**
 * 防抖：停止触发delay秒后「自动执行」
 * 参考：
 *  https://github.com/mqyqingfeng/Blog/issues/22
 * 定时器实现
 *  1. 每次触发，重置定时器（清除原定时器，添加新定时器）
 */

(async () => {

    // 停止触发delay秒后「自动执行」
    // 如果持续触发，定时器一直被重置 => 永远不会执行
    function debounce1(fn, delay) {
        let timer;
        return (...args) => {
            console.log('debounce', Date.now());
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                fn.call(this, ...args)
            }, delay);
        }
    }

    // immediate = true:触发后立即执行一次，停止触发delay秒后，才能再次「触发执行」
    // 如果持续触发，定时器一直被重置，timer一直有值，callNow一直为false => 永远不会再次执行
    function debounce2(fn, delay, immediate) {
        let timer;
        return (...args) => {
            console.log('debounce', Date.now());
            if (timer) clearTimeout(timer);
            if (immediate) {
                let callNow = !timer; // 第一次 timer=undefined callNow=true =>执行；后续 timer!==undefined =>不执行
                timer = setTimeout(function () {
                    timer = null; // 停止触发delay秒后，定时器执行，timer=null，再次触发时 callNow=true =>执行
                }, delay)
                if (callNow) fn.call(this, ...args)
            } else {
                timer = setTimeout(function () {
                    fn.call(this, ...args)
                }, delay);
            }
        }
    }

    // immediate = true:触发后立即执行一次，停止触发delay秒后，才能再次「触发执行」
    // cancel 取消防抖，不用停止delay秒后才能再次触发，取消防抖后，立刻可以再次触发
    function debounce3(fn, delay, immediate) {
        let timer;
        const debounced = (...args) => {
            console.log('debounce', Date.now());
            if (timer) clearTimeout(timer);
            if (immediate) {
                let callNow = !timer; // 第一次 timer=undefined callNow=true =>执行；后续 timer!==undefined =>不执行
                timer = setTimeout(function () { // 如果持续触发，定时器一直被重置，timer一直有值 => 永远不会再次执行
                    timer = null; // 停止触发delay秒后，定时器执行，timer=null，再次触发时 callNow=true =>执行
                }, delay)
                if (callNow) fn.call(this, ...args)
            } else {
                timer = setTimeout(function () {
                    fn.call(this, ...args)
                }, delay);
            }
        }
        debounced.cancel = () => {
            timer = null;
        }
        return debounced;
    }

    function bark(n, m) {
        console.log('bark', Date.now());
        console.log('汪汪', n, m);
    }

    // const debounceBark = debounce1(bark, 10);
    // const debounceBark = debounce2(bark, 10, true);
    const debounceBark = debounce3(bark, 10, true);

    let n = 0;
    while (true) {
        n++;
        console.log('n = ', n);
        debounceBark(n, 'hi');
        if (n === 3) {
            // 测试 debounce2
            // console.log('延迟delay秒');
            // await new Promise(res => setTimeout(res, 10))
            
            // 测试 debounce3
            // console.log('取消延迟');
            // debounceBark.cancel();
        } else {
            if (n > 5) {
                console.log('exit');
                break;
            };
            await new Promise(res => setTimeout(res, 5))
        }
    }

})();