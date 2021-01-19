'use strict';


(async () => {
    const array = [1, 2, 3]
    // 在父块级上下文中执行执行对循环控制变量的赋值操作，然后再传递给新生成的子块级上下文
    for (let i = 0, j = 0; i < array.length; i++, j = j === 1 ? 0 : j + 1) {
        const element = array[i];
        console.log('element =', element);
        console.log('j=', j);
    }
})();
