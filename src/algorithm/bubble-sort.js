/* 
 * 冒泡排序
 * 基本思想：
 *     相邻元素依次进行比较，满足条件则进行交换，每次循环都分别把较小元素和较大元素移向两边
 * 实现：双层循环实现
 *     外层循环用于 控制循环的轮数，一般是数组长度减1（最后一轮只有最后一位，不需要比）（i = 0; i < arr.length - 1 或 i = 1; i < arr.length）
 *     内层循环用于 在每轮循环中，比较相邻元素的大小，满足条件则交换元素位置
 *       + 前者>后者=>交换 正排序，从小到大 
 *         + 如果从头开始循环，每一轮都会把【未确定顺序的元素】中最大的元素排到末尾。每一轮至少会确定一位元素的位置
 *           例如 [63,4,24,1,3,15]，第一轮循环把63排到末尾，确定位置[4,24,1,3,15，63]，第二轮把除63之外的元素中最大的24排到末尾，确定位置[4,1,3,15，24,63]...
 *         + 如果从尾开始循环，每一轮都会把【未确定顺序的元素】中最小的元素排到开头。每一轮至少会确定一位元素的位置
 *           例如 [9,1,5,8,3,7,4,6,2]，第一轮循环把1排到开头，确定位置[1,9,2,5,8,3,7,4,6]，第二轮把除1之外的元素中最小的2排到开头，确定位置[1,2,9,3,5,8,4,7,6]...
 *       + 前者<后者=>交换 倒排序，从大到小
 * 优化：
 *     1. 添加flag。如果某轮循环没有发生元素位置改变，则认为已排好顺序，结束循环
 *     2. 改变内层循环结束条件。获取已经排好顺序的位置，减少下轮循环的次数
 */

// 正排序，从头开始循环
function bubbleSortFromBegin(arr) {
    let times = 0
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                arr[j] = (arr[j] + arr[j + 1]) - (arr[j + 1] = arr[j])
            }
            times++
        }
    }
    console.log(`${arguments.callee.name} times = ${times}`)
}

function bubbleSortFromBeginOptimized(arr) {
    let times = 0
    let position = arr.length - 1
    for (let i = 0; i < arr.length - 1; i++) {
        // position 动态变化
        let k = position
        // 不需要加，因为一旦不进入内循环，flag 不成立就结束循环了
        //  position = 0
        let flag = false
        for (let j = 0; j < k; j++) {
            if (arr[j] > arr[j + 1]) {
                arr[j] = (arr[j] + arr[j + 1]) - (arr[j + 1] = arr[j])
                flag = true
                position = j
            }
            times++
        }
        if (!flag) break
    }
    console.log(`${arguments.callee.name} times = ${times}`)
}


// 正排序，从尾开始循环
function bubbleSortFromEnd(arr) {
    let times = 0
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = arr.length - 1; j > 0; j--) {
            if (arr[j - 1] > arr[j]) {
                arr[j - 1] = (arr[j - 1] + arr[j]) - (arr[j] = arr[j - 1])
            }
            times++
        }
    }
    console.log(`${arguments.callee.name} times = ${times}`)
}

function bubbleSortFromEndOptimized(arr) {
    let times = 0
    let flag = true
    for (let i = 0; i < arr.length - 1 && flag; i++) {
        // 如果某轮循环没有元素位置交换，则结束循环
        flag = false
        // 每轮循环结束，a[i]位置的元素都已经确定位置。下次循环不需要参与比较，减少内循环次数
        for (j = arr.length - 1; j > i; j--) {
            if (arr[j - 1] > arr[j]) {
                arr[j - 1] = (arr[j - 1] + arr[j]) - (arr[j] = arr[j - 1])
                flag = true
            }
            times++
        }
    }
    console.log(`${arguments.callee.name} times = ${times}`)
}



// const arr = [2, 1, 3, 4, 5]
// console.log(arr)

// bubbleSortFromBegin(arr)    // times=16
// console.log(arr)

// bubbleSortFromBeginOptimized(arr) // times=4 
// console.log(arr)

// bubbleSortFromEnd(arr)      // times=16
// console.log(arr)

// bubbleSortFromEndOptimized(arr) // times=7
// console.log(arr)



//  const arr = [63, 4, 24, 1, 3, 15]
//  console.log(arr)

// bubbleSortFromBegin(arr)    // times=25
// console.log(arr)
// bubbleSortFromBeginOptimized(arr) // times=13
// console.log(arr)

// bubbleSortFromEnd(arr)      // times=25
// console.log(arr)

// bubbleSortFromEndOptimized(arr) // times=15
// console.log(arr)