const run = Symbol('run')
const pri = Symbol('pri');



class A {


    constructor() {
        this.name = 'lfp'
        this.height = this.eat()
        // 非静态方法，非实例方法，非类的私有方法
        // 只能在构造函数中访问
        const p = () => {
            console.log(`ppp`)
        }
        console.log(this.eat)
    }
    [pri] = 'haha'

    // 原型上，公共方法，实例方法
    say() {
        console.log('say hi')

        // 内部访问
        this[run]()
    };
     

    eat() {
        console.log(`${this.name} eat apple`)
    }

    // 类体中是不能自己调用的，跟Java不同
    // 此时找的是全局上下文中的变量eat，而全局中并没有定义 eat
    // weight = eat(); // ReferenceError: eat is not defined

    // 私有方法，只能在类内部访问，外面只是不能点出来，还是可以访问的
    [run]() {
        console.log('symbol run')
    }

    static walk() {
        console.log('static walk')
    }
    // 类体中是不能自己调用的，跟Java不同
    // weight = walk(); // ReferenceError: walk is not defined
}

// (()=>{
//     // 要放在方法中才能调用
//     // 在执行当前文件中的代码的时候，从上向下执行，到了这里，已经加载了 函数A
//     // 因此可以直接访问 A.walk，如果放到A上面，则报错 Cannot access 'A' before initialization
//     console.log("========= ",A.walk())
//     // 静态成员，在加载A的时候，已经创建堆空间，并将地址给了A。而其他成员还是字符串状态
//     console.log("11111111",A.eat)
// })();

// 创建构造函数的时候，代码以字符串存在堆空间中，并自动创建原型对象（创建原型对象上的方法，将方法堆地址保存到原型对象中）
// 构造函数执行的时候，依次执行那堆代码字符串
// const a = new A()
// a[run]()
// console.log(a[pri])

class B extends A {
    constructor() {
        // 在构造函数的第一行，调用 super，实例化父类（父类构造函数中的THIS，指代的是B                                                ）
        super()
        this.hobby = 'basketball'
        this.name = "sb"
    }

    jump() {
        console.log(`${this.name} jump ${this.height + 2}`)
    }

    runFast() {
        this[run]()
    }

    static walkSlowly() {
        this.walk()
    }

    callSuper() {
        console.log(super.name)
        console.log(super.weight)
    }
}

// const b = new B()
// console.log(Object.keys(b))
// console.log(Object.getOwnPropertyNames(b));
// console.log(Object.getOwnPropertySymbols(b));
// // 调用父类方法，访问的成员变量在子类中也有，则使用子类的，与Java中不同
// b.eat()
// // 实例具有父类和子类所有的实例属性和原型方法
// b.jump()
// // 继承私有方法
// b.runFast()
// b[run]()
// // 继承静态方法
// B.walkSlowly()
// // super 无法访问构造函数中的实例属性，只能访问原型上的方法（而原型上没有属性，如何添加？  ）
// // 都用THIS即可，不要用super                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
// b.callSuper()


