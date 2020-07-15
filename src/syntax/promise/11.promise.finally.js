const Promise = require("./2.my-promise")

Promise.reject(123).finally(() => {
    console.log("finally")
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