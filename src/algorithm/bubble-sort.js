 /* 
  * 冒泡排序
  * 一种交换排序，基本思想是：两两比较相邻记录的关键字，如果反序则交换，知道没有反序记录为止
  */

 // 实现方式一
 // 不是两两比较，而是简单的交换排序，让每个位置跟它后面的元素进行比较，满足条件则交换，每一轮比较都会确定一个元素的位置

 function bubbleSort1(arr) {
     let times = 0
     for (let i = 0; i < arr.length - 1; i++) { // 外层循环用于 控制循环的轮数，一般是数组长度减1，最后一轮只有最后一位，不需要比较
         for (let j = 0; j < arr.length - 1; j++) { // 在每一轮循环中 内层循环用于 比较相邻元素的大小，每一轮都从第一位开始比较到最后一位
             if (arr[j] > arr[j + 1]) {
                 arr[j] = (arr[j] + arr[j + 1]) - (arr[j + 1] = arr[j])
             }
             times++
         }
     }
     console.log(`${arguments.callee.name} times = ${times}`)
 }

 // 实现方式二
 // 不是两两比较，而是简单的交换排序，让每个位置跟它后面的元素进行比较，满足条件则交换，每一轮比较都会确定一个元素的位置
 function bubbleSort2(arr) {
     let times = 0
     for (let i = 0; i < arr.length - 1; i++) { // 外层循环用于 控制循环的轮数，一般是数组长度减1
         for (let j = i + 1; j <= arr.length - 1; j++) { // 正排序，每轮循环结束，都会确定一位元素，所以下次从该元素的下一位开始比较
             if (arr[i] > arr[j]) {
                 arr[i] = (arr[i] + arr[j]) - (arr[j] = arr[i])
             }
             times++
         }
     }
     console.log(`${arguments.callee.name} times = ${times}`)
 }

 function bubbleSort5(arr) {
     let times = 0
     for (let i = 0; i < arr.length - 1; i++) { // 外层循环用于 控制循环的轮数，一般是数组长度减1
         let flag = false
         for (let j = i + 1; j <= arr.length - 1; j++) { // 正排序，每轮循环结束，都会确定一位元素，所以下次从该元素的下一位开始比较
             if (arr[i] > arr[j]) {
                 arr[i] = (arr[i] + arr[j]) - (arr[j] = arr[i])
                 flag = true
             }
             times++
         }
         if (!flag) break
     }
     console.log(`${arguments.callee.name} times = ${times}`)
 }


 // 实现方式三
 // 两两比较，符合条件，交换位置（不是固定下标1跟下标2 3 4比较，而是下标4 3比较，3 2比较，2 1比较）
 function bubbleSort3(arr) {
     let times = 0
     for (let i = 0; i < arr.length - 1; i++) {
         for (let j = arr.length - 1; j >= i; j--) {
             if (arr[j - 1] > arr[j]) {
                 arr[j - 1] = (arr[j - 1] + arr[j]) - (arr[j] = arr[j - 1])
             }
             times++
         }
     }
     console.log(`${arguments.callee.name} times = ${times}`)
 }


 // 实现方式三优化
 function bubbleSort4(arr) {
     let times = 0
     let flag = true
     for (let i = 0; i < arr.length - 1 && flag; i++) {
         flag = false
         for (j = arr.length - 1; j >= i; j--) {
             if (arr[j - 1] > arr[j]) {
                 arr[j - 1] = (arr[j - 1] + arr[j]) - (arr[j] = arr[j - 1])
                 flag = true
             }
             times++
         }
     }
     console.log(`${arguments.callee.name} times = ${times}`)
 }

 const arr2 = [2, 1, 3, 4, 5]
 //   bubbleSort3(arr2) // times=14
 //   console.log(arr2)
 //   bubbleSort4(arr2) // times=9
 //   console.log(arr2)
 //  bubbleSort5(arr2) // times=7
 //  console.log(arr2)




 const arr = [63, 4, 24, 1, 3, 15]
 //  bubbleSort1(arr) // times=25
 //  console.log(arr)

 //  bubbleSort2(arr) // times=15
 //  console.log(arr)

 //   bubbleSort5(arr) // times=15
 //   console.log(arr) 

 //  bubbleSort3(arr) // times=20
 //  console.log(arr)

 //  bubbleSort4(arr) // times=20
 //  console.log(arr)

