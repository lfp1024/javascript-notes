// const foo = [
//     'apples', 'oranges', 'pears'
// ]
// console.log('entries = ', foo.entries());
// for (const thing of foo.entries()) {
//     console.log(thing)
// }

// [ 0, 'apples' ]
// [ 1, 'oranges' ]
// [ 2, 'pears' ]

// const foo = {
//     'apples': { name: '苹果', weight: 2 },
//     'pears': { name: '梨', weight: 3 }
// }

// console.log('entries = ', Object.entries(foo));
// for (const [key, value] of Object.entries(foo)) { // 遍历的颗粒是数组，利用数组的解构赋值
//     console.log(key, ':', value)
// }
// for (const [key, { name, weight }] of Object.entries(foo)) { // 同时数组解构和对象解构
//     console.log(key, ':', name, weight)
// }

const bar = {
    'xm': 12,
    'xh': 13,
}

for (const [name, age] of Object.entries(bar)) {
    console.log('name:age', name, age);
}



