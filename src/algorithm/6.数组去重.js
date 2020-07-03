/* 
去除数组中重复的值
*/

let distinctArr = (() => {

    function distinctByObjectKey(arr) {
        const obj = {}
        const newArr = []
        arr.forEach((ele) => {
            obj[ele] ? null : (obj[ele] = 1, newArr.push(ele))
        })
        return newArr
    }

    function distinctBySet(arr) {
        return [...new Set(arr)]
    }

    function distinctBy(arr) {
        return [...new Set(arr)]
    }

    return {
        distinctByObjectKey,
        distinctBySet
    }

})()

let arr = [1, 13, 24, 11, 11, 14, 1, 2]
// const res = distinctArr.distinctByObjectKey(arr)
const res = distinctArr.distinctBySet(arr)
console.log("res  = ", res) // res  =  [ 1, 13, 24, 11, 14, 2 ]