/* 
发布订阅模式也叫 on-emit 模式，主要分为两个部分
on-订阅：把函数维护到一个数组中
emit-发布：把数组中的函数依次执行
*/

// 发布订阅模式
// 1. 发布和订阅之间没有依赖关系。订阅之后，事件发生可以发布也可以不发布
// 2. 需要靠中介（回调数组）实现
// 3. 先订阅，发布（事件发生）的时候手动依次执行
// 4. 应用非常广泛，基本上每个库都离不开发布订阅
// 5. 跟node 的 EventEmitter 很像
const event = {
    cbArr: [],
    // 收集所有的订阅用户
    on(cb) {
        // this 指代 event
        this.cbArr.push(cb)
    },

    // 事件发生，触发所有订阅用户，执行所有回调
    emit() {
        this.cbArr.forEach(cb => cb())
    }
}

// 按照订阅先后顺序执行
event.on(function () {
    console.log("执行")
})

event.on(function () {
    if (Object.keys(school).length === 2) {
        console.log(school)
    }
})

let school = {}
let fs = require('fs')
let readline = require('readline')

let path = "../../README.md"
fs.readFile(path, 'utf-8', function (err, data) {
    school.name = data
    event.emit()
})

const rl = readline.createInterface({ input: fs.createReadStream(path) })
const getSecondLine = (() => {
    let times = 0
    return (line) => {
        times++
        if (times === 2) {
            school.age = line
            event.emit()
        }
    }
})()
rl.on('line', (line) => {
    getSecondLine(line)
})