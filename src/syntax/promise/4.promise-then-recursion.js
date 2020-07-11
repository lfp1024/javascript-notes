// let Promise = require('./2.my-promise')

let promise = new Promise((resolve, reject) => {
    resolve(1)
    // let 没有变量提升，p1在new 构造函数执行完之前是没有初始化的（并不是undefined）
    // 所以循环引用只能发生在异步情况下(then 的回调函数中 或 定时器中)
    setTimeout(() => {
        resolve(promise) // UnhandledPromiseRejectionWarning: TypeError: Chaining cycle detected for promise #<Promise>
    }, 0);
})


/* // 循环引用，自己等待自己
let p2 = promise.then(result => {
    return p2 // UnhandledPromiseRejectionWarning: TypeError: Chaining cycle detected for promise #<Promise>
})
// 也无法在外面调用 resolve 使自己返回
// p2.resolve() // TypeError: p2.resolve is not a function

// 需要通过 p2 监听自己的返回结果（通过 reject 回调，捕获异常），否则会报上面的错误（UnhandledPromiseRejectionWarning）
p2.then(() => {

}, (err) => {
    console.log(err) // [TypeError: Chaining cycle detected for promise #<Promise>]
})  */


/*
当前 then 返回的也是一个promise，执行当前then的第一个回调函数，返回结果
如果是普通值则当前then返回一个resolved的promise
如果是promise，则调用这个新promise的then方法（内部实现自带的）获取这个新promise的状态，调用它的then方法的时候需要传递两个参数
这两个参数就是当前then返回promise的executor中提供的resolve reject。
    1. 如果新promise返回成功，则调用当前then返回promise的resolve方法，当前then返回一个成功的promise
    2. 如果新promise返回失败，则调用当前then返回promise的reject方法，当前then返回一个失败的promise
*/
/*
let promise2 = promise.then(result => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("success")
            // rej("fail")
        }, 1000);
    })
})
// 外面想要获取当前then返回promise的结果，还是要调用当前then返回promise的then方法
promise2.then(res => {
    console.log("当前then返回promise的结果", res)   // 当前then返回promise的结果 success
}, err => {
    console.log("当前then返回promise的结果", err)   // 当前then返回promise的结果：fail
})
*/

// 【promise成功又返回promise】
/*

let promise = new Promise((resolve, reject) => {
    resolve(1)
})

let promise2 = promise.then(result => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            // res 返回的又是一个promise，会递归解析，直到返回非promise
            res(new Promise((res, rej) => {
                setTimeout(() => {
                    res("success")
                }, 1000);
            }))
        }, 1000);
    })
})
// 外面想要获取当前then返回promise的结果，还是要调用当前then返回promise的then方法
promise2.then(res => {
    console.log("当前then返回promise的结果", res)   // 当前then返回promise的结果 success
}, err => {
    console.log("当前then返回promise的原因", err)   // 当前then返回promise的原因：fail
})
*/

/* // 【promise失败又返回promise】
let promise2 = promise.then(result => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            // rej 返回的又是一个promise，不再递归解析
            rej(new Promise((res, rej) => {
                setTimeout(() => {
                    res("success")
                }, 1000);
            }))
        }, 1000);
    })
})
// 外面想要获取当前then返回promise的结果，还是要调用当前then返回promise的then方法
promise2.then(res => {
    console.log("当前then返回promise的结果", res)
}, err => {
    console.log("当前then返回promise的原因", err)
}) */

// 官方的
// 当前then返回promise的原因 Promise { <pending> }

// ******my promise******
// 当前then返回promise的原因 MyPromise {
//   status: 'PENDING',
//   value: undefined,
//   onResolvedCallbacks: [],
//   onRejectedCallbacks: []
// }