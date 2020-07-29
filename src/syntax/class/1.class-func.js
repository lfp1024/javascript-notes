const run = Symbol('run')
class A {

    constructor(name) {
        this.name = name
        // 非静态方法，非实例方法，非类的私有方法
        // 只能在构造函数中访问
        const eat = () => {
            console.log(`${this.name} eat apple`)
        }
    }

    // 原型上，公共方法，实例方法
    say() {
        console.log('say hi')

        // 内部访问
        this[run]()
    }

    // 私有方法，只能在类内部访问
    [run](){
        console.log('run')
    }
}

const a = new A('lfp')