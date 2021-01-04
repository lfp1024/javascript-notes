'use strict';


(() => {
    //         key1 value1(key2 value2)
    let obj = { 1: { 12: 1, 13: 0 } };
    // let obj = {}; // 不会进入
    for (const key1 in obj) {
        console.log('111 ', obj[key1]);
        for (const key2 in obj[key1]) {
            console.log('key1 = ', key1);
            console.log('key2 = ', key2);
            console.log('value2 = ', obj[key1][key2]);
        }
    }
})();
