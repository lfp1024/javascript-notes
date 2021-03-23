let i = 1;
function somethingAsync(time) {
    console.log("fired");
    return delay(time).then(() => {
        // if (i > 3) throw Error('test error');
        if (i > 3) return Promise.reject(new Error('reject'));
        return Promise.resolve(i++)
    });
}
const items = [1000, 2000, 3000, 4000];

function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    });
}

// (async () => {
// console.time("first way");
// try {
// const promises = await Promise.all(items.map(e => somethingAsync(e)));
// for (const res of promises) {
//     console.log(res);
// }
// } catch (error) {
//     console.log('promise all ', error.message);
// }
// console.timeEnd("first way");

i = 1; //reset counter
console.time("second way");
// try {
for await (const res of items.map(e => somethingAsync(e))) {
    // do some calculations
    console.log(res);
}
// } catch (error) {
//     console.log('for await of catch error:', error.message);
// }
// console.timeEnd("second way");
// })();

function forAwaitOfTest() {
    for await (const res of items.map(e => somethingAsync(e))) {
        // do some calculations
        console.log(res);
    }
};

(async ()=>{

    forAwaitOfTest();
})()