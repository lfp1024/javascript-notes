(async () => {
    await Promise.reject('reject').catch(err => {
        console.log('err =', err);
        return // 只能结束 catch 回调函数
    })
    console.log('after return');
})()