'use strict';
const errCode = 200
class Test {

    get errCode() {
        console.log('getter')
        if (!this[errCode]) {
            this[errCode] = 404
        }
        return this[errCode]; // 方括号访问，必须提前定义 ReferenceError: errCode is not defined
    }

    set errCode(value) {
        console.log('setter')
        this[errCode] = value;
    }

    get age() { // 通过一个内部变量中转，外部访问 age，实际内部按 _age 处理里的
        console.log('age getter')
        if (!this._age) {
            this._age = 12;
        }
        return this._age
    }

    set age(val) {
        console.log('age setter');
        this._age = val;
    }

    get() { // 不具名的 set get 不是访问器属性，不会自动调用
        console.log('getter2')
        const name = this.name;
        if (!name) {
            this.name = '123';
        }
        return this.name;
    }

    set(value) {
        console.log('setter2')
        this.name = value;
    }
}

const t = new Test();
console.log('t1 = ', t.name)
t.name = 'sb'
console.log('t2 = ', t.get())

console.log('t3 = ', t.errCode)
t.errCode = 500
console.log('t4 = ', t.errCode)

console.log('t5 = ', t.age)
t.age = 18;
console.log('t6 = ', t.age)

console.log('t keys = ',Object.keys(t)) // [ '200', 'name', '_age' ]