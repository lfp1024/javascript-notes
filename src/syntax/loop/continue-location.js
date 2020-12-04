((arg) => {
    let s = 5
    for (let i = 0; i < arg; i++) {
        let s = 0;
        if (i > 2) {
            s = 1;
            continue; // 不受 {} 影响，直接跳到下一个循环
        };
        console.log('s=', s)
    }
    console.log('s wai = ',s)
})(5)