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


// let qe = new Queue()
// qe.enter(1)
// qe.enter(2)
// qe.enter(3)
// qe.enter(4)
// qe.enter(5)
// qe.leave()
// console.log(qe.value())

//------------------------击鼓传花-------------------------
/* 
N个人一起玩游戏，围成一圈，从1开始数数，数到M的人自动淘汰；
最后剩下的人会取得胜利，问最后剩下的是原来的哪一位？
分析：
1. 顺序性：跟元素值无关的顺序要求
2. 循环性：进出队列
3. 需要遍历
*/

// 人数 n，关建数 m
function game(n, m) {
    // 构建一个队列
    let qe = new Queue()
    for (let i = 0; i < n; i++) {
        qe.enter(i + 1)
    }
    // 遍历队列
    while (qe.size() > 1) {
        for (let i = 0; i < m - 1; i++) {
            // 关键数之前，出队再入队
            qe.enter(qe.leave())
        }
        // 关建数，出队
        qe.leave()
    }
    return qe.value()[0]
}

// let res = game(6, 4);
// console.log(res);

// 直接用数组
function game2(n, m) {
    // 构建数组
    const arr = []
    for (let i = 1; i <= n; i++) {
        arr.push(i)
    }

    // 数数
    while (arr.length > 1) {
        for (let i = 1; i <= m - 1; i++) {
            arr.push(arr.shift())
        }
        arr.shift()
    }
    return arr[0]
}
let res = game(6, 4);
console.log(res);