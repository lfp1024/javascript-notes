'use strict';


(async () => {
    const a = [1, 2, 3, { name: 'lfo', age: 11 }];
    // const b = [...a]
    const [...b] = a;
    console.log('a===b', a === b); // 两个不同的地址
    console.log('a[]3===b[3]', a[3] === b[3]); // 引用数据类型的地址是相同的==>浅拷贝
    a[3].age = 22;
    console.log('a = ', a);
    console.log('b = ', b);

    const obj1 = { name: 'lfo', age: 12, gf: { name: 'xm', age: 11 } }
    // const obj2 = { ...obj1 }
    const { ...obj2 } = obj1;
    console.log('obj1===obj2', obj1 === obj2);
    console.log('obj1.gf===obj2.gf', obj1.gf === obj2.gf);
    obj2.gf.name = 'xx';
    console.log('obj1 = ', obj1);
    console.log('obj2 = ', obj2);
})();
