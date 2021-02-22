'use strict';

/**
 * js 参数值传递（地址、数值）
 */

(async () => {
    const lfo = {
        age: 10,
    };

    _grow(lfo);
    console.log('res = ', lfo);

    function _grow(person) {
        person.age++
    }

})();