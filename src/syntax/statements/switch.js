((type) => {

    switch (type) {
        case 'a':
            console.log('type = ', type);
            break;
        default:
            console.log('type = ', type);
            return; // 结束整个方法
    }
    console.log('after return');

})('b')