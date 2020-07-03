/* 
回文：
字符正反排序都是一个单词
*/




let checkModel = (() => {

    // 方式1：reverse
    function checkPalindrom(str) {
        return str.split("").reverse().join("") === str
    }

    // 方式2：遍历
    function checkPalindromByLoop(str) {
        let newStr = ""
        str.split("").forEach((ele) => {
            newStr = ele + newStr
            console.log("new str = ", newStr)
        })
        return str === newStr
    }

    return {
        checkPalindrom,
        checkPalindromByLoop
    }

})()

let str = "abcba"
// const res = checkModel.checkPalindrom(str)
const res = checkModel.checkPalindromByLoop(str)
console.log("is palindrom = ", res)
let str2 = "abcbac"
// const res2 = checkModel.checkPalindrom(str2)
const res2 = checkModel.checkPalindromByLoop(str2)
console.log("is palindrom = ", res2)