
(() => {
    const arr = [1, [2, [[3, 4], 5], 6], 7]

    let i = 0
    function reload(arg) {
        console.log("time = ", i++)
        let reloadArr = []
        for (const e of arg) {
            console.log("e = ", e)
            if (Array.isArray(e)) {
                const res = reload(e)
                reloadArr = reloadArr.concat(res)
                console.log("reload = ", reloadArr)
            } else {
                reloadArr.push(e)
            }
        }
        return reloadArr
    }

    const res = reload(arr)
    console.log("Res = ", res)

    const res2 = arr.flat(2)
    console.log('res2 = ', res2);
})()
