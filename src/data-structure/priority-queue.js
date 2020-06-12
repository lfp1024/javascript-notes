function Queue() {
    this.container = []
}

Queue.prototype = {
    constructor: Queue,
    // 入队，element 元素，priority 优先级，默认0，数值越大，优先级越高
    enter: function enter(element, priority = 0) {
        // 队列中的元素是一个对象，包含内容和优先级
        let obj = {
            value: element,
            priority: priority
        }
        // 默认优先级0，插入队尾
        if (priority === 0) {
            this.container.push(obj)
            // 不需要再往下执行了
            return
        }

        // 指定优先级
        // 从最后一项开始比较优先级，到第一项
        // 是否有比我优先级高的
        let flag = false
        for (let i = this.container.length - 1; i >= 0; i--) {
            let item = this.container[i]
            if (item.priority >= priority) {
                // 插入到这一项的后面，优先级相同，按插入顺序排列
                this.container.splice(i + 1, 0, obj)
                flag = true
                // break
                return
            }
        }
        // 没有比我优先级高的，插入队首（1.没有元素； 2.）
        !flag ? this.container.unshift(obj) : null
    },

    // 移除队列
    leave: function leave() {
        if (this.container.length === 0) return;
        return this.container.shift();
    },
    // 查看队列的长度
    size: function size() {
        return this.container.length;
    },
    // 查看队列的内容
    value: function value() {
        return JSON.parse(JSON.stringify(this.container));
    }

}

const qe = new Queue()
qe.enter(1, 5)
qe.enter(2, 1)
qe.enter(3, 10)
qe.enter(4, 9)
qe.enter(5, 9)

console.log(qe.value());