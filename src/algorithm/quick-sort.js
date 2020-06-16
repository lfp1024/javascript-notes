function quickSort(arr, start, end) {
    if (start < end) {
        //基准点
        let pivot = arr[start]
        //一次排序后基准点的位置，一轮排序后左边都比基准点小，右边都比基准点大
        let pivotPosition = portion(arr, start, end, pivot)
        //左表递归
        quickSort(arr, start, pivotPosition - 1)
        //右表递归
        quickSort(arr, pivotPosition + 1, end)
    }
}

function portion(targetArr, start, end, pivot) {

    while (start < end) {
        //大于等于基准的元素放在右边
        while (start < end && targetArr[end] >= pivot) {
            end--
        }
        targetArr[start] = targetArr[end]

        //小于基准的元素放在右边
        while (start < end && targetArr[start] < pivot) {
            start++
        }
        targetArr[end] = targetArr[start]
        // 一轮结束，调换了2个元素的位置，继续下一轮
    }
    //把被覆盖的基准点重新赋给下标为s的元素
    targetArr[start] = pivot
    // console.log("start = ", start)
    //返回下标s，即划分左右表的临界点
    return start
}

let myarr = [49, 38, 65, 97, 76, 13, 27];
quickSort(myarr, 0, myarr.length - 1);
console.log(myarr.toString())