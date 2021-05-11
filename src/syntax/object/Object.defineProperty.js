'use strict';

/**

在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象

拥有布尔值的键 configurable、enumerable 和 writable 的默认值都是 false。
属性值和函数的键 value、get 和 set 字段的默认值为 undefined。





*/


(() => {
    let obj = {};
    let name = 'sb';
    // 没有明确指定的键使用对应描述符的默认值
    Object.defineProperty(obj, 'name', {
        enumerable: false, // enumerable 为 true，才能被枚举
        configurable: true, // configurable 为 true，才能 delete 掉
        get() {
            return name;
        },
        set(v) {
            name = v;
        }
    });
    console.log('obj.name = ', obj.name);
    console.log('property name descriptor = ', Object.getOwnPropertyDescriptor(obj, 'name'));

    // delete obj.name;
    // console.log('obj = ', JSON.stringify(obj));

    // obj.name = 'lfp';
    // console.log('obj.name = ', obj.name); // 存取描述符定义的属性可以被修改

    // 如果没有 value、writable、get 和 set 属性，则认为是数据描述符，使用数据描述符的默认值
    Object.defineProperty(obj, 'age', {
        enumerable: true,
    });
    console.log('obj.age = ', obj.age);
    console.log('property age descriptor = ', Object.getOwnPropertyDescriptor(obj, 'age'));


    Object.defineProperty(obj, 'weight', {
        enumerable: true,
        value: 65,
    });
    console.log('property weight descriptor = ', Object.getOwnPropertyDescriptor(obj, 'weight'));
    // writable 为 false，无法通过赋值运算符修改 value (值)
    obj.weight = 66; // Cannot assign to read only property 'weight' of object '#<Object>'
    console.log('obj.weight = ', obj.weight);

    // console.log('keys = ', Object.keys(obj));
})();
