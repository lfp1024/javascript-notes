'use strict';

function forin(params) {
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
}

async function forinAwait() {

    let obj = {
        name: 'lfo',
        age: 23
    };
    console.log('start');

    for (const key in obj) {
        await new Promise(res => setTimeout(() => {
            console.log(Date.now(), key, obj[key]);
            res();
        }, 1000))
        console.log(Date.now(),'haha');
    }

    // ['a', 'b'].forEach(async e => {
    //     await new Promise(res => setTimeout(() => {
    //         console.log(Date.now(), e);
    //         res();
    //     }, 1000))
    //     console.log(Date.now(),'hehe');
    // });

    console.log('end');
}



forinAwait();