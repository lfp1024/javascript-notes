/*
promise 实现规范 promisea+ 规范 https://promisesaplus.com/
- es6 已经基于该规范实现并提供给我们使用，属于es6的一个内置类
- ie 不支持promise，去mdn 或 caniuse.com 去看兼容性
- 需要自己实现一个兼容版本的。polyfill 腻子（shim 垫片）（填平不支持的语法，也就是实现兼容），有个库 es6-promise 已经实现了兼容

优点：解决异步问题
1. 多个并发异步请求，同时获取结果 -> promise.all
2. 链式异步请求（恶魔金字塔、回调地狱）-> promise.then 链式调用

缺点：
1. 本身还是基于回调函数的形式
2. 无法中断异步处理结果

基本概念
内置类：new Promise(exector)
状态：
1. promise有三个状态，resolved rejected pending(默认初始状态)
2. 失败之后需要捕获（then的第二个参数 或 catch方法），否则程序报错
3. 一旦改变无法修改，只有pending状态下才可以修改
值：
1. 保存成功的结果或失败的原因
方法：
1. executor 中默认提供 resolve reject 方法（是Promise类私有的方法，不是原型上的），调用 resolve 将状态变为 resolved，调用 reject 将状态变为 rejected。
2. executor 中的异步代码执行过程中发生异常，则调用 reject，失败原因是异常原因
3. promise实例都拥有 then 方法，需要用户传入两个回调函数，第一个是状态变为成功时触发执行(传入成功的结果)，第二个是状态变为失败时触发执行（传入失败的原因）
   3.1 then 返回一个【新】的promise
   3.2 then 链式调用，返回值传递原则（无论是执行 onResolved 还是 onRejected 返回的值【只会执行一个】）
        1. 需要用return明确指定返回值，否则默认返回的值是 undefined，传入下一个then的成功回调中
        2. 如果返回的是普通值（非promise、thenable对象、异常的值：普通对象、数字、字符串、undefined（默认）），则then 返回一个立即 resolved 的promise，值传递到下一个then的成功回调函数中
        3. 如果抛出异常，则then 返回一个立即 rejected 的promise，原因传递到下一个then的失败回调函数中
        4. 如果是一个新promise实例，则这个新promise的状态会决定当前then返回的promise的状态，从而决定下一个then的执行情况
           如果新promise返回成功，则当前then返回成功，值传递到下一个then的成功回调中
           如果新promise返回失败，则当前then返回失败，原因传递到下一个then的失败回调中

   3.3 then 错误处理
        如果距离自己最近的then没有第二个参数（错误处理函数），则找下一个then或catch

4. catch 不属于规范中的

自定义：
1. 成功还是失败（什么情况下调用 resolve\reject）由用户决定
2. 成功的结果和失败的原因，由用户决定
执行顺序：
1. executor 立即执行
*/

const u = require("./utils")

const log = u.debugGenerator(__filename)

// 三个状态（用常量表示）
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'

// 非原型上的方法，写到外面
// 这个方法要兼容 所有 其他版本的promise实现，例如 bluebird q es6-promise。这些库可以相互调用主要靠 resolvePromise 方法兼容
// 严格根据规范判断，确保可以兼容其他库的promise
const resolvePromise = (promise2, x, resolve, reject) => {
    // 循环引用-自己等待自己（promise2 和 x 引用同一个对象，返回一个类型错误）
    if (promise2 === x) {
        // 返回一个失败的promise
        return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
    }

    let called // 标记，防止走成功后又走失败

    // if (x instanceof Promise) { } // 不能用这种方式判断x是不是Promise，因为x可能是别的库实现的Promise的实例
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        // 如果x是对象或函数
        try {
            // promise都有一个then方法，取x的then属性，看是不是函数来判断x是不是promise
            // 没有then 属性,则值为undefined
            let then = x.then
            if (typeof then === 'function') {
                // 至此，认为x是promise
                // 根据内层promise(x)的状态和值 决定外层promise(then方法返回的)的状态和值
                // 用 call 方法，保证then方法中的THIS是需要获取结果的promise实例。如果不call则是window或global
                // 调用then方法，就会执行then的逻辑，then会监听回调的返回值，以此决定自己返回promise的状态（在日志中会发现then的日志）
                then.call(x, y => { // 不能写成 x.then，因此这样会再次取值，有可能报错  
                    //【只有这里进入了别人的promise中的then方法，执行自己传入的回调】，无法控制别人的代码，只能控制自己的promise的状态（即控制传入的回调的执行）
                    // 防止走成功后又走失败（自己代码中在定义resolve和reject的时候有判断是否为 PENDING 状态）
                    if (called) return
                    called = true

                    // 等 x(promise) 返回成功（值为y）。则执行x的then方法的第一个参数（这里传入的回调）
                    // 即执行当前then方法返回promise的resolve方法，让当前then返回一个成功的promise，值为x(promise)的成功结果
                    // resolve(y)

                    // 为了解决返回promise成功又返回promise的现象，这里需要递归解析
                    // 第一个参数仍然是最外层then返回的promise，是为了保证不发生循环引用。等y(promise)返回后，调用promise2的resolve或reject
                    log.debug("before resolvePromise recursion, y =", y)
                    // 当最终y不是promise,在【终结者1/2】结束后，回到这里，嵌套的resolvePromise依次结束
                    resolvePromise(promise2, y, resolve, reject)
                    log.debug("end resolvePromise recursion, y =", y)
                }, e => {
                    // 防止走成功后又走失败
                    if (called) return
                    called = true

                    // 同理，如果 x(promise) 返回失败，则当前then返回的promise返回失败，值为x(promise)的失败原因
                    // promise失败又返回promise，不再递归解析，直接将最后的promise作为失败原因返回
                    reject(e)
                })

            } else {
                // x 不是 promise（是个普通对象或普通函数）
                // then 返回 promise 最终结束的地方1【终结者1】
                log.debug("the property 'then' of 'x' is not a function, x =", x)
                resolve(x)  // {then:123}
            }

        } catch (error) {

            // 这里是否需要加？如果取值失败，直接调用 promise2 的 reject 就结束了呀，里面promise成功还是失败并不能决定外层promise的状态
            // 这里并没有将自己的resolve reject 传入别人的promise.then 中

            // 防止走成功后又走失败 【测试结果表明需要加！！！】
            if (called) return
            called = true
            reject(error) // 取值出错
        }
    } else {
        // 如果x不是对象或函数，直接返回成功状态的promise
        // then 返回 promise 最终结束的地方2【终结者2】
        log.debug("x is not a promise, x =", x)
        resolve(x)
    }
}

log.debug('====== my promise ======')
class Promise {

    constructor(executor) {
        // 这种写法相当于类中具有属性 state。这里给每个实例赋值
        // Promise 实例公有属性
        this.status = PENDING
        this.value = undefined

        this.onResolvedCallbacks = [] // 存放状态变为成功时的回调
        this.onRejectedCallbacks = [] // 存放状态变为失败时的回调

        // Promise类私有方法 ？？？
        // 【不是静态方法也不是实例方法】，就是一个在构造函数中自定义的方法
        // 是一个闭包函数，在里面定义，在外面执行 
        const resolve = (value) => {

            log.debug("call resolve", this.status, value)

            // 这里不用兼容其他版本的promise，只是自己的功能（非规范中的）
            if (value instanceof Promise) {
                // 递归解析promise，直到value非promise
                // 是异步执行的（涉及到then）
                return value.then(resolve, reject)
            }

            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                this.onResolvedCallbacks.forEach(cb => cb())
            }


            // 兼容写法
            // 调用 resolve 方法的时候没有指明谁调用的，因此这里的THIS需要明确指向当前实例，使用箭头函数
            // this 指代当前实例(上级上下文中的THIS：构造函数中的THIS指代当前实例对象)
            // 只有 pending 状态可以修改状态和值
            // if (this.status === PENDING) {
            //     // 先校验值，如果不是promise才继续执行（改变状态和值）
            //     // 因为如果value是promise，则会决定当前promise的状态
            //     if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
            //         try {
            //             let then = value.then
            //             if (typeof then === 'function') {
            //                 log.debug('value is a promise')
            //                 // value 是一个promise
            //                 resolvePromise(this, value, resolve, reject) // 这里涉及到递归,要有一个出口(判断逻辑不好抽离函数本身)
            //                 // 如果 value 是异步的(这里判断就是异步的),resolvePromise是异步执行的.
            //                 log.debug("async resolve promise")
            //             } else {
            //                 log.debug("the property 'then' of 'value' is not a function, value =", value)
            //                 this.value = value
            //                 // 因为resolvePromise异步执行，所以对状态的改变只能放到出口
            //                 this.status = RESOLVED
            //                 this.onResolvedCallbacks.forEach(cb => cb())
            //             }
            //         } catch (error) {
            //             log.debug("call then", error)
            //             return reject(error)
            //         }
            //     } else {
            //         // 如果value不是promise
            //         log.debug('value is not a promise, value =', value)
            //         this.value = value
            //         // 因为resolvePromise异步执行，所以对状态的改变只能放到出口
            //         this.status = RESOLVED
            //         this.onResolvedCallbacks.forEach(cb => cb())
            //     }
            // }

            // 打印对应resolve所属的promise
            log.debug("----", this)
        }

        const reject = (reason) => {
            // reject 递归解析 reason，原样返回
            log.debug("call reject", this.status, reason)
            if (this.status === PENDING) {
                this.value = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(cb => cb())
            }
        }

        // 构造函数中传入的函数，立即执行
        // 1. 同步代码，可以捕获到异常
        // 2. 异步代码无法捕获（当异步任务执行的时候，捕获异常的函数已经出栈了）
        try {
            executor(resolve, reject)
        } catch (error) {
            // 捕获 executor函数中的同步代码报错
            log.debug("executor catched", error)
            reject(error)
        }
    }

    // Promise 实例具有的方法
    then(onResolved, onRejected) {
        // 这里的THIS是调用then的promise实例
        // 判断是否传递参数以及传递的是不是函数
        // onResolved = typeof onResolved === 'function' ? onResolved : value => { return value }
        onResolved = typeof onResolved === 'function' ? onResolved : v => v
        // onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }


        // 懒递归，每次调用就new一个新的promise
        const promise2 = new Promise((resolve, reject) => {
            // 箭头函数THIS继承上级上下文中的THIS

            // 如果executor 里面是同步代码，则直接执行 then 的回调函数
            // 判断是同步的，调用是异步的，所以 setTimeout 要写在判断体中
            if (this.status === RESOLVED) {
                // 用定时器模拟then中回调的异步执行（创建类的实例，需要等构造函数中的代码全部执行完毕，才能拿到值）
                // es6 规范中规定 then 是微任务，这里无法自己实现一个微任务，只能调用宿主环境提供的API
                // 如果是同步执行，执行到这里，创建匿名函数的时候，promiseForThen 还没有定义（赋值）
                setTimeout(() => {
                    try {
                        // 异步执行的话，外面的 executor 无法捕获到异常，因此这里需要在源头捕获
                        let x = onResolved(this.value)
                        // 解析函数的返回值，决定then返回的promise的状态
                        // promise2.resolve = resolve 规范中的写法
                        log.debug("RESOLVED:then return promise, x=", x)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.value)
                        log.debug("REJECTED:then return promise")
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            // 如果 executor 里面是异步代码，需要异步执行，用发布订阅模式解决 then 的异步执行
            // 需要用到发布订阅模式，如果当前状态是 pending，则将传入的回调函数保存起来，稍后手动调用 resolve 或 reject 改变状态的时候再执行
            // 同一个promise可以多次调用 then 方法，因此会有多个回调函数，需要用数组保存
            // 挂到【调用】then的promise中，
            if (this.status === PENDING) {
                // 这样放，逻辑就被写死了
                // this.onResolvedCallbacks.push(onResolved)
                // this.onRejectedCallbacks.push(onRejected)

                // 采用AOP编程，在执行回调的时候做一些其他操作
                this.onResolvedCallbacks.push(() => {
                    // 使用箭头函数保证执行的时候，THIS的传递（统一）
                    // 不是立即执行，当执行外面的匿名函数的时候，才会执行
                    // do other things...

                    // 这里本身虽然是异步的，但是不用定时器会报错：2.3.3: Otherwise...
                    // 根据上面对状态的判断，如果是 RESULVED 或 REJECTED，then的回调是异步执行的。这里虽然判断是 PENDING 放入了数组中
                    // 可是一旦promise状态改变，就会立即执行。不符合 promise状态改变then的回调是异步执行 的规范。【Promises/A+ 3.1】
                    // try {
                    //     let x = onResolved(this.value)
                    //     resolvePromise(promise2, x, resolve, reject)
                    // } catch (error) {
                    //     reject(error)
                    // }


                    setTimeout(() => {
                        try {
                            let x = onResolved(this.value)
                            log.debug("PENDING->RESOLVED:then return promise")
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);

                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.value)
                            log.debug("PENDING->REJECTED:then return promise")
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
            }

        })
        return promise2
    }

    //=============================================以下非Promise/A+ 规范===============================================
    // 返回一个新的promise，根据 onRejected 的返回结果决定返回promise的状态
    catch(onRejected) {
        // THIS指代调用catch的promise实例
        return this.then(null, onRejected)
    }

    // node>10 
    // 表示前面的promise无论成功还是失败都会执行finally方法（无论如何必须要处理一个逻辑的时候使用，如果返回成功promise不影响整个then链的结果）
    // 如果finally返回一个promise，会等待这个promise返回
    //  1. 如果是成功的promise，忽略自己的返回结果，将前面promise的返回值传递下去（前面如果是成功，后面用then获取值，前面如果是失败，后面用catch捕获）
    //  2. 如果是失败的promise，将自己的失败原因，取代前面promise的返回值传递下去（后面用catch捕获）
    // callback没有参数
    finally(callback) {
        return this.then(result => {
            // 这里用 Promise.resolve 包一层，确保返回一个promise
            // 将前面promise的返回值传递下去（遵循 then 的链式调用原理）
            return Promise.resolve(callback()).then(() => result)
        }, err => {
            // 如果前面的promise报错，则进入这里，将它的错误传递下去
            // 如果是自己（callback 执行）报错，不会进入then，直接传递下去（代替前面promise的错误）
            return Promise.resolve(callback()).then(() => { throw err })
        })
    }

    // 速创建一个成功的promise：Promise.resolve()
    // 参数:
    //  1. 是一个promise实例，则直接原样返回
    //  2. 是一个thenable对象，则异步调用其then方法,决定resolve返回promise的状态
    //  3. 不是thenabled对象或promise实现，则返回一个新的成功的promise，值为该参数
    //  4. 不传参数，返回一个新的成功的promise，值为undefined
    static resolve(result) {
        // 不处理兼容
        if (result instanceof Promise) {
            return result
        }
        return new Promise((resolve, reject) => {
            if (!(result == undefined) && typeof result.then === 'function') {
                // 我们实现的then的回调是异步的，而thenable对象中then的回调是同步的，因此这里需要加异步
                setTimeout(() => {
                    result.then(resolve, reject)
                }, 0);
            } else {
                return resolve(result)
            }
        })
    }

    // 快速创建一个失败的promise:Promise.reject()
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    // 参数：实现iterator接口的可迭代对象（数组、字符串）
    //  1. 如果参数不存在或者不可迭代，返回一个失败的promise，值为类型错误
    //  2. 如果可迭代对象成员为空，返回一个成功的promise，值为空数组
    //  3. 如果可迭代对象成员不是promise，则调用 Promise.resolve 将其变为一个promise
    // 返回promise的状态：由所有可迭代对象的成员（promise）的返回状态决定
    //  1. 所有成员promise都返回成功，则all返回一个成功的promise，值为所有成员promise返回结果组成的数组（按成员顺序排列）
    //  2. 只要一个成员promise返回失败，则all返回一个失败的promise，值为第一个失败的成员promise的失败原因
    //  3. 如果成员promise自身定义了catch方法，那么它被rejected时被自身定义的catch捕获，并返回一个新的promise（用这个新promise代替该成员promise）
    static all(promiseArr) {
        return new Promise((resolve, reject) => {
            if ((promiseArr == undefined) || !promiseArr[Symbol.iterator]) {
                return reject(new TypeError(`${promiseArr === undefined ? "" : typeof promiseArr} ${promiseArr} is not iterable (cannot read property Symbol(Symbol.iterator))`))
            }

            let index = 0
            let result = []
            if (promiseArr.length === 0) {
                return resolve(result)
            }
            function processValue(i, data) {
                result[i] = data;
                if (++index === promiseArr.length) {
                    resolve(result)
                }
            }
            for (let i = 0; i < promiseArr.length; i++) {
                //promiseArr[i] 可能是普通值，用 Promise.resolve 包一层，确保都是promise
                Promise.resolve(promiseArr[i]).then((data) => {
                    processValue(i, data)
                }, (err) => {
                    return reject(err)
                })
            }

        })
    }

    // 参数：实现iterator接口的可迭代对象（数组、字符串）
    //  1. 如果参数不存在或者不可迭代，返回一个失败的promise，值为类型错误
    //  2. 如果可迭代对象成员为空，【返回一个PENDING 状态的promise】
    //  3. 如果可迭代对象成员不是promise，则调用 Promise.resolve 将其变为一个promise
    // 返回promise的状态：
    //  1. 只要一个成员promise返回，则race返回相同状态的promise
    static race(promiseArr) {
        return new Promise((resolve, reject) => {

            if ((promiseArr == undefined) || !promiseArr[Symbol.iterator]) {
                return reject(new TypeError(`${promiseArr === undefined ? "" : typeof promiseArr} ${promiseArr} is not iterable (cannot read property Symbol(Symbol.iterator))`))
            }
            if (promiseArr.length === 0) {
                return
            }

            for (let i = 0; i < promiseArr.length; i++) {
                Promise.resolve(promiseArr[i]).then((result) => {
                    return resolve(result)
                }, (err) => {
                    return reject(err)
                });
            }

        });
    }

}

// 在类上扩展一个方法（非规范中的，es6的promise没有）
// 测试入口
// Promise的延迟对象，测试的时候会调用这个函数，用这个函数返回的结果（dfd对象）测试当前的Promise和resolve、reject是否符合规范
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    // 在dfd上挂载一个promise属性，值是一个PENDING状态的promise
    dfd.promise = new Promise((resolve, reject) => {
        // 把成功和失败的回调都挂在dfd对象上
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}


// node 的commenJS规范
module.exports = Promise


// let p = new Promise(res => {
//     setTimeout(() => {
//         throw new Error
//     }, 0);
// })
// p.then(null, e => console.log(e))

// 异步代码出错，如果不调用 res 或 rej 外面无法获知，更无法捕获，只能在异步代码里面捕获，然后调用 rej 将异常反馈到外面
// let pp = new Promise((res, rej) => {
//     setTimeout(() => {
//         try {
//             throw Error("hi error")

//         } catch (error) {
//             rej(error)
//         }
//     }, 0);
// }) // 如果不传参数 报错 TypeError: Promise resolver undefined is not a function
// pp.then(null, e => console.log("11111", e))

// function My(fn){
//     console.log("1")
//     fn()
//     console.log("2")
// }

// const m = new My(()=>{ // 如果不传fn，报错 TypeError: fn is not a function
//     console.log('m')
// })