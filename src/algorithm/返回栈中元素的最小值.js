/* 
 * 实现一个栈，要求实现 leave(出栈)、enter(入栈)、min(返回最小值) 三个方法，时间复杂度为O(1)
 */

class Stack {
    constainer = []

    // 入栈
    enter(element) {
        this.constainer.unshift(element)
    }

    // 出栈
    leave() {
        return this.constainer.shift()
    }

    // 栈长度
    size() {
        return this.constainer.length
    }

    // 栈中元素
    value() {
        return JSON.parse(JSON.stringify(this.constainer))
    }

    // 栈中元素最小值
    min() {

        // 从小到大排序，升序。不是o(1) sort 内部是插入排序和快排结合（元素个数小于等于10，用插入排序）
        // return this.constainer.sort((a, b) => a - b)[0]

        // 展开运算符o(n)
        // return Math.min(...this.constainer)

        // 非严格模式下，指定为 null 或 undefined 时会自动替换为指向全局对象
        // return Math.min.apply(null, this.constainer)

        // o(n)
        // if (this.container.length === 0) return null
        // let min = this.container[0]
        // for (let i = 0; i < this.container.length; i++) {
        //     if (this.container[i] > this.container[i + 1]) {
        //         min = this.container[i + 1]
        //     }
        // }
        // return min

    }

}

let stack = new Stack;
stack.enter(10);
stack.enter(5);
stack.enter(8);
stack.enter(6);
stack.enter(4);
stack.enter(7);

console.log(stack);
console.log("min = ", stack.min())


class DoubleStack {

    constainer = []
    temp = []

    enter(element) {
        this.constainer.unshift(element)
        // 入栈找出当前栈中最小值
        let min = this.temp[0]
        if (!min || min > element) this.temp.unshift(element)
    }

    leave() {
        // 出栈 看是否是当前队列中的最小值，如果是，则temp队列中也要去除该元素
        // 例如 constainer: [7,4,6,8,5,10] , temp:[4, 5, 10]
        // 出 7，temp不变。出4，temp出4。出 6 8，temp不变。出 5，temp出5
        const ele = this.constainer.shift()
        if (ele === this.temp[0]) this.temp.shift()
        return ele
    }

    // 双栈实现 o(1)
    min() {
        // 空栈返回null（undefined 不好看）
        return this.temp[0] || null
    }
}


let doubleStack = new DoubleStack;
doubleStack.enter(10);
doubleStack.enter(5);
doubleStack.enter(8);
doubleStack.enter(6);
doubleStack.enter(4);
doubleStack.enter(7);

// console.log(doubleStack);
// console.log("min = ", doubleStack.min())
// console.log("leave = ", doubleStack.leave()) // 7
// console.log("min = ", doubleStack.min())
// console.log("leave = ", doubleStack.leave()) // 4
// console.log("min = ", doubleStack.min())
// console.log("leave = ", doubleStack.leave()) // 6
// console.log("min = ", doubleStack.min())
// console.log("leave = ", doubleStack.leave()) // 8
// console.log("leave = ", doubleStack.leave()) // 5
// console.log("min = ", doubleStack.min())
// console.log("leave = ", doubleStack.leave()) // 10
// console.log("min = ", doubleStack.min())