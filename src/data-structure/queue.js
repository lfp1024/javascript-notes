// ES5 方式，面向对象
function Queue() {
    // js中的容器：对象、数组
    this.container = []
}

// 把实例用的方法写在其原型上
// 批量添加方法，用逗号隔开
Queue.prototype = {
    // 防止丢失，保证原型链结构完整
    constructor: Queue,

    // 进入队尾
    enter: function enter(element) {
        this.container.push(element)
    },

    // 移除队头
    leave: function leave() {
        if (this.container.length === 0) return
        // 箭头函数有默认返回值！！！！！！！！！？？？？？？？？
        return this.container.shift();
    },

    // 查看队列长度
    size: function size() {
        return this.container.length
    },

    // 查看队列内容
    value: function value() {
        // 如果返回容器（对象）的地址，在外面可以直接修改原始数据
        // 这里需要深度克隆，下面这种方式对正则和symbol的处理也有点问题，最好使用lodash中的api
        // 最好的深度克隆需要用递归和深度优先的原则去完成
        return JSON.parse(JSON.stringify(this.container))
    }
};


let qe = new Queue()
qe.enter(1)
qe.enter(2)
qe.enter(3)
qe.enter(4)
qe.enter(5)
qe.leave()
console.log(qe.value())
