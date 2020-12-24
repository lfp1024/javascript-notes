
function fn() {
    console.log('111');
    const eat = (food) => {
        console.log('eat', food);
    }
    return eat; // 需要返回，外面才能调用
}

const res = fn();
console.log('res = ', res);