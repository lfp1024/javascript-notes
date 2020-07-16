const Promise = require("./2.my-promise")

Promise.reject(123).finally((v) => {
    console.log("finally", v)   // finally undefined（无法拿到前面promise的返回值）
    return new Promise((res, rej) => {
        setTimeout(() => {
            // res("ok")
            rej("fail")
        }, 1000);
    })
}).then(result => {
    console.log("result = ", result)
}).catch(err => {
    console.log("err = ", err)
})