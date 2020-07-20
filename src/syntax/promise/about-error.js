setTimeout(() => {
    console.log('async func')
}, 0); 
function f(){
    throw Error('func error')
}
console.log("script start")
let p = f()
console.log(p)
console.log("script end")

// 抛到全局的异常，不仅会影响后面同步代码的执行
// 也会影响异步代码的执行（定时器中的回调不会执行）

//输出：
// script start
// /home/lfp/dev/javascript-notes/src/syntax/promise/about-error.js:5
//     throw Error('func error')
//     ^

// Error: func error