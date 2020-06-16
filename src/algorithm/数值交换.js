let a = 2,
    b = 3

function swap1(a, b) {
    let temp = a
    a = b
    b = temp
    console.log("swap1 \na = ", a, "\nb = ", b)
}

function swap2(a, b) {
    a = a + b
    b = a - b // b=(a+b)-b=a ↓
    a = a - b //    a=(a+b)-b(a)=(a+b)-a=b
    console.log("swap2 \na = ", a, "\nb = ", b)
}

function swap3(a, b) {
    a = (a + b) - (b = a)
    // 1. b=a
    // 2. (a+b)-a=b
    // 3. a=b
    console.log("swap3 \na = ", a, "\nb = ", b)
}

function swap4(a, b) {
    a = a ^ b
    b = a ^ b // b=a^b=(a^b)^b=a^(b^b)=a
    a = a ^ b // a=a^b=(a^b)^a=(a^a)^b=b
    console.log("swap4 \na = ", a, "\nb = ", b)
}


console.log(swap1(a, b))
console.log(swap2(a, b))
console.log(swap3(a, b))
console.log(swap4(a, b))