let fs = require('fs')
const { join } = require('path')
// let Promise = require('./2.my-promise')


const projectRootDir = join(__dirname, "../../../")
console.log("projectRootDir = ", projectRootDir)

// error first ,错误第一，异步方法无法通过try-catch 捕获异常
// 需求是读取一个文件获取路径，然后再继续读取

// 回调嵌套写法
// fs.readFile(join(projectRootDir, './README.md'), 'utf-8', (err, data) => {
//     // 错误处理
//     if (err) {

//     }
//     console.log("data = ", data)
//     fs.readFile(data, 'utf-8', (err, data) => {
//         // 错误处理
//         if (err) {

//         }
//         console.log("data = ", data)
//     })
// })

// 利用promise优化写法，链式调用写法
function readFileSync(filePath) {
    return new Promise((res, rej) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) return rej(err)
            // 一般加 return，因为 res 不会中断 promise 的执行（后面的代码还会执行），但是执行res/rej就意味着promise的作用已经结束了
            return res(data)
        })
    })
}

// then的链式调用：then一次获取第一次返回结果，再then第二次，解决嵌套问题
readFileSync(join(projectRootDir, './README.md')).then((data) => {
    console.log('获取到数据', data)
    // 这里需要通过 return 明确指定返回值，否则默认返回 undefined，传入下一个then的成功回调中（尤其是需要返回promise的情况）
    // return 100 //-> 下一个then的成功回调
    // throw Error('手动error') //-> 下一个then的失败回调
    return readFileSync(data)  //-> 根据返回的promise状态决定下一个then的回调
}).then((data) => {
    console.log('获取到数据', data)
}, (err) => {
    console.log('失败', err)
})