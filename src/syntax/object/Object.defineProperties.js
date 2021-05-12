'use strict';


(async () => {
    let obj = {};
    Object.defineProperties(obj, {
        name: {
            value: 'sb',
            writable: true,
            enumerable: true,
        },
        work: {
            get() {
                return this._work;
            },
            set(v) {
                this._work = v;
            }
        }
    });

    console.log('obj = ', obj); // 打印的时候，会自动序列化，JSON.stringify() 只显示自身可内举属性，defineProperties 默认不可枚举
    console.log('obj properties descriptor = ', Object.getOwnPropertyDescriptors(obj));
    console.log('obj = ', obj);

    obj.work = 'coder';
    console.log('obj.work = ', obj.work);
})();
