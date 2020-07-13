// const Promise = require("./2.my-promise")

//====================不传参数或参数不可迭代=================
// let p = Promise.all() 
// let p = Promise.all(123) 
// let p = Promise.all(null) 
// setTimeout(() => {
// 	console.log("p = ", p)
// }, 0);

// 报错：UnhandledPromiseRejectionWarning: TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
// p =  Promise {
// 	<rejected> TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
//	...
// }

//================可迭代对象成员为空(空串、空数组)===============
let p = Promise.all("") .catch
setTimeout(() => {
	console.log("p = ", p)
}, 0);

// p =  Promise { [] }