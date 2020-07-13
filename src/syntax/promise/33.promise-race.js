// const Promise = require("./2.my-promise")

//================不传参数或参数不可迭代================
// let p = Promise.race() 
// let p = Promise.race(null) 
// let p = Promise.race(123) 
// setTimeout(() => {
// 	console.log("p = ", p)
// }, 0);

// 报错：UnhandledPromiseRejectionWarning: TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))

// p =  Promise {
//     <rejected> TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
//     ...
// }

//================可迭代对象成员为空(空串、空数组)===============
// let p = Promise.race([])
// let p = Promise.race('')
// setTimeout(() => {
//     console.log("p = ", p) // p =  Promise { <pending> }
// }, 0);


// Promise.race([
//     new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 1000) }),
//     // 注意这里的 undefined 是数组的一个元素，Promise.resolve(undefined)。提前一轮循环返回
//     undefined,
//     new Promise((resolve, reject) => { setTimeout(() => { reject(100) }, 100) })
// ]).then((data) => {
//     console.log('success1 ', data); // success1  undefined
// }, (err) => {
//     console.log('err1 ', err);
// });

// Promise.race([
//     new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 1000) }),
//     new Promise((resolve, reject) => { setTimeout(() => { resolve(200) }, 200) }),
//     new Promise((resolve, reject) => { setTimeout(() => { reject(100) }, 100) })
// ]).then((data) => {
//     console.log('success2 ', data);
// }, (err) => {
//     console.log('err2 ', err); // err2  100
// });