/**
 * 典型的面向对象语言： TS：https://www.tslang.cn/docs/handbook/classes.html
 *  private 私有类成员, 只能在类内部访问, 不能被继承, 不能被子类/实例访问
 *          可以在类的内部定义一个 公开的 (public) 方法访问私有类成员，让私有类成员能够在外部获取到
 *  protected 受保护的类成员, 可以在自身及其子类内部访问, 可以被子类继承, 不能被实例访问
 *            可以在类的内部定义一个 公开的 (public) 方法访问受保护的类成员
 * JS:
 *  javascript 中的私有属性实质是指某个 作用域 中无法被外部访问的属性
 * 
 * ES6 私有属性，需要在语法层面区分私有属性和公共属性，即在定义方式和引用方式上区分。
 *  定义方式：
 *      通过 #attributeName 定义，可不用赋值。在定义方式上区别于实例属性
 *  引用方式：
 *      通过 this.#attributeName 形式访问，不能通过 this[field] 形式访问。在引用方式上区别于实例属性
 *  私有属性可以与实例属性同名（实际上私有属性和前面的#是一体的），达到隐藏私有属性的目的，否则我们可以通过给同名公共属性赋值并访问的方式监测私有属性的存在性
 *  因为私有和公共属性可以同名，如果引用方式一样的话，每次引用就需要检查该属性是私有还是公共，造成性能开销
 *  私有属性不能通过实例访问，但是在类定义中（类内部）可以通过静态方法传入实例来访问
 */

class Foo {
    privateAttr = 'fake';
    #privateAttr = 42; // 可以同名
    #bar = 1;

    static getPrivateAttr(foo) {
        return foo.#privateAttr; // 静态方法中通过实例访问私有属性
    }

    getPrivateAttr() { // 私有属性通过公共方法访问
        return this.#privateAttr;
    }

    getAttr(attr) {
        return this[attr]; // 不能访问私有属性
    }
}

const foo = new Foo();

// 如果私有属性和公共属性不能同名，可以通过给同名公共属性赋值并访问的方式监测私有属性的存在性。要么赋值报错，要么无法引用
// foo.#bar = 2; // 给私有属性赋值报错 `Private field '#bar' must be declared in an enclosing class`
// console.log('foo.#bar = ', foo.#bar); // 无法引用私有属性 `undefined`

console.log('Foo.getPrivateAttr(new Foo()) = ', Foo.getPrivateAttr(foo)); // >> 42
console.log('foo.privateAttr = ', foo.privateAttr);
console.log('foo.getPrivateAttr = ', foo.getPrivateAttr());
console.log('foo.getAttr privateAttr = ', foo.getAttr('privateAttr'));
console.log('foo.getAttr #privateAttr = ', foo.getAttr('#privateAttr'));