/* 
题目：
给定一个字符串数组, 每一个元素代表一个 IP 地址，找到出现频率最高的 IP
注：给定数据只有一个频率最高的 IP

样例：
lines = ['192.168.1.1', '192.118.2.1', '192.168.1.1'];
return '192.168.1.1';

分析：
找出数组中重复次数最多的元素

思路：
用对象来处理，将元素赋值到属性上，判断之前有没有这个属性
*/

(() => {
    lines = ['192.168.1.1', '192.118.2.1', '192.168.1.1'];

    // 这种写法也是箭头函数，没有自己的THIS，继承上级上下文中的THIS，即全局上下文中的THIS:window
    // let highestFrequency = (arr) => {
    //     // checkArgs()
    //     if (arr.length === 0) return 0
    //     console.log(this) //=> window
    //     let [obj, max, value] = [{}, 1, undefined]
    //     arr.forEach((ele) => {
    //         if (obj[ele]) {
    //             obj[ele]++
    //             if (obj[ele] > max) {
    //                 max = obj[ele]
    //                 value = ele
    //             }
    //         } else {
    //             obj[ele] = 1
    //         }
    //     })
    //     return value
    // }

    // let obj = {
    //     func: highestFrequency
    // }

    // let res = obj.func(lines)
    // console.log("highest frequency element is ", res)



    function highestFrequency(arr) {
        // checkArgs()
        // console.log(this)  // obj 
        let [obj, max, value] = [{}, 1, '']
        // forEach 无法中断
        arr.forEach((ele) => {
            if (obj[ele]) {
                // 可能重复多个元素，但只有一个元素的重复最多的
                obj[ele]++
                if (obj[ele] > max) {
                    max = obj[ele]
                    value = ele
                }
            } else {
                obj[ele] = 1
            }
        })
        return value
    }

    let obj = {
        func: highestFrequency
    }

    let res = obj.func(lines)
    console.log("highest frequency element is ", res)
})()