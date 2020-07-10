//===============================before 函数=============================

// 业务代码
function say(a, b) {
    console.log("say", a, b)
}

// 扩展业务代码，添加一个在它之前执行的操作（不改变原有方法，包装AOP编程）
Function.prototype.before = function (callback) {
    // 这里的THIS很明确，就是 say
    let that = this
    return function (...args) { // 通过剩余运算符获取多个参数，返回一个数组
        callback()
        // 调用 beforeSay 的时候没有传入是谁调用的，因此这里直接写 this 指向 window 或 global
        // 我们这个函数的目的就是在 say 之前通过callback做些操作，因此返回的函数中需要通过THIS获取到say 并执行
        // 因此可以在上级上下文中定义一个变量传入THIS，或者使用箭头函数

        // 还可以控制向原函数中传递参数
        that(...args) //展开运算符，将参数数组以列表的形式传递给函数。代替 apply
    }

    return (...args) => { // 箭头函数没有arguments
        callback()
        // 箭头函数中的THIS继承上级上下文中的THIS
        this(...args)
    }
}

let beforeSay = say.before(function () {
    console.log("before say")
})

// beforeSay()


//====================柯里化函数，反柯里化函数=========================

// function isType(value, type) {
//     return Object.prototype.toString.call(value) === `[object ${type}]`
// }
// console.log(isType([], 'Array')) // true


// 将方法细分 isString isArray
// function isType(type) {
//     return function (value) {
//         return Object.prototype.toString.call(value) === `[object ${type}]`
//     }
// }
// let isArray = isType('Array')
// let isString = isType('String')

// console.log(isArray('')) // false
// console.log(isString([])) // false
// console.log(isArray([])) // true
// console.log(isString('')) // true


// 通过一个柯里化函数，实现fn 通用的 柯里化方法
// fn 的参数分步传递，将函数细化为功能更具体的函数（不能一次都传递，而是每调用一次传递一个，此时需要用柯里化函数实现）
// 类似 bind，改变函数中某些变量的值，返回一个期望中的函数，在最终调用时 执行

function isType(type, value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
}

const curring = (fn, arr = []) => {
    // fn 是传入的函数，arr是fn的实参数组
    let fnArgsLength = fn.length
    // console.log("fn args length = ", fn.name, fnArgsLength)
    return (...args) => {
        // 最后 那个参数是 期望函数 每次调用时传递的，不能保留
        let newArr = [...arr, ...args]
        console.log("newArr = ", newArr)
        if (newArr.length < fnArgsLength) return curring(fn, newArr) // 返回 curring执行后的结果
        else return fn(...newArr) // 返回 fn 执行后的结果

    }
}
// const isArray = curring(isType)('Array') // 是通过函数执行的返回结果赋值
// console.log(isArray.toString())
// const isString = curring(isType)('String')
// console.log(isArray('')) // false
// console.log(isString([])) // false 
// console.log(isArray([])) // true         // 二次调用不会二次执行函数，而是直接使用值
// console.log(isString('')) // true

const types = ['String', 'Number', 'Boolean']
let utils = {}
types.forEach((type) => {
    utils[`is${type}`] = curring(isType)(type)
    console.log("1")
})
console.log("utils = ", utils)

// 函数的对象转换为json后消失
// console.log("utils = ", JSON.stringify(utils))







const sum = (a, b, c, d, f) => {
    return a + b + c + d - f
}
// let sum1 = curring(sum)(1, 2)(3, 4)
// console.log("--------------")
// console.log("sum res = ", sum1(5)) // 5
// console.log("sum res = ", sum1(6)) // 4[]


//=====================after 函数===================
// 通过回调函数获取多个异步请求结果

let readline = require('readline')
let fs = require("fs")

let school = {}

// 方式一
// let index = 2
// const cb = () => {
//     if (++index === 2) console.log(school)
// }

// 方式二
// const after = (times, fn) => {
//     return () => {
//         if (--times === 0) fn()
//     }
// }
// 另一种写法 直接 => 一个函数
// const after = (times, callback) => () => {
//     if (--times === 0) fn()
// }

// let cb = after(2, () => {
//     console.log(school)
// })

// let filePath = '../../README.md'

// const rl2 = readline.createInterface({ input: fs.createReadStream(filePath) })
// const lineByline = (() => {
//     let times = 0 // 利用闭包保存一个计数器
//     return (line) => {
//         times++
//         console.log("times = ", times)
//         if (times === 1) {
//             school.name = line
//             cb()
//         }
//         if (times === 2) {
//             school.age = line
//             cb()
//         }
//     }
// })()
// rl2.on('line', (line) => {
//     lineByline(line)
// })
// 不会立即关闭触发的事件 line，也就是会继续触发
// rl1.close()