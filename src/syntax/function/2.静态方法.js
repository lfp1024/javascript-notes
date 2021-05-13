'use strict';

function Test() {

    this.walk = () => { // 原型上的方法，实例可以继承
        console.log('test walk');
    }

    function eat() { // 哪里都不是，就是一段代码，执行完就没了
        console.log('test eat');
    }
}

Test.run = () => { // Test 自身的属性，自身的静态方法。跟 prototype 属性一样，属于 Test 自己
    console.log('test run');
}

const t = new Test();

console.log(t.walk());
console.log(Test.run());
