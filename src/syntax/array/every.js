'use strict';


(async () => {

    const res = [1, 2, 3].every(ele => { // 一旦有一个元素执行callback返回falsy则立即结束
        console.log('ele = ', ele);
        return ele < 2;
    })
    console.log('res = ', res);
})();
