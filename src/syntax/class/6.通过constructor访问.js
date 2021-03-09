'use strict';

class CalledByConstructor {

    get sequelize() {
        console.log('1111111', this.constructor); // 此时 this指实例，实例中访问 constructor 会找到 CalledByConstructor 类
        console.log('2222222', this.constructor.sequelize); // ，而 CalledByConstructor 类添加了 sequelize 属性
        return this.constructor.sequelize; // 实例只能通过 constructor 属性访问类的静态属性

        // console.log('3333333', super.eat()); // 实例关系，并不是继承关系，没有super
        // return super.sequelize; // super 指向 CalledByConstructor 的原型对象，而原型对象上没有 sequelize 属性
    }

    constructor() {
        console.log('new instance');
    }

    eat() {
        console.log('eat something');
    }

    getSequelize() {
        return this.sequelize; // sequelize 是静态属性，不能在普通成员方法中访问
    }

    static init(sequelize) {
        // this 数据类型是 function，表示这个类定义(代码)
        // console.log('this 1= ', typeof this, this, Function.prototype.toString.call(this));
        this.sequelize = sequelize
        // console.log('this 2= ', typeof this, this, Function.prototype.toString.call(this));
    }

    static test() {
        console.log('0 ', this); // [class CalledByConstructor] { sequelize: 'Sushant' } 具有一个静态属性的类
        console.log('1 ', this.sequelize); // sequelize 是静态属性，可以通过静态方法访问
        console.log('2 ', this.constructor.name, this.constructor.length); // 类定义中访问constructor会找到 Function 类
        console.log('3 ', this.constructor.sequelize); // ，而 Function 类中并没有 sequelize 属性
    }
}

module.exports = CalledByConstructor;

CalledByConstructor.init('Sushant'); // 添加静态属性 sequelize
CalledByConstructor.test(); // 静态方法中访问静态属性 sequelize
const c = new CalledByConstructor(); // 实例化
console.log(c.sequelize); // 实例访问静态属性
console.log(c.getSequelize()); // 实例普通方法中访问静态属性