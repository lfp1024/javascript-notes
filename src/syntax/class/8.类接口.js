'use strict';

class Person {
    eat() {
        throw Error('未实现eat方法');
    }
}

class Man extends Person {
    jump() {
        console.log(this.constructor.name + ' jump');
    }
    // 子类为覆盖父类的同名方法会报错，强制子类实现
    eat() {
        console.log(this.constructor.name + ' eat');
    }
}

const xm = new Man();

console.log(xm.jump());
console.log(xm.eat());