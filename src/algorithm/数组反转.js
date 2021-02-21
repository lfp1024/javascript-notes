'use strict';


(async () => {

    function customReverse(originalArr) {
        let leftIndex = 0;
        let rightIndex = originalArr.length - 1;
        while (leftIndex < rightIndex) {
            [originalArr[leftIndex], originalArr[rightIndex]] = [originalArr[rightIndex], originalArr[leftIndex]];
            leftIndex += 1;
            rightIndex -= 1;
        }
        return originalArr;
    }
    const arr = [1, 2, 3];
    const res = customReverse(arr);
    console.log('res = ', res);
})();
