/* 
描述：
反转一个只有 3 位数的整数

样例：
123 反转之后是 321。 900 反转之后是 9。

题目分析：
009这种形式需要转为9
最后输出数字。

*/



(() => {
    // 方式1：转数组

    // function reverseInterger(interger: number) {
    //     let intStrArr = interger.toString().split("")
    //     console.log("intStrArr = ", intStrArr) // intStrArr =  [ '9', '0', '0' ]
    //     let intReversedStr = intStrArr.reverse().join("") // intReversedStr =  '009'
    //     console.log("intReversedStr = ", intReversedStr)
    //     let intReversed = Number(intReversedStr)
    //     console.log("intReversed = ", intReversed) // intReversed =  9
    //     return intReversed
    // }

    // js 
    // ts 中不支持 展开运算符跟字符串使用，只能跟数组使用
    // function reverseInterger(interger) {
    //     return +[...interger.toString()].reverse().join("")
    // }

    function reverseInterger(interger: number) {
        let res = interger.toString().split("").reverse().join("")
        return Number(res)
    }


    // 方式2：求余数，逐个颠倒
    // 个位 对10取余；十位 对100取余，再除10向下取整；百位，除100向下取整
    // function reverseInterger(interger: number) {
    //     return (interger % 10) * 100 + Math.floor(((interger % 100) / 10)) * 10 + Math.floor(interger / 100)
    // }


    // 方式3: 转字符串，逐个获取字符
    // function reverseInterger(interger: number) {
    //     let intStr = interger.toString()
    //     let newIntStr = ""
    //     for (let i = intStr.length - 1; i >= 0; i--) {
    //         newIntStr += intStr.charAt(i)
    //     }
    //     return Number(newIntStr)
    // }


    let n = 9230
    let res = reverseInterger(n)
    console.log("n = ", res)
})()