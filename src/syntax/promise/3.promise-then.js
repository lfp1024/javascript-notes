
//============================then链式调用及值传递===============================
// let fs = require('fs')
// let Promise = require('./2.my-promise')
// 需求是读取一个文件获取路径，然后再继续读取

// 【回调嵌套】写法
// error first ,错误第一，异步方法无法通过try-catch 捕获异常
// fs.readFile('./name.txt', 'utf-8', (err, data) => {
//     // 错误处理
//     if (err) {
//         //...
//     }
//     console.log("data = ", data)
//     fs.readFile(data, 'utf-8', (err, data) => {
//         // 错误处理
//         if (err) {
//             // ...
//         }
//         console.log("data = ", data)
//     })
// })

// // 利用promise优化写法，【链式调用】写法
// function readFileSync(filePath) {
//     return new Promise((res, rej) => {
//         fs.readFile(filePath, 'utf-8', (err, data) => {
//             if (err) return rej(err)
//             // 一般加 return，因为 res 不会结束 promise 的执行（后面的代码还会执行），但是执行res/rej就意味着promise的作用已经完成了
//             return res(data)
//         })
//     })
// }

// // then的链式调用：then一次获取第一次返回结果，再then第二次，解决嵌套问题
// readFileSync('./name.txt').then((data) => {
//     console.log('获取到数据', data)
//     // 这里需要通过 return 明确指定返回值，否则默认返回 undefined，传入下一个then的成功回调中（尤其是需要返回promise的情况）
//     // return 100 //-> 下一个then的成功回调
//     // throw Error('手动error') //-> 下一个then的失败回调
//     return readFileSync(data)  //-> 根据返回的promise状态决定下一个then的回调
// }).then((data) => {
//     console.log('获取到数据', data)
// }, (err) => {
//     console.log('失败', err)
// })

// 用 setTimeout 实现then的异步调用（宏任务），跟es6执行顺序不同。
// data =  age.txt
// data =  27
// 获取到数据 age.txt
// 获取到数据 27

// 换用 process.nextTick 来实现则执行顺序相同
// fs.readFile 的回调函数应该也是宏任务，读取到数据之后触发执行。而包装的 readFileSync 里面也是个宏任务，当时这个宏任务执行的时候
// 会添加一个微任务（then），然后立即执行微任务then的回调。因此顺序如下：
// data =  age.txt
// 获取到数据 age.txt
// data =  27
// 获取到数据 27



//=============================测试 then 循环引用问题======================

/* 
let Promise = require('./2.my-promise')

let promise = new Promise((resolve, reject) => {
    resolve(1)
})
// 循环引用，自己等待自己
let p2 = promise.then(value => {
    // then中第一个参数函数异步执行的时候，then返回promise的构造函数已经执行完，可以拿到p2的值，构成循环引用
    return p2 // UnhandledPromiseRejectionWarning: TypeError: Chaining cycle detected for promise #<Promise>
})
// 也无法在外面调用 resolve 使自己返回
// p2.resolve() // TypeError: p2.resolve is not a function

// 需要通过 p2 监听自己的返回结果（通过 reject 回调，捕获异常），否则会报（UnhandledPromiseRejectionWarning）
p2.then(() => { }, (err) => {
    console.log(err) // [TypeError: Chaining cycle detected for promise #<Promise>]
})

setTimeout(() => {
    console.log("p2 = ", p2)
}, 0);

// p2 =  Promise {
//     <rejected> [TypeError: Chaining cycle detected for promise #<Promise>]
// }
 */

//=======================测试then的参数函数返回promise=======================
/*
当前 then 返回一个新的promise，执行当前then的参数函数，其返回结果
 1. 如果是普通值则当前then返回一个resolved的promise
 2. 如果是promise，则调用该promise的then方法（内部实现自带的）获取该promise的状态和值，调用该promise的then方法时需要传递两个参数
    这两个参数就是当前then返回promise的executor中提供的resolve reject（代码中实现）
    1. 如果该promise返回成功，则调用当前then返回promise的resolve方法，当前then返回一个成功的promise
    2. 如果该promise返回失败，则调用当前then返回promise的reject方法，当前then返回一个失败的promise
*/
// let Promise = require('./2.my-promise')
// let promise = new Promise((resolve, reject) => {
//     resolve(1)
// })
// let promise2 = promise.then(result => {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res("success")
//             // rej("fail")
//         }, 1000);
//     })
// })
// // 外面想要获取当前then返回promise的结果，还是要调用当前then返回promise的then方法
// promise2.then(res => {
//     console.log("当前then返回promise的值", res)   // 当前then返回promise的结果 success
// }, err => {
//     console.log("当前then返回promise的值", err)   // 当前then返回promise的结果：fail
// })


//=========测试 then的参数函数返回 new Promise，与 resolve(new Promise) 结合========

// let Promise = require('./2.my-promise')

// let p1 = new Promise((resolve, reject) => {
//     resolve(1)
// })

// 3层promise，最外层p2，中间层then的第一个回调返回的promise[p3]，最内层[p3]resolve的值是一个promise
// let p2 = p1.then(value => {
//     // then的参数函数返回一个 new Promise
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             // resolve 又返回一个promise，递归解析
//             resolve(new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     // 最内层promise调用resolve成功之后，会执行其then的第一个回调，执行最外层p2的resolve
//                     // resolve("success") 
//                     // 最内层promise调用reject失败之后，会执行其then的第二个回调，执行最外层p2的reject
//                     reject("fail")
//                 }, 1000);
//             }))
//         }, 1000);
//     })
// })

// 外面想要获取当前then返回promise的结果，还是要调用当前then返回promise的then方法
// p2.then(res => {
//     console.log("当前then返回promise的结果1", res)   // 当前then返回promise的结果 success
// }, err => {
//     console.log("当前then返回promise的原因1", err)   // 当前then返回promise的原因：fail
// })


// 【promise失败又返回promise】
// let promise = new Promise((resolve, reject) => {
//     resolve(1)
// })
// let promise2 = promise.then(value => {
//     // then的参数函数返回一个 new Promise
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             // reject 又返回的一个promise，不再递归解析（但是会执行new表达式，执行完后立即返回一个 PENDING 状态的promise）
//             reject(new Promise((resolve, reject) => {
//                 console.log("执行")
//                 setTimeout(() => {
//                     resolve("success")
//                 }, 1000);
//             }))
//         }, 1000);
//     })
// })

// 外面想要获取当前then返回promise的结果，还是要调用当前then返回promise的then方法
// promise2.then(res => {
//     console.log("当前then返回promise的结果2", res)
// }, err => {
//     console.log("当前then返回promise的原因2", err)
// })

// 官方的
// 当前then返回promise的原因 Promise { <pending> }

// ******my promise******
// 当前then返回promise的原因 MyPromise {
//   status: 'PENDING',
//   value: undefined,
//   onResolvedCallbacks: [],
//   onRejectedCallbacks: []
// }



//========================测试then的默认参数函数======================

// let Promise = require('./2.my-promise')

// let promise = new Promise((resolve, reject) => {
//     // resolve(1)
//     reject(2)
// })

// 值的穿透，从第一个then穿透到第三个then中，说明then中的参数是可选的
// 这样可以做到统一处理错误（让错误穿透到最后的catch中）
// promise.then().then().then(result => {
//     console.log(result) // 1
// }, err => {
//     console.log(err) // 2
// })