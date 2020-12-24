let a = [1, 2, 3]
a.forEach(ele => {
    if (ele === 2) return; // forEach 非 for 循环，而是函数调用，return之后，执行下一次调用（类似 for 循环中的 continue）
    console.log('ele=', ele);
})