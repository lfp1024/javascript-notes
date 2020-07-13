//================测试 不传参数或null=================
// const Promise = require('./2.my-promise')
// let p = Promise.resolve() //  p =  Promise { undefined }

// let p = Promise.resolve(null) // p =  Promise { null }
// let p = Promise.resolve(123) // p =  Promise { 123 }

// setTimeout(() => {
//     console.log("p = ", p)
// }, 0);

//===============测试 thenable 对象======================
// const Promise = require('./2.my-promise')
// let obj = {
//     then: function (resolve, reject) {
//         // resolve(30); // p =  Promise { 30 }
//         // reject("error") // p =  Promise { <rejected> 'error' }
//     }
// }

// let p = Promise.resolve(obj)
// setTimeout(() => {
//     console.log("p = ", p)
// }, 0);

//===================测试 Promise.resovle(promise) 原样返回=================
// const Promise = require('./2.my-promise')
// let p1 = Promise.resolve("ok")
// let p2 = Promise.resolve(p1)
// console.log("p1 === p2 ", p1 === p2) // p1 === p2  true

//=================测试 thenable 对象==================================
// const Promise = require('./2.my-promise')

// let p = Promise.resolve(20);
// p.then((data) => {
//     console.log(data);
// });


// let p2 = Promise.resolve({
//     // thenable.then 是异步执行的
//     then: function (resolve, reject) {
//         resolve(30);
//     }
// });

// p2.then((data) => {
//     console.log(data)
// });

// let p3 = Promise.resolve(new Promise((resolve, reject) => {
//     resolve(400)
// }));
// p3.then((data) => {
//     console.log(data)
// });

// 20
// 400
// 30