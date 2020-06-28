Function.prototype.myHasInstance = function (example) {
    console.log("my hasInstance")
    // this：检测的类
    let classPrototype = this.prototype,
        proto = Object.getPrototypeOf(example)
    while (true) {
        if (proto === null) return false
        if (proto === classPrototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}

Function.prototype["toString"] = function () {
    console.log("my toString")
}

console.log([] instanceof Array)
console.log(Array.myHasInstance([]))
console.log(Array.toString())