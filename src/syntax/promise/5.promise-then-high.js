let Promise = require('./2.my-promise')

let promise = new Promise((resolve, reject) => {
    // resolve(1)
    reject(2)
})


// 值的穿透，从第一个then穿透到第三个then中，说明then中的参数是可选的
// 可以统一处理错误
promise.then().then().then(result => {
    console.log(result)
}, err => {
    console.log(err)
})