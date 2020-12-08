((type) => {

    // switch (type) {
    //     case 'a':
    //         console.log('type = ', type);
    //         break;
    //     default:
    //         console.log('type = ', type);
    //         return; // 结束整个方法
    // }
    // console.log('after return');

    switch (type) {
        case 'a':   // 也会走到 case 'b'
        case 'b':
            console.log('type = ', type);
            break;
        default:
            console.log('no');
            break;
    }

})('b')