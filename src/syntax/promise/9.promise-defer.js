const fs = require("fs")
const Promise = require("./2.my-promise")

// function read(filePath) {
//     // 上来先套一层promise
//     return new Promise((resolve, reject) => {
//         fs.readFile(filePath, "utf-8", (err, data) => {
//             if (err) {
//                 return reject(err)
//             }
//             return resolve(data)
//         })
//     })
// }

// Q 库常用写法，解决嵌套promise的写法
function read(filePath) {
    // 快速创建一个promise，不用在外面套一层promise
    let dfd = Promise.defer()
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            return dfd.reject(err)
        }
        return dfd.resolve(data)
    })
    return dfd.promise
}

read("./name.txt").then(result => {
    return read(result)
}).then(result => {
    console.log("result is =", result)
})