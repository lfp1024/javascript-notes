//==================resolve(非promise)同步执行==========================

/* 
let Promise = require('./2.my-promise')
let p1 = new Promise((resolve, reject) => {
    resolve(11)
});
// 同步执行，new构造函数执行完之后p1就已经返回成功
console.log("p1 = ", p1) //  p1 =  Promise { 11 }

setTimeout(() => {
    console.log("p1 = ", p1) // p1 =  Promise { 11 }
}, 1000); 
*/

//==================resolve(promise)异步执行==========================
/* 
// resolve()的参数只能是个值类型,如果是表达式(函数或new操作符)会先将表达式在executor函数体中执行,然后再把返回值当做参数执行resolve

let Promise = require('./2.my-promise')
let p1 = new Promise((resolve, reject) => {
    resolve(new Promise(res => res('resolved')));
})

// 异步执行（源码中resolve最终是作为里面promise的then的第一个回调函数执行）
console.log("p1 = ", p1) // p1 =  Promise { <pending> }

setTimeout(() => {
    console.log("p1 = ", p1) // p1 =  Promise { 'resolved' }
}, 1000); 
*/


//===================测试 resolve内部 是否有对参数的判断==================
/*
var p1 = new Promise(function (resolve, reject) {
    resolve(Promise.resolve('resolve'));
});

setTimeout(() => {
    // 可知，外层promise的值是内层promise成功的结果。所以resolve内部是有对参数的判断(如果是 promise 则接续解析)
    console.log("p1 = ", p1) // p1 =  Promise { 'resolve' }
}, 1000); 
*/

//================= resolve (new Promise)递归解析=====================
/* 
p1 的 resolve 注册到下一轮循环执行
p2 的 resolve 注册到下一轮循环执行
p3 的 reject 当前执行栈中同步执行，将 p3.then 注册到下一轮循环执行

// 下一轮循环
p1 的 resolve 执行，将 p1.then 注册到下一轮循环执行
p2 的 resolve 执行，将 p2.then 注册到下一轮循环执行
p3.then 执行，输出 => p3 rejected: [object Object]

// 下一轮循环
p1.then 执行，输出 => p1 fulfilled: resolve
p2.then 执行，输出 => p2 rejected: reject
*/

/* 
let Promise = require('./2.my-promise')

var p1 = new Promise(function (resolve, reject) {
    resolve(new Promise(res => res('resolve')));
});

var p2 = new Promise(function (resolve, reject) {
    // 将resolve实参promise的状态变为自己的状态，将实参promise的值变为自己的值
    resolve(new Promise((res, rej) => { rej('reject') }));
});

var p3 = new Promise(function (resolve, reject) {
    reject(new Promise(res => res('resolve')));
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
);

// p3 rejected: [object Object]
// p1 fulfilled: resolve
// p2 rejected: reject 
*/


//==================resolve同步获取promise================

/*
// 在构造函数中被捕获异常，然后返回失败的promise
// 如果是 var p1 = ... 不报错,输出=> p1 =  Promise { undefined }
// 如果是 let p1 = ... 报错=> (node:4169) UnhandledPromiseRejectionWarning: ReferenceError: Cannot access 'p1' before initialization

let Promise = require('./2.my-promise')
 let p1 = new Promise(function (resolve, reject) {
    // 在构造函数中被捕获异常，然后返回失败的promise
    resolve(p1);
});

setTimeout(() => {
    console.log("p1 = ", p1)
}, 1000);

// 输出=>
// p1 =  Promise {
//     <rejected> ReferenceError: Cannot access 'p1' before initialization
//     ...
// }
*/


//====================resolve异步获取promise==================
//表明 resolve 中也有对promise死循环的判断

/* 
let Promise = require('./2.my-promise')
let p1 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        // let 没有变量提升，p1 在 构造函数执行完之前是没有初始化的（并不是undefined）
        // 所以循环引用只能发生在异步情况下(then 的回调函数中 或 定时器中)
        resolve(p1);
    }, 0);
});

setTimeout(() => {
    console.log("p1 = ", p1)
}, 1000);

// 输出=>
// p1 =  Promise {
//     <rejected> TypeError: Chaining cycle detected for promise #<Promise>
//     ...
// } 
*/


//=================================resolve(异常)================================

/* 
let Promise = require('./2.my-promise')
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
}, 1000); 

// 1-1
// 1-2
// p1 =  Promise {
//     <rejected> Error: 喔喔
//     ...
// } 
*/

//==============================resolve(thenable对象)================================

/* 
// let Promise = require('./2.my-promise')

let obj = {
    then: function (resolve, reject) {
        console.log("异步执行then")
        resolve('成功啦')
        // reject('失败啦')
        throw Error("Oops!")
    }
}

var p1 = new Promise(function (resolve, reject) {
    console.log("1")
    // 异步执行
    resolve(obj);
    console.log("2")
});
console.log("p1 = ", p1)
setTimeout(() => {
    console.log("p1 = ", p1) 
}, 1000);

// 1
// 2
// p1 =  Promise { <pending> }
// 异步执行then
// p1 =  Promise { <rejected> '失败啦' } 
*/