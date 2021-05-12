'use strict';


(async () => {
    const obj = { a: 1, gf: { name: 'xx', age: 23 } };
    const copy = Object.assign({}, obj);
    console.log('copy = ', copy);

    obj.gf.name = 'wx';
    console.log('copy.gf.name = ', copy.gf.name); // 浅拷贝

    const obj2 = { a: 2 };
    const copy2 = Object.assign({}, obj, obj2);
    console.log('copy2 = ', copy2);

    const obj3 = { [Symbol('foo')]: 2 }
    const copy3 = Object.assign({}, obj, obj3);
    console.log('copy3 = ', copy3);

    const obj4 = Object.create({ foo: 0 }, { // foo 是继承属性
        bar: { // bar 是不可枚举属性
            value: 11,
        },
        baz: {
            value: 22,
            enumerable: true,
        }
    });
    const copy4 = Object.assign({}, obj, obj4);
    console.log('copy4 = ', copy4);
    console.log('extends property = ', Object.getOwnPropertyDescriptor(obj4, 'foo'));

    // number string boolean null undefined bigint symbol
    console.log('string = ', Object.getOwnPropertyDescriptors('a'));

    const source = {
        set foo(value) {
            this._value = value;
        },
        get foo() {
            return this._value;
        }
    };
    console.log('source.foo = ', source.foo);
    console.log('source.foo descriptor = ', Object.getOwnPropertyDescriptor(source, 'foo'));
    const target1 = {};
    Object.assign(target1, source);
    console.log('target1.foo descriptor = ', Object.getOwnPropertyDescriptor(target1, 'foo'));
    const target2 = {};
    Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
    console.log('target2.foo descriptor = ', Object.getOwnPropertyDescriptor(target2, 'foo'));

    const o = { bar: 42 };
    console.log('Object.getOwnPropertyDescriptor(o, "bar");: ', Object.getOwnPropertyDescriptor(o, "bar"));

})();
