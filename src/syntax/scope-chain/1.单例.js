// JS 中的单例，单独的实例
const keyValueStore = (function () {
    let count = -1; // 单例 私有属性，所有单例共享。只能在函数定义中访问，外部无法访问（无法通过实例访问）
    console.log('count = ', count);
    return (function kvs() { // 第一次执行时已设置 scope-chain，后续执行（实例化）遵循之前的 scope-chain
        count++;
        return {
            data: {},
            create() { return new kvs(); },
            get(key) { return this.data[key]; },
            set(key, value) { this.data[key] = value; },
            delete(key) { delete this.data[key]; },
            getLength() {
                let l = 0;
                for (p in this.data) l++;
                return l;
            },
            count() { return count } // 提供一个公共方法访问私有属性
        }
    })();
})();

let s1 = keyValueStore;
console.log('s1.count = ', s1.count());
let s2 = s1.create();
console.log('s1.create');
console.log('s1.count = ', s1.count());
console.log('s2.count = ', s2.count());
s1.set('a', 1);
s1.set('b', 2);
s2.set('c', 3);
console.log('s1.getLength = ', s1.getLength());
console.log('s2.getLength = ', s2.getLength());
console.log('s1.get(c) = ', s1.get('c'));
console.log('s2.get(c) = ', s2.get('c'));