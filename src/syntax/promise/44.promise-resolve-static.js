//================测试 不传参数或null=================
// const Promise = require('./2.my-promise')
// let p = Promise.resolve() //  p =  Promise { undefined }

// let p = Promise.resolve(null) // p =  Promise { null }
// let p = Promise.resolve(123) // p =  Promise { 123 }

// setTimeout(() => {
//     console.log("p = ", p)
// }, 0);

//===================测试 Promise.resovle(promise) 原样返回=================
// const Promise = require('./2.my-promise')
// let p1 = Promise.resolve("ok")
// let p2 = Promise.resolve(p1)
// console.log("p1 === p2 ", p1 === p2) // p1 === p2  true

//=================测试 thenable 对象执行顺序 及微任务==================================
// const Promise = require('./2.my-promise')

// let p = Promise.resolve(20);
// p.then((data) => {
//     console.log(data);
// });
// setTimeout(() => {
//     console.log("settimeout")
// }, 0);

// let p2 = Promise.resolve({
//     // thenable.then 是异步执行的(微任务)
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
// settimeout

//=================测试 thenable 抛出异常==================================
/* 
// const Promise = require('./2.my-promise')
let obj = {
    then: function (resolve, reject) {

        // throw Error("mmm")
        resolve(30); // p =  Promise { 30 }
        // 后面的异常会被捕获但是不会改变外面promise的状态（因为已经被修改了）
        throw Error("mmm")

        // reject("error") // p =  Promise { <rejected> 'error' }
    }
}

let p = Promise.resolve(obj)
setTimeout(() => {
    console.log("p = ", p)
}, 0);
*/
//================================Promise.resolve()========================

/* 
let Promise = require('./2.my-promise')

var p1 = new Promise(function (resolve, reject) {
    resolve(Promise.resolve('resolve'));
});

var p2 = new Promise(function (resolve, reject) {
    // 将resolve实参Promise的状态变为自己的状态，将实参Promise的值变为自己的值
    resolve(Promise.reject('reject'));
});

var p3 = new Promise(function (resolve, reject) {
    reject(Promise.resolve('resolve'));
});

p1.then(
    function fulfilled(value) {
        console.log('p1 fulfilled: ' + value);
    },
    function rejected(err) {
        console.log('p1 rejected: ' + err);
    }
);

p2.then(
    function fulfilled(value) {
        console.log('p2 fulfilled: ' + value);
    },
    function rejected(err) {
        console.log('p2 rejected: ' + err);
    }
);

p3.then(
    function fulfilled(value) {
        console.log('p3 fulfilled: ' + value);
    },
    function rejected(err) {
        console.log('p3 rejected: ' + err);
    }
);

// p3 rejected: [object Promise]
// p1 fulfilled: resolve
// p2 rejected: reject 
*/