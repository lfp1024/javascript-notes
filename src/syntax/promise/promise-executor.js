
//====================测试executor：不传递，非函数=========================
//=> 直接抛错，无法通过catch捕获

// let Promise = require('./2.my-promise')

// let p = new Promise() // TypeError: Promise resolver undefined is not a function
// let p = new Promise(123) // TypeError: Promise resolver 123 is not a function
// p.then(null, e => console.log(e))


//====================测试executor 执行同步代码=====================
// let Promise = require('./2.my-promise')

// 同步代码
// let promise = new Promise((resolve, reject) => {
//     // 以下都是同步代码
//     // 由用户决定成功还是失败已经成功和失败的原因
//     console.log("executor 同步执行")

//     let result = "收到offer"
//     // resolve方法同步执行，但当result为promise实例时，异步执行
//     // resolve(result)

//     let err = "没收到offer"
//     // reject方法是同步执行的
//     // reject(err)

//     // 同步代码报错，捕获并返回一个失败的promise
//     // throw new Error('没收到offer')
// })

// promise 里面如果是同步代码，则executor执行完毕，返回的 promise 已经不是 pending 状态了
// console.log('初始状态：', promise)
// promise.then((result) => {
//     console.log(`成功的结果: ${result}`)
// }, (err) => {
//     console.log(`失败的原因：${err}`)
// })


//====================测试executor 执行异步代码=====================
// let Promise = require('./2.my-promise')

// 异步代码
let promise = new Promise((resolve, reject) => {
    // 以下都是异步代码
    // 由用户决定成功还是失败已经成功和失败的原因

    setTimeout(() => {
        // let result = "收到offer"
        // resolve(result)

        // let err = "没收到offer"
        // reject(err)

        // 异步抛出异常，无法捕获，直接抛出
        throw new Error('没收到offer')

    }, 1000);
})

// promise 里面如果是异步代码，则executor执行完毕，返回的 promise 还是 pending 状态
// 因此 then 中方法异步执行
console.log('初始状态：', promise)
promise.then((result) => {
    console.log(`成功的结果: ${result}`)
}, (err) => {
    console.log(`失败的原因：${err}`)
})





