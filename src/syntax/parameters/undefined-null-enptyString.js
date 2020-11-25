((param) => {
    console.log('param = ', param, 'type: ' + typeof param);
    // !== 用或连接，从左往右，不等于其中一个值即可
    // 如果param = undefined，条件也会成立，输出 valid1
    if (param !== null || param !== undefined || param !== '') {
        console.log('valid1');
    } else {
        console.log('invalid1')
    }

    // !== 用且连接，从左往右，必须所有条件都成立
    if (param !== null && param !== undefined && param !== '') {
        console.log('valid2');
    } else {
        console.log('invalid2')
    }

    // 排除 0, NaN, null, undefined, '', void 0
    if (!param) {
        console.log('invalid3');
    } else {
        console.log('valid3')
    }

    // 不排除 0, 0可能是有效值
    if (!param && param !== 0) {
        console.log('invalid4');
    } else {
        console.log('valid4')
    }

})(0)

// param =  0 type: number
// valid1
// valid2
// invalid3
// valid4