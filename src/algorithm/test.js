function reverseInterger(interger) {
    // ts 中不支持 展开运算符跟字符串使用，只能跟数组使用
    // return +[...interger.toString().split("")].reverse().join("")
    return [].reverse.call(interger.toString().split("")).join("")
}


let n = 9230
let res = reverseInterger(n)
console.log("n = ", res)