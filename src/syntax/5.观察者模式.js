/* 
观察者模式（observer）
内部也是基于发布订阅模式
分为两部分 观察者 被观察者 但是两者之间有依赖关系：
1. 被观察者要收集所有的观察者（订阅）
2. 被观察者的状态发生变化时，主动通知观察者（发布）
3. 观察者收到状态变化通知后，执行一些操作（回调）
和发布订阅的区别
1. 发布和订阅都是由被观察者完成，不关心状态变化（事件发生）后观察者执行哪些操作
2. 观察者依赖被观察某个【具体的属性】，属性一变，被观察者会主动通知观察者。而发布订阅需要手动通知
3. 相当于在发布订阅模式上扩展了一层（观察者）

应用场景
1. vue中状态变化更新视图
*/

// ES5 写法
// function Subject(name) {
//     this.name = name
//     this.state = 'initial'
//     this.observerArr = [] // 收集所有的观察者
// }
// Subject.prototype.attach = function (...observers) {
//     this.observerArr = this.observerArr.concat(observers)
// }
// Subject.prototype.setState = function (state) {
//     this.state = state
//     // 通知观察者
//     this.observerArr.forEach(o => o.update(this))
// }

// ES6 写法更具有封装性
class Subject { // 被观察者

    constructor(name) {
        // 这里面都是每个实例单独一份
        this.name = name
        this.state = "initial"
        this.observerArr = [] // 收集所有的观察者
    }

    // 类中的方法都相等于原型上的方法，所有实例共享，因此操作应基于this
    // 提供收集观察者的方法（订阅）
    attach(...observers) {
        this.observerArr = this.observerArr.concat(observers)
        console.log(this.observerArr)
    }
    // 提供更新状态的方法（发布）
    setState(state) {
        this.state = state
        // 通知观察者
        this.observerArr.forEach(o => o.update(this))
    }

}

class Observer { // 观察者

    constructor(name) {
        this.name = name
    }

    update(subject) {
        // do something ...
        console.log(`当前'${this.name}'被通知了，${subject.name}状态更新为'${subject.state}'`)
    }
}

const subject = new Subject('宝宝')
const observer1 = new Observer('爸爸')
const observer2 = new Observer('妈妈')


subject.attach(observer1, observer2)
subject.setState("饿了")