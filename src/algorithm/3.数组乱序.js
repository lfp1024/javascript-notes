
/* 
将一个数组打乱

fisher-yates 算法
将数组从后向前遍历，然后将当前元素与随机位置的元素进行交换
只需要通过一次遍历即可将数组随机打乱顺序
*/


(() => {

    function outOfOrder(arr) {
        let m = arr.length - 1;
        while (m > 0) {
            // 向下取整，最后一个随机数一定是0，自动排除最后一个元素【上面的m本身已经减1，再向下取整，就无法得到最后一个元素的下标。如果不减1，则可取到】
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
    // const res = outOfOrder(arr)
    // console.log(res.toString())


    const newArr = [];
    const len = arr.length;
    for (let j = 0; j < len; j++) {
        newArr.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]); // 两个数组有可能相同
    }
    console.log(newArr);
})()
