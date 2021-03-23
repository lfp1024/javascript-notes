const task = function (taskNum, seconds, isRejected) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isRejected)
                reject(new Error('Task ' + taskNum + ' failed!'));
            else
                resolve('Task ' + taskNum + ' succeed!');
        }, seconds * 100)
    });
};

const test1 = async function () {
    const t1 = task(1, 10, false);
    const t2 = task(2, 5, true);
    // await t1;
    await t2;
};

const test2 = async function () {
    const t1 = task(1, 10, false);
    const t2 = task(2, 5, true);
    const promises = [t1, t2]
    for await (const p of promises) {
        //
    }
};

const test3 = async function () {
    const t1 = task(1, 10, false);
    const t2 = task(2, 5, true);
    const promises = [t1, t2]
    await Promise.all(promises)
};

async function run() {
    let res = 'res';
    try {
        // const res = await test1();
        // const res = await test2();
        res =  test1();
        console.log('test res = ', res);
    } catch (err) {
        console.log('======Caught error======', err);
        return 2
    };
    // console.log('test res = ', res);
    // setTimeout(() => {
    //     console.log('test res = ', res);
    // }, 1000);
};

const res = run()
// console.log('run res = ', res);
// setTimeout(() => {
//     console.log('run res = ', res);
// }, 1000);