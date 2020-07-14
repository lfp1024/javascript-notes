/* 
async await 是promise的语法糖，优化promise的then链写法，用同步的方式编写异步代码
async 返回一个promise

async 异步函数（包含函数声明、函数表达式、Lambda表达式[箭头函数]等使用形式）
1. 返回一个 Promise 对象
    1.1 如果在函数中 return 一个基本类型值（默认undefined），async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象
    1.2 如果await 后面的表达式返回的promise失败且未捕获异常，则async返回的promise失败，失败原因是表达式返回promise的失败原因
2. 在最外层不能用 await 获取其返回值的情况下，应该用原来的方式：then() 链来处理这个 Promise 对象

async 源码：
new Promise((resolve,reject)=>{
    try {
        // 执行函数体中的代码，默认返回undefined
        //  1. 如果函数体返回promise，则解析该promise，并用该promise的状态决定自己的状态
        //  2. 如果函数体返回非promise（默认返回undefined），则返回成功的promise，值为非promise值
        resolve('返回值')
    } catch (error) {
        //  3. 如果函数体报错，则返回失败的promise，值为失败原因
        reject(error)
    }
})

await 表达式
1. 【等待】表达式（promise对象，普通函数调用、基本值类型）的【返回值】
    1.1 如果表达式的值是promise对象，则等待promise返回（调用.then，异步获取），并将其返回结果作为await表达式的值
    1.2 如果表达式的值不是promise对象，则包装成一个立即resolve的promise,等待其返回（调用.then，异步获取），并将其返回结果作为await表达式的值

2. await相当于调用后面表达式返回promise的then方法，异步（等待）获取其返回值
    2.1 不管代码中是否用到await表达式返回值，await都会去获取（调用其then方法），在获取到之前，async会返回一个 PENDING 状态的promise。
    2.2 函数体中await表达式后面的代码相当于promise.then方法的第一个回调(onResolved),参数值是表达式返回promise的返回值（也是await表达式返回值）
        因此await会阻塞函数体中后面代码的执行（异步执行then的回调），但是表达式是同步执行的【因此await操作符只能出现在async异步函数中】
        如果await表达式后面没有代码，则相当于then的第一个回调不传，使用默认回调函数（v=>v）
    2.3 调用promise.then方法的第二个回调默认不传递(当表达式返回值是promise时也可以调用.catch传递)，使用默认回调函数（throw err）
        因此当表达式报错，await会将该异常抛出到函数体中，可以（需要）通过try-catch捕获异常
        如果调用了.catch，则不会抛出，因为catch也返回一个promise，相当于await调用catch返回promise的then。
 


*/
// async function f() {
//     try {
//         const data = await new Promise((res, rej) => {
//             setTimeout(() => {
//                 rej('err');
//             }, 1000);
//         });
//         console.log(data);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// function f() {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             rej('err')
//         }, 1000);
//     }).then(data => {
//         console.log(data)
//     }).catch(err => {
//         console.log(err)
//     })
// }


// async function f() {
//     console.log('111')
//     const res = await 222
//     console.log(res)
// }
// console.log("aaa")
// f()
// console.log("bbb")

// aaa
// 111
// bbb
// 222

//=============async 没有return返回值==============
// async function f(){
//     console.log("hi")
// }
// console.log("aaa")
// console.log(f()) // 同步执行,立即返回 Promise { undefined }
// console.log("bbb")

// aaa
// hi
// Promise { undefined }
// bbb

//===========async 返回基本类型值================
// async function f(){
//     console.log("hi")
//     return 123
// }
// console.log("aaa")
// console.log(f()) // 同步执行,立即返回 Promise { 123 }
// console.log("bbb")

// aaa
// hi
// Promise { 123 }
// bbb

//==============async promise失败原因==================
// async function f() {
//     console.log("1")
//     // await 异步获取返回值
//     await new Promise((res, rej) => {
//         console.log("2")
//         rej("1 error")
//         console.log("3")
//     })
//     console.log("4")
//     await new Promise((res, rej) => {
//         rej("2 error")
//     })

// }

// console.log("a")
// let p = f()
// console.log(p)
// console.log("b")
// setTimeout(() => {
//     console.log(p) // Promise { <rejected> '1 error' }
// }, 0);

// a
// 1
// 2
// 3
// Promise { <pending> }
// b
// Promise { <rejected> '1 error' }

//================async return promise==================

// let p1
// async function f() {
//     console.log("1")
//     // await 异步获取返回值
//     await new Promise((res, rej) => {
//         console.log("2")
//         res("1 success")
//         console.log("3")
//     })
//     console.log("4")
//     p1 = new Promise(res => { res(100) })
//     return p1
// }

// console.log("a")
// let p = f()
// console.log(p)
// console.log("b")
// setTimeout(() => {
//     console.log(p)
// }, 0);
// setTimeout(() => {
//     console.log("p === p1 ?", p === p1) // false 说明async内部不是用的 Promise.resolve 静态方法，而是new Promise
//     let p2 = Promise.resolve(p1)
//     console.log("p2 === p1 ?", p2 === p1)
// }, 0);

// a
// 1
// 2
// 3
// Promise { <pending> }
// b
// 4
// Promise { 100 }
// p === p1 ? false
// p2 === p1 ? true

//======================await 表达式.catch()====================


async function f() {
    console.log("1")
    // await 异步获取返回值
    const res = await new Promise((res, rej) => {
        console.log("2")
        rej("1 success")
        console.log("3")
    }).catch(err => {
        console.log('i catch you', err)
        return 123  // catch 捕获异常，await不抛出，await表达式的值由catch的返回值决定
    })
    console.log("res = ", res)
}

console.log("a")
let p = f()
console.log(p)
console.log("b")
setTimeout(() => {
    console.log(p)
}, 0);

// a
// 1
// 2
// 3
// Promise { <pending> }
// b
// i catch you 1 success
// res =  123
// Promise { undefined }