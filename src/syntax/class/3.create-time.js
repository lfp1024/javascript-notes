class Animal {
    // 构造函数
    constructor() {
        this.name = this.getName()
    }
    // 相等于原型上的方法
    getName() {
        console.log("dog")
        return "dog"
    }
}
// js引擎执行代码 到这里的时候
// 是不是 
//   1. 已经在堆中开辟了一块空间，存储构造函数中的 代码字符串 'this.name = this.getName()'
//   2. 原型中的方法（getName），按之前上课的理解，也已经创建了函数，并将函数堆地址，赋值给原型对象中的 getName 变量

// 执行new操作的时候，this.getName 通过原型链找到原型中的变量 getName，然后执行 getName方法？
const dog = new Animal() //=> 'dog'

/* 
new
1. 创建一个空对象并修改其原型链
2. 将构造函数中的`this`指向新创建的空对象`{}` 
3. 将构造函数作为普通函数执行
4. 处理返回值
*/