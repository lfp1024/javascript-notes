/* 
 * 选择排序
 * 思想：
 * 1. 每轮循环找到当前待排序元素中最小的元素
 * 2. 跟待排序列表的首位交换（冒泡是两两比较，满足条件就交换，一轮循环会交换很多次）
*/

function selectionSort(arr) {
    let indexMin
    for (let i = 0; i < arr.length - 1; i++) {
        indexMin = i
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[indexMin]) indexMin = j
        }
        if (indexMin !== i) arr[i] = (arr[i] + arr[indexMin]) - (arr[indexMin] = arr[i])
        console.log(`${i} 次循环结果为 ${arr}`)
    }
    return arr
}

let arr = [5, 7, 3, 21, 11]
let arrSorted = selectionSort(arr)
console.log("sorted arr = ", arrSorted) //=> sorted arr =  [ 3, 5, 7, 11, 21 ]
