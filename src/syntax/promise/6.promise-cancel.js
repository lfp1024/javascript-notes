/* 
promise 有哪些缺点


*/

function wrap(p1) {
    let abort
    // 手动控制结束的promise，配合 Promise.race 丢弃其他promise的返回结果
    let p2 = new Promise((res, rej) => {
        abort = () => {
            rej("Fail 1")
        }
    })
    let p = Promise.race([p1, p2])
    p.abort = abort
    return p
}

let p = wrap(
    // 这个是需要超时中断的 promise
    new Promise((res, rej) => {
        setTimeout(() => {
            res("请求成功了")
        }, 3000);
    })
)

p.then((result) => { console.log("result = ", result) }, (reason) => { console.log("Fail 2", reason) })
// 这里是手动结束promise，丢弃被包装的promise的返回结果。但是promise中的操作依然继续，只是我们不要它的结果
p.abort()






// 定义上传文件接口函数
export const uploadFile = (params) => {
    let uri = serverSrc + '/api/xxx/xxx' // 设置请求地址
    return Promise.race([
        uploadFilePromise(uri, params),
        uploadFileTimeout(10000) // 10秒超时
    ])
}
// 定义请求接口函数
function uploadFilePromise(uri, params) {
    return new Promise(function (resolve, reject) {
        axios.post(uri, params, {
            headers: { 'Content-Type': 'multipart/form-data' }, // 以formData形式上传文件
            withCredentials: true
        }).then(response => {
            if ((response.data.code !== '200' && response.data.code !== 200) && response.data.msg !== '') {
                // console.log('上传文件出错!')
                reject(response.data)
            }
            resolve(response.data.result)
        })
    })
}


// 定义超时函数
function uploadFileTimeout(ms) {
    let delayInfo = {
        timeoutMsg: '上传文件超时'
    }
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            reject(delayInfo)
        }, ms)
    })
}