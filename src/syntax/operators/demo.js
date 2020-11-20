(() => {
    function test(...arg) { // 剩余运算符
        console.log(...arg) // 展开运算符 1 2
        console.log(arg) // [1,2]
    }
    test(1, 2);
})()