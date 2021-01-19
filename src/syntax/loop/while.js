(async () => {
    console.log('start')
    let i = 0
    while (true) { // 阻塞
        i++;
        await new Promise(res => setTimeout(res, 1000 * i)); // 串行
        console.log('i = ', i)
        if (i > 2) break;
    }
    console.log('end')
})()