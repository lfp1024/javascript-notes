function Queue() {
    let twoDimensionalArr = new Array()
    // 这里初始化一维数组需要指定长度，长度即最高优先级
    for (let i = 0; i < 100; i++) {
        twoDimensionalArr[i] = new Array()
    }
    this.container = twoDimensionalArr
}

// 用二维数组实现
Queue.prototype = {
    constructor: Queue,
    // 入队，element 元素，priority 优先级，默认0，数值越大，优先级越高
    enter: function enter(element, priority = 0) {
        // 一维数组 用下标表示优先级，每个优先级数组已经占位，优先级高的在一维数组的末尾
        // 二维数组元素为内容
        for (let i = 0; i < this.container.length; i++) {
            // 添加到该优先级数组的末尾
            if (i === priority) this.container[i].push(element)
        }
    },
    // 出队，移除队首元素
    leave: function leave() {
        for (let i = this.container.length - 1; i >= 0; i--) {
            if (this.container[i].length === 0) continue
            // 移除第一个元素
            return this.container[i].unshift()
        }
    },
    // 查看队列的长度
    size: function size() {
        let sum = 0
        for (let i = this.container.length - 1; i >= 0; i--) {
            sum += this.container[i].length
        }
        return sum
    },
    // 查看队列的内容，优先级高的在前面输出
    value: function value() {
        let newArr = []
        for (let i = this.container.length - 1; i >= 0; i--) {
            for (let j = 0; j < this.container[i].length; j++) {
                let obj = {
                    value: this.container[i][j],
                    priority: i
                }
                newArr.push(obj)
            }
        }
        return newArr
    }
}

const qe = new Queue()
qe.enter(1, 5)
qe.enter(2, 1)
qe.enter(3, 10)
qe.enter(4, 9)
qe.enter(5, 9)

console.log(qe.value());