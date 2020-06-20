var num1 = 1;
// window 添加属性 num2:2
num2 = 2;
delete num1;  //变量不能被删除 
delete num2;  //属性可以被删除 
console.log("num11 = ", num1) //=>1
// console.log("num2 = ", num2) // Uncaught ReferenceError: num2 is not defined

function model() {
    var num1 = 2; // 函数 model 私有变量 
    num2 = 3;     // window 添加属性 num2:3
    console.log("num21 = ", num2);//=>3
    console.log("window.num2 = ", window.num2);//=>3
    // 自执行匿名函数 ，只有当外层函数执行的时候，才会执行
    (function () {
        var num3 = 4; // 匿名函数私有变量 
        console.log("num31 = ", num3)//=>4
        num1 = 5; // 改变的是上级 model私有上下文中的 num1
        console.log("num12 = ", num1) //=>5
        console.log("window.num1 = ", window.num1) //=>1
        num3 = 6; // 改变的是 匿名函数私有变量 num3 
        console.log("num32 = ", num3)//=>6
        console.log("window.num3 = ", window.num3) //=> undefined
    })()
    // model 私有变量
    console.log("num13 = ", num1) //=> 5
    // console.log("num33 = ", num3)//=>Uncaught ReferenceError: num3 is not defined
}
model()
// 全局变量
console.log("num14 = ", num1)//=>1
console.log("window.num1 = ", window.num1)//=>1

console.log("num22 = ", num2)//=>3
console.log("window.num2 = ", window.num2)//=>3

// console.log("num33 = ", num3)//=>Uncaught ReferenceError: num3 is not defined

delete num2
// console.log("num23 = ", num2) // delete 之后，报错 Uncaught ReferenceError: num2 is not defined
