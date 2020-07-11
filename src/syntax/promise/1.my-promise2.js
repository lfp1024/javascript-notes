/*
 * Promise是ES6中新增的一个内置类：它是一种"承诺"设计模式，主要是有效规划异步编程的代码，尤其是再处理AJAX异步请求的“回调地狱”上有很大的帮助
 */

// 真实项目中的AJAX请求一定都是异步请求的（发送AJAX相当于发送一个HTTP请求任务）
// AJAX的串行：下一个请求依赖上一个请求的信息，或者上一个请求成功，下一个请求才能发送
// AJAX的并行：利用HTTP的并发性，同时发送多个异步请求，当所有请求都成功后，去做什么事情

/* $.ajax({
	url: '/api/1',
	// 请求成功会触发success回调函数执行
	// result从服务器获取的结果
	success: function (result) {

		// 发送下一个请求
		$.ajax({
			url: '/api/2',
			success: result => {

				// 发送下一个请求
				$.ajax({
					url: '/api/3',
					success: result => {

						// 发送下一个请求
						$.ajax({
							url: '/api/4',
							success: result => {

							}
						});
					}
				});
			}
		});
	}
}); */

/* function fn1() {
	return new Promise(resolve => {
		$.ajax({
			url: '/api/1',
			success: result => {
				resolve(result);
			}
		});
	});
}

function fn2() {
	return new Promise(resolve => {
		$.ajax({
			url: '/api/2',
			success: result => {
				resolve(result);
			}
		});
	});
}

function fn3() {
	return new Promise(resolve => {
		$.ajax({
			url: '/api/3',
			success: result => {
				resolve(result);
			}
		});
	});
} */

/* fn1().then(result => {
	// 第一个请求成功
	return fn2();
}).then(result => {
	// 第二个请求成功
	return fn3();
}).then(result => {
	// 第四个请求成功
}); */

/* (async function () {
	let result1 = await fn1();
	let result2 = await fn2();
	let result3 = await fn3();
})(); */

// AJAX并行
/* let n = 0,
	results = [];

function func(results) {
	console.log('OK');
}

function fire(result, index) {
	results[index] = result;
	if (n >= 3) {
		func(results);
	}
}

$.ajax({
	url: '/api/1',
	success: result => {
		n++;
		fire(result, 0);
	}
});

$.ajax({
	url: '/api/2',
	success: result => {
		n++;
		fire(result, 1);
	}
});

$.ajax({
	url: '/api/3',
	success: result => {
		n++;
		fire(result, 2);
	}
}); */

/* Promise.all([fn1(), fn2(), fn3()]).then(results => {
	// 三个请求都成功才会执行
	// results:按照顺序存储的每一项的返回结果
}); */

//==========================================

// let p1 = new Promise();
// Uncaught TypeError: Promise resolver undefined is not a function

// 在NEW PROMISE的同时就把executor函数执行了
// =>executor函数中有两个默认的形参：resolve/reject 函数
// =>executor函数中一般用来管理一个异步编程（当然只写同步的也可以）

// 每一个PROMISE的实例都有两个重要的信息
// =>[[PromiseStatus]]：PROMISE状态（pending准备状态/resolved(fulfilled)成功状态/rejected失败状态）
// =>[[PromiseValue]]：PROMISE值（一般存放异步编程的处理结果）

// resolve/reject这个两个函数的执行，目的就是改变[[PromiseStatus]]/[[PromiseValue]]
// =>一但状态设置为成功或者失败，则不能在改变为其它的
// =>resolve执行是成功   reject执行是失败
// =>执行函数传递的结果就是[[PromiseValue]]

//=>>> Promise.resolve(100) 创建一个状态为成功值为100的PROMISE实例
//=>>> Promise.reject(200) ...
//=>>> Promise.all([promise1,promise2,...]) 所有实例都成功，整体返回的PROMISE实例才是成功，只要有一个失败，整体实例就是失败的
//=>>> Promise.race([promise1,promise2,...]) 多个PROMISE实例同时进行，谁先处理完，以谁的状态作为最后的整体状态（不论是成功还是失败）

/* let p1 = new Promise((resolve, reject) => {
	/!* setTimeout(_ => {
		// resolve(100);
		// reject(200);
	}, 1000); *!/
	reject(100); //=>resolve/reject的执行是异步编程，需要等到THEN把方法存放好后，在根据状态通知THRN存放的某个方法执行
});
// P1成功还是失败直接看EXECUTOR函数中执行的是哪个方法
// 每一次执行THEN会返回一个新的POMISE实例  P2
// =>不管P1.THEN中哪个方法执行，只要执行不报错，则P2的状态就是成功，相反只要报错，P2就是失败，并且方法返回的结果就是P2的VALUE值
// =>如果P1.THEN中某个方法的执行，返回的是一个新的PROMISE实例，则新实例的最后结果直接影响了P2的结果
let p2 = p1.then(result => {
	// 当PROMISE实例状态为成功，执行THEN存放的第一个函数；RESULT是[[PromiseValue]]
	return 10;
}, reason => {
	// 当PROMISE实例状态为失败，执行THEN存放的第二个函数；
	return Promise.resolve('OK');
});

let p3 = p2.then(result => {}, reason => {}); */

//=>>> p3.then(null,reason => {})
// p3.catch(reason => {});

// 如果THEN中的某个方法没有写，则顺延至下一个TEHN的指定方法中
// Promise.reject('NO').then(result => {
// 	console.log('成功:' + result);
// 	return 1;
// }, /* reason => {
// 	return Promise.reject(reason);
// } */).then(/* result => {
// 	return Promise.resolve(result);
// },  */reason => {
// 	console.log('失败:' + reason);
// });

// Promise.reject('NO').then(result => {
// 	
// }).catch(reason => {

// }).then(result=>{

//});


let MyPromise = (function () {
    // CONSTRUCTOR
    function MyPromise(executor) {
        if (typeof executor !== "function") {
            throw new TypeError('Promise resolver undefined is not a function');
        }

        var _this = this;
        this.status = "pending";
        this.value = undefined;
        this.resolveArr = null;
        this.rejectArr = null;

        function change(value, status) {
            if (_this.status !== "pending") return;
            _this.value = value;
            _this.status = status;

            if (!_this.resolveArr) {
                // 改变状态的时候，还没有执行THEN呢，需要先等待THEN的执行（此时我们把通知方法执行的操作改为异步）
                var timer = setTimeout(function () {
                    clearTimeout(timer);
                    if (!_this.resolveArr) return;
                    status === "resolved" ?
                        _this.resolveArr(_this.value) :
                        _this.rejectArr(_this.value);
                }, 0);
                return;
            }
            status === "resolved" ?
                _this.resolveArr(_this.value) :
                _this.rejectArr(_this.value);
        }

        try {
            executor(
                function resolve(result) {
                    change(result, 'resolved');
                },
                function reject(reason) {
                    change(reason, 'rejected');
                }
            );
        } catch (e) {
            change(e.message, 'rejected');
        }
    }

    // PROTOTYPE
    MyPromise.prototype = {
        constructor: MyPromise,
        then: function (resolveFunc, rejectFunc) {
            // init params
            if (typeof resolveFunc !== "function") {
                resolveFunc = function resolveFunc(result) {
                    return MyPromise.resolve(result);
                };
            }
            if (typeof rejectFunc !== "function") {
                rejectFunc = function rejectFunc(reason) {
                    return MyPromise.reject(reason);
                };
            }

            var _this = this;
            return new MyPromise(function (resolve, reject) {
                // 赋值匿名函数，CHANGE的时候先执行匿名函数，在匿名函数中监听A/B函数执行的返回值和是否报错，由此决定新的实例是成功还是失败
                _this.resolveArr = function (result) {
                    try {
                        var x = resolveFunc(result);
                        x instanceof MyPromise ?
                            x.then(resolve, reject) :
                            resolve(x);
                    } catch (e) {
                        reject(e.message);
                    }
                };
                _this.rejectArr = function (reason) {
                    try {
                        var x = rejectFunc(reason);
                        x instanceof MyPromise ?
                            x.then(resolve, reject) :
                            resolve(x);
                    } catch (e) {
                        reject(e.message);
                    }
                };
            });
        },
        catch: function (rejectFunc) {
            return this.then(null, rejectFunc);
        }
    };

    // STATIC
    MyPromise.all = function all(promiseArr) {
        promiseArr = promiseArr || [];
        return new MyPromise(function (resolve, reject) {
            var n = 0,
                results = [];
            for (var i = 0; i < promiseArr.length; i++) {
                // 同步循环中嵌套异步操作，异步操作中需要用到索引，闭包解决
                (function (i) {
                    var item = promiseArr[i];
                    if (!(item instanceof MyPromise)) {
                        results[i] = item;
                        n++;
                        return;
                    }
                    item.then(function (result) {
                        results[i] = result;
                        n++;
                        // 都处理完
                        if (n === promiseArr.length) {
                            resolve(results);
                        }
                    }).catch(function (reason) {
                        reject(reason);
                    });
                })(i);
            }
        });
    };
    MyPromise.resolve = function resolve(result) {
        return new MyPromise(function (resolve) {
            resolve(result);
        });
    };
    MyPromise.reject = function reject(reason) {
        return new MyPromise(function (_, reject) {
            reject(reason);
        });
    };

    // global.MyPromise = MyPromise;
    // window.MyPromise = MyPromise
    return MyPromise

})();



MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {}
    dfd.promise = new MyPromise((resolve, reject) => {
        // 把成功和失败的回调都挂在dfd对象上
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}


/* new MyPromise((resolve, reject) => {
	setTimeout(_ => {
		reject(100);
	}, 1000);
}).then(result => {
	console.log('成功:' + result);
}).catch(reason => {
	console.log('失败:' + reason);
	return 'AAA';
}).then(result => {
	console.log('成功:' + result);
}); */

// MyPromise.all([
// 	new MyPromise(resolve => {
// 		setTimeout(_ => {
// 			resolve(100);
// 		}, 1000);
// 	}),
// 	200,
// 	MyPromise.reject(300)
// ]).then(results => {
// 	console.log('成功:' + results);
// }).catch(reason => {
// 	console.log('失败:' + reason);
// })

