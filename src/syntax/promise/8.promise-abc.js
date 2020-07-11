
// let Promise = require('./2.my-promise')

// 同步代码
// let promise = new Promise((resolve, reject) => {
//     // 以下都是同步代码
//     // 由用户决定成功还是失败已经成功和失败的原因

//     let result = "收到offer"
//     resolve(result)

//     let err = "没收到offer"
//     reject(err)

//     throw new Error('没收到offer')
// })

// promise 里面如果是同步代码，则这里调用 then 的时候 promise 已经不是 pending 状态了
// console.log('初始状态：', promise)
// promise.then((result) => {
//     console.log(`成功的结果: ${result}`)
// }, (err) => {
//     console.log(`失败的原因：${err}`)
// })

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

        // 异步抛出异常，无法捕获，如何解决 ？？？？？？？？？
        throw new Error('没收到offer')

    }, 1000);

})
// promise 里面如果是异步代码，则这里调用 then 的时候 promise 还是 pending 状态
// 因此 then 中方法的执行应该是异步的
console.log('初始状态：', promise.status)
promise.then((result) => {
    console.log(`成功的结果: ${result}`)
}, (err) => {
    console.log(`失败的原因：${err}`)
}).catch(e => {
    console.log("catch = ", e)
})

promise.then((result) => {
    console.log(`成功的结果: ${result}`)
}, (err) => {
    console.log(`失败的原因：${err}`)
})






