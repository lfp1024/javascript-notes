// 打印一个 4*4 矩阵

// 错误示范
var d_arr = [];
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        // TypeError: Cannot set property '0' of undefined
        // ??? 一维数组没有初始化，直接取 undefined[0] 报错 ？？
        // d_arr[i][j] = 1;
    }
}
// console.log(d_arr);

// 错误示范
var d_arr = [];
var temp_arr = [];
for (let j = 0; j < 4; j++) {
    temp_arr[j] = 0;
}
for (let i = 0; i < 4; i++) {
    // 给一维数组的每个元素赋值一个数组，但是这里是引用赋值，每个元素指向同一个数组
    d_arr[i] = temp_arr;
}
// console.log(d_arr);
// 修改第二维数组，则一维中的每个元素都会改变
d_arr[0][1] = 1
// console.log("change = ", d_arr)

// [0, 1, 0, 0]
// [0, 1, 0, 0]
// [0, 1, 0, 0]
// [0, 1, 0, 0]

// 正确示范
let arr = new Array()
console.log(typeof arr[1]) // undefined
// 嵌套循环
for (let i = 0; i < 4; i++) {
    // 一维数组初始化，每次给一个新的二维数组
    arr[i] = new Array()
    for (let j = 0; j < 4; j++) {
        // 二维数组初始化
        arr[i][j] = 0
    }
}
arr[0][1] = 1
console.log(arr)

// 遍历
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        console.log(arr[i][j]);
    }
}