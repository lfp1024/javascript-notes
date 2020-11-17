(() => {
    //*************************************** */
    // delete 删除数组元素，删除的是数组下标，但是数组长度不变，遍历的过程中依然会占用一次循环
    // 此时通过被删除的下标获取到的值为undefined。
    const a = [1, 2, 3]
    delete a[1];

    // 通过给指定元素赋值undefined，数组下标不会被删除，数组长度不变，遍历的过程中占用一次循环
    // 此时通过该下标获取到的值为undefined。
    // const a = [1, 2, 3]
    // a[1] = undefined;
    // for (const e of a) {
    //     console.log('e = ', e)
    // }
    for (let i = 0; i < a.length; i++) {
        console.log(`a[${i}] = ${a[i]}`);
    }

    //***************************************** */
    // 通过 var let const 定义的属性不能被delete删除（全局或函数作用域）
    // var a = 1
    // let b = 2
    // const c = 3

    // delete a
    // delete b
    // delete c
    // console.log(a, b, c);

    // function testDelete(){
    //     var d=4
    //     delete d
    //     console.log(d)
    // }
    // testDelete()
})()