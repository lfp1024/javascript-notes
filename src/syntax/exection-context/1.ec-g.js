// debugger

function a() {
    // console.log("function a 中的THIS ", this) // 函数中的THIS是global对象  Object [global] {...}
    console.log(this === global) //=> true
    console.log("AAAA")
    return 123
}
// let b = '111111111111'
let obj = {
    a: function () {
        console.log("aaaa")
    },

    // 在全局上下文中执行，找全局上下文中的变量，而obj的属性a不属于全局变量

    // 箭头函数继承全局上下文中的THIS，而全局上下文中的THIS不是global而是外部的model，这里打印的值为 {}
    b1: () => {
        console.log(this)  //=>{}
        a()                //=> 'AAAA'
    },
    b2: function () {
        console.log(this) //=> obj
        a()               //=> 'AAAA'
    },
    b3: function () {
        console.log(this) //=> obj
        this.a()          //=> 'aaaa'
    },

    // 在全局上下文中执行，找全局上下文中的变量，而obj的属性a不属于全局变量
    // c: a(),       //=> 'AAAA'

    // 全局上下文中的THIS不是global而是外部的model，这里打印的值为 {}
    // d: this.a(),  //=> this.a is not a function

    // e: obj.a()    //=> Cannot access 'obj' before initialization
}
// 为什么找的是外面的变量 ？
console.log(obj.b1())
console.log('--------------------')
console.log(obj.b2())
console.log('--------------------')
console.log(obj.b3())
console.log('--------------------')
console.log(this)