/* 
 * 写一个函数，把一个 JSON 对象的 key 从下划线形式 (Pascal) 转换到小驼峰形式 (Camel) 
 * 示例：
 *  converter({"a_bc_def":1}); 返回 {"aBcDef":1}
 */


let converter = function (data) {
    // 1. 取出对象的key
    // 1.1 key容器
    const keyArr = Object.keys(data)
    // 1.2 value容器
    const valueArr = Object.values(data)

    // 2. 改变对象key的格式
    // 2.2 改变后key的容器
    const convertedKeyArr = []
    for (const key of keyArr) {

        const splitKeyArr = key.split('_')
        let convertedKey = splitKeyArr[0]
        // a bc def
        // 除第一个元素外，其他变为首字母大写
        for (let i = 1; i < splitKeyArr.length; i++) {
            const initial = splitKeyArr[i].charAt(0).toUpperCase()
            const convertedEle = initial.concat(splitKeyArr[i].slice(1))

            convertedKey = convertedKey.concat(convertedEle)
        }
        convertedKeyArr.push(convertedKey)
    }

    // 3. 返回修改后的对象
    // 3.1 新对象
    const newObj = {}
    let i = 0
    for (const ele of convertedKeyArr) {
        newObj[ele] = valueArr[i++]
    }
    return newObj
}

// test-case
const obj = {
    "a_bc_def": 20,
    "def_abc_def": 30
}

console.time("converter1")
console.log(converter(obj))
console.timeEnd("converter1") // default: 4.388ms
// 耗时测试，跟3个方法的位置有关，第一个最慢。。。。。。。。。单独测试又跟执行环境有关。。。。。。。。。。


//================================================================================
function converter2(data) {

    for (let key in data) {
        let arr = []
        let str = ""
        arr = key.toLowerCase().split("_")
        str = arr.map((val, index) => {
            if (index > 0) {
                return val.replace(/( |^)[a-z]/g, (L) => {
                    return L.toUpperCase()
                })
            }
        }).join("")

        let newKey = ""
        // console.log(arr[0] + str)
        newKey = arr[0] + str
        data[newKey] = data[key]
        delete data[key]
    }
    return data
}


console.time("converter2")
console.log(converter2(obj))
console.timeEnd("converter2") // default: 4.311ms

//==================================================================================

function converter3(data) {
    data = JSON.stringify(data)
    console.log("data = ", data)
    const reg = /[_].+?\:/g
    const res = data.replace(reg, (...args) => {
        console.log("args =", args)
        // args = [ '_bc_def":', 3, '{"a_bc_def":20,"def_abc_def":30}' ]
        const content = args[0].replace(/[_]./g, (...args) => {
            console.log("args[0] =", args[0])
            return args[0].slice(1).toUpperCase()
        })
        return content
    })
    // JSON.parse() 耗时
    // return JSON.parse(res)
    return res
}

console.time("converter3")
console.log(converter3(obj))
console.timeEnd("converter3") // default: 5.425ms