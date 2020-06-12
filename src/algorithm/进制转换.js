// 十进制转二进制

// 1. NumberObject.toString(radix)

console.log((4).toString(2))
// 100



// 2. 原生JS实现
/*
 * 思路：把十进制数字和2整除(因为二进制是满2进1)
 *   + 获取其余数 N%2
 *   + 获取其商数 N/2 （整除后的结果）
 * 用上一次的商数继续除以二，一直到商数为0为止；把所有的余数从尾部到顶部依次连接即可；
 */


// 在原型上扩展方法
Number.prototype.decimal2binary = function decimal2binary() {
    // 存放余数
    let constainer = []
    // 获取值
    let decimal = this.valueOf()
    // 求余数
    while (decimal > 0) {
        let merchant = Math.floor(decimal / 2)
        let remainder = decimal % 2
        constainer.unshift(remainder)
        decimal = merchant
    }
    // 没有类型，不会提示 join 方法
    return JSON.parse(JSON.stringify(constainer)).join('')
};

function decimal2binary(decimal) {
    // 存放余数
    let constainer = []
    // 求余数
    let shang = Math.floor(decimal / 2)
    constainer.unshift(decimal % 2)

    while (shang > 0) {
        constainer.unshift(shang % 2)
        shang = Math.floor(shang / 2)
    }

    return JSON.parse(JSON.stringify(constainer)).join('')
}

function decimal2binary2(decimal) {
    // 存放余数
    let constainer = []
    // 求余数
    while (decimal > 0) {
        let merchant = Math.floor(decimal / 2)
        let remainder = decimal % 2
        constainer.unshift(remainder)
        decimal = merchant
    }
    // 没有类型，不会提示 join 方法：变成字符串，指定间隔符
    return JSON.parse(JSON.stringify(constainer)).join('')
}

console.log((1234567).decimal2binary())
console.log((1234567).toString(2))
console.log(decimal2binary(1234567));
console.log(decimal2binary2(1234567))

// 100101101011010000111
// 100101101011010000111
// 100101101011010000111
// 100101101011010000111

// ================================================================================
// 八进制转二进制

function octal2binary(octal) {
    // 转化成字符串
    let octalStr = octal + ''
    // 转换成字符数组
    let octalStrArr = octalStr.split('')
    let binaryStr = ''
    // 处理每一位八进制数
    for (i = 0; i < octalStrArr.length; i++) {
        // 变为number类型
        let ele = Number(octalStrArr[i])
        let binaryStrRaw = ''
        // 除2取余
        while (ele > 0) {
            let merchant = Math.floor(ele / 2)
            let remainder = ele % 2
            // 拼到字符串前面
            binaryStrRaw = (remainder + '').concat(binaryStrRaw)
            ele = merchant
        }
        // binaryStr += Number(binaryStrRaw) | 0b000
        // 拼接000
        let binaryConcat = '000' + binaryStrRaw
        binaryStr += binaryConcat.slice(binaryConcat.length - 3)
    }
    return binaryStr
}

console.log(octal2binary(153))
// 001000011

// ==================================================================================
// 十六进制转二进制， 不要把 ABCDEF 转换为 10 11 12 13 14 15

function hexadecimal2binary(octal) {
    // 转换成字符数组
    let octalStrArr = octal.split('')
    let binaryStr = ''
    // 处理每一位十六进制数
    for (i = 0; i < octalStrArr.length; i++) {
        // 变为number类型
        let ele = 0
        // console.log('octalStrArr[i] = ', octalStrArr[i] === 'A')
        switch (octalStrArr[i]) {
            case 'A':
                ele = 10
                break
            case 'B':
                ele = 11
                break
            case 'C':
                ele = 12
                break
            case 'D':
                ele = 13
                break
            case 'E':
                ele = 14
                break
            case 'F':
                ele = 15
                break
            default:
                ele = Number(octalStrArr[i])
        }
        // console.log("ele = ", ele)
        let binaryStrRaw = ''
        // 除2取余
        while (ele > 0) {
            let merchant = Math.floor(ele / 2)
            let remainder = ele % 2
            // binaryStrRaw += remainder
            binaryStrRaw = (remainder + '').concat(binaryStrRaw)
            ele = merchant
        }
        // binaryStr += Number(binaryStrRaw) | 0b000
        // 拼接0000
        // console.log("binaryStrRaw = ", binaryStrRaw)
        let binaryConcat = '0000' + binaryStrRaw
        binaryStr += binaryConcat.slice(binaryConcat.length - 4)
        // console.log("binaryStr = ", binaryStr)
    }
    return binaryStr
}

console.log(hexadecimal2binary('AB12'))