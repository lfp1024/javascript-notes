'use strict';


(() => {
    const obj = {
        name: 'lfp',
        age: '',
        hobby: undefined,
        weight: null,
        height: NaN,
        education: 0,
    }
    // 只要出现在obj中，不管值是什么，都会作为一个元素
    console.log(Object.keys(obj)); // [ 'name', 'age', 'hobby', 'weight', 'height', 'education' ] => 属性
    Object.keys(obj).forEach(ele => {
        if (obj[ele]) console.log(ele + ':' + obj[ele]); // name:lfp => 值
    });
})()