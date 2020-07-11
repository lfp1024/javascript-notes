//==================resolve 同步执行===============
// resolve()的参数只能是个值类型,如果是表达式(函数或new操作符)会先将表达式在executor函数体中执行,然后再把返回结果当做参数执行resolve
let Promise = require('./2.my-promise')

let p1 = new Promise(function (resolve, reject) {
    // 直接调用 resolve 是同步执行,只是then中的回调函数是异步的
    resolve(new Promise(res => res('resolveddd')));
    // resolve(11)
});
console.log("p1 = ", p1)
// setTimeout(() => {
//     console.log("p1 = ", p1)
// }, 1000);

//================================Promise.resolve()========================
/* 
let Promise = require('./2.my-promise')

var p1 = new Promise(function (resolve, reject) {
    resolve(Promise.resolve('resolve'));
});

var p2 = new Promise(function (resolve, reject) {
    // 将resolve实参Promise的状态变为自己的状态，将实参Promise的值变为自己的值
    resolve(Promise.reject('reject'));
});

var p3 = new Promise(function (resolve, reject) {
    reject(Promise.resolve('resolve'));
});

p1.then(
    function fulfilled(value) {
        console.log('p1 fulfilled: ' + value);
    },
    function rejected(err) {
        console.log('p1 rejected: ' + err);
    }
);

p2.then(
    function fulfilled(value) {
        console.log('p2 fulfilled: ' + value);
    },
    function rejected(err) {
        console.log('p2 rejected: ' + err);
    }
);

p3.then(
    function fulfilled(value) {
        console.log('p3 fulfilled: ' + value);
    },
    function rejected(err) {
        console.log('p3 rejected: ' + err);
    }
); */


// p3 rejected: [object Promise]
// p1 fulfilled: resolve
// p2 rejected: reject

//================= resolve (promise)递归解析=====================

// let Promise = require('./2.my-promise')

// var p1 = new Promise(function (resolve, reject) {
//     resolve(new Promise(res => res('resolve')));
// });

// var p2 = new Promise(function (resolve, reject) {
//     // 将resolve实参Promise的状态变为自己的状态，将实参Promise的值变为自己的值
//     resolve(new Promise((res, rej) => { rej('reject') }));
// });

// var p3 = new Promise(function (resolve, reject) {
//     reject(new Promise(res => res('resolve')));
// });

// p1.then(
//     function fulfilled(value) {
//         console.log('p1 fulfilled: ' + value);
//     },
//     function rejected(err) {
//         console.log('p1 rejected: ' + err);
//     }
// );

// // p2 rejected: reject
// p2.then(
//     function fulfilled(value) {
//         console.log('p2 fulfilled: ' + value);
//     },
//     function rejected(err) {
//         console.log('p2 rejected: ' + err);
//     }
// );

// p3.then(
//     function fulfilled(value) {
//         console.log('p3 fulfilled: ' + value);
//     },
//     function rejected(err) {
//         console.log('p3 rejected: ' + err);
//     }
// );



//=================取值报错对比============================

/* let Promise = require('./2.my-promise')

let obj = { then: function () { console.log("thennnnnnnnn") } }
Object.defineProperty(obj,'then',{
    get(){
        console.log("获取then")
        throw Error("我抛的错误")
    }
})

// 官方报错
// 获取then
// (node:25112) UnhandledPromiseRejectionWarning: Error: 我抛的错误

// 我报错
// 获取then
// Error: 我抛的错误

var p1 = new Promise(function (resolve, reject) {
    resolve(obj);
});

setTimeout(() => {
    // 可知，外层promise的值是内层promise成功的结果。所以resolve内部是有对参数的判断
    console.log("p1 = ", p1) // p1 =  Promise { 'resolve' }
}, 1000);

// 官方prmise 获取的结果
// p1 =  Promise {
//     <rejected> Error: 我抛的错误
//         ...
// }

// 自己实现的promise 获取的结果
// p1 =  MyPromise {
//     status: 'REJECTED',
//     value: Error: 我抛的错误
//     ...
// } */

//==========================resolve内部是有对参数的判断==================
/*
var p1 = new Promise(function (resolve, reject) {
    resolve(Promise.resolve('resolve'));
});

setTimeout(() => {
    // 可知，外层promise的值是内层promise成功的结果。所以resolve内部是有对参数的判断
    console.log("p1 = ", p1) // p1 =  Promise { 'resolve' }
}, 1000); */

//==================resolve同步获取promise================

// 如果是 var p1 = ... 不报错,输出=> p1 =  Promise { undefined }
// 如果是 let p1 = ... 报错=> (node:4169) UnhandledPromiseRejectionWarning: ReferenceError: Cannot access 'p1' before initialization

/*
 let p1 = new Promise(function (resolve, reject) {
    resolve(p1);
});

setTimeout(() => {
    console.log("p1 = ", p1)
}, 1000);
*/

// 输出=>
// p1 =  Promise {
//     <rejected> ReferenceError: Cannot access 'p1' before initialization
//     ...
// }

//====================resolve异步获取promise==================
//表明 resolve 中也有对promise死循环的判断

// 报错=> UnhandledPromiseRejectionWarning: TypeError: Chaining cycle detected for promise #<Promise>
/* 
let p1 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve(p1);
    }, 0);
});

setTimeout(() => {
    console.log("p1 = ", p1)
}, 1000);
 */
// 输出=>
// p1 =  Promise {
//     <rejected> TypeError: Chaining cycle detected for promise #<Promise>
//     ...
// }

//=================resolve 异常===================

/* let Promise = require('./2.my-promise')
let p1 = new Promise(function (resolve, reject) {
    console.log("1-1")
    // executor 函数执行过程中会先执行匿名函数,然后再将返回值作为参数执行 resolve 方法
    // 而匿名函数在执行过程中报错了,所以被 executor 的try-catch 捕获到了,于是执行 reject 方法
    resolve((() => {
        console.log("1-2")
        throw new Error("喔喔")
    })())
    console.log("2-1")
});

setTimeout(() => {
    console.log("p1 = ", p1)
}, 1000); */