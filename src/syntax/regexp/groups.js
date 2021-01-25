'use strict';


(async () => {
    const reg = /#(?<site>[A-Z]*)/;
    const str = 'amazon#US#123';
    const site = reg.exec(str).groups.site;
    console.log('site = ', site, typeof site);
})();

// 具名捕获的结果，可以通过groups对象获取指定的属性
// site =  [
//     '#US',
//     'US',
//     index: 6,
//     input: 'amazon#US#123',
//     groups: [Object: null prototype] { site: 'US' }
//   ]