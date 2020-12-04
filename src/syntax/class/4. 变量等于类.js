class Test {
    eat() {
        console.log('eat');
    }
}

function test() {
    const T = class extends Test { } // 创建一个类 T，继承 Test
    console.log('T = ', typeof T); // function
    const t = new T();
    console.log('t.eat = ', t.eat()); // 继承父类的方法
    console.log('t.name = ', T.name); // 类名
}

test();