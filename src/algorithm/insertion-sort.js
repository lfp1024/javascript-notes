/*
 * 插入排序
 * 思想：
 *  假设第一个元素已经被排序（已排序元素），取出已排序元素的下一位元素（待排序元素），从后往前，依次跟已排序元素比较，
 * 如果待排序元素小于已排序元素，则两者交换位置。直到最后一位元素
 * 
 */

function insertionSort(array) {

    for (let i = 1; i <= array.length - 1; i++) {
        for (let j = i; j >= 0; j--) {
            if (array[j - 1] > array[j]) {
                array[j - 1] = array[j - 1] + array[j] - (array[j] = array[j - 1])
            }
        }
    }
    return array
}

let arr1 = [3, 5, 1, 4, 2]
console.time("insertionSort1")
let arr1Sorted = insertionSort(arr1)
console.timeEnd("insertionSort1") // insertionSort1: 0.412ms
console.log("arr1 sorted = ", arr1Sorted)

//=============================================

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

function defaultCompare(a, b) {
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}


function insertionSort2(arr, compareFn = defaultCompare) {

    for (let i = 1; i <= arr.length - 1; i++) {
        let temp = arr[i]
        let j = i
        // 每个已排序元素都跟当前待排序元素（temp）进行比较
        while (j > 0 && compareFn(arr[j - 1], temp) === Compare.BIGGER_THAN) {
            arr[j] = arr[j - 1]
            j--
        }
        // 确定最终位置后才插入
        arr[j] = temp
    }
    return arr
}


let arr2 = [3, 5, 1, 4, 2]
console.time("insertionSort2")
let arr2Sorted = insertionSort2(arr2)
console.timeEnd("insertionSort2") // insertionSort2: 0.321ms
console.log("arr2 sorted = ", arr2Sorted)