(() => {
    console.log('start')
    let i = 0
    while (true) {
        i++;
        console.log('i = ', i)
        if (i > 2) break;
    }
    console.log('end')
})()