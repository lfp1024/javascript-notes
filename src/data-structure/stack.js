function Stack() {
    this.constainer = []
}

Stack.prototype = {
    constructor: Stack,

    // 进栈
    enter: function enter(element) {
        this.constainer.unshift(element)
    },

    // 出栈 
    leave: function leave() {
        this.constainer.shift()
    },

    // 获取栈中元素数量
    size: function size() {
        return this.constainer.length
    },

    // 获取栈中的元素（深拷贝）
    value: function value() {
        return JSON.parse(JSON.stringify(this.constainer))
    }
}

let st = new Stack()
for(let i=1; i<=6; i++){
    st.enter(i)
}   
console.log(st.value())
st.leave()
console.log(st.value())