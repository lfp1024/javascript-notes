'use strict';

/**
 * 如果 catch 中有耗时操作，则finally会等待其完再执行
 */

(async () => {
    try {
        const a = 1 / b;
    } catch (error) {
        console.log('error = ', error.message);
        await new Promise(res => setTimeout(() => {
            console.log('catch');
            res();
        }, 5000));
    } finally {
        console.log('finally');
    }

})();
