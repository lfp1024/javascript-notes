
/* 
将一个数组打乱

fisher-yates 算法
将数组从后向前遍历，然后将当前元素与随机位置的元素进行交换
只需要通过一次遍历即可将数组随机打乱顺序
*/


(() => {

    function outOfOrder(arr: number[]) {
        let m = arr.length - 1;
        while (m > 0) {
            // 向下取整，自动排除最后一个元素，最后一个随机数一定是0
            const randomIndex = Math.floor(Math.random() * m);
            console.log(`index is ${randomIndex}`);
            // 随机位置的元素arr[index] 跟 当前元素arr[m] 交换
            [arr[m], arr[randomIndex]] = [arr[randomIndex], arr[m]]
            // const tmp = arr[m];
            // arr[m] = arr[index];
            // arr[index] = tmp;
            m--;
        }
        return arr;
    }

    const arr = [1, 2, 3, 4]
    const res = outOfOrder(arr)
    console.log(res.toString())
})()
