// const regexp = /([a-z]+)#([A-Z]+)#(\d{4})/
// const str = 'lazada#MY#5474z'

// console.log(regexp.test(str))
// console.log(RegExp.$1)
// // true
// // 5474

// const res = str.match(regexp)
// console.log('match res = ', res)

// const execRes = regexp.exec(str)
// console.log('exec res = ', execRes, execRes[3]+'_'+execRes[2])
// console.log(execRes[1]==='lazada')
// console.log(typeof execRes[1])

//----------------match vs exec about g-------------------------

const regexp1 = /([a-z]+)#([A-Z]+)#(\d{4})/;
const str = 'lazada#MY#5474 amazon#VN#1234';

// 未设置 global 标志位，exec 和 match 的返回结果相同，都是返回第一个匹配的结果及捕获组
// console.log('match1 = ', str.match(regexp1), regexp1.lastIndex);
// console.log('exec1 = ', regexp1.exec(str), regexp1.lastIndex);

const regexp2 = /([a-z]+)#([A-Z]+)#(\d{4})/g;
const str2 = 'lazada#MY#5474 amazon#VN#1234';

// 设置 global 标志位（如 /foo/g）
// exec => RegExp 对象是有状态的，会将上次成功匹配后的位置记录在 lastIndex 属性中。exec可通过该属性对单个字符串中的多个匹配结果进行**逐条遍历**（包括捕获到的匹配）
// match => 不会记录上次匹配后的位置，而是返回所有匹配到的结果数组，不返回捕获组
console.log('match2 = ', str2.match(regexp2), regexp2.lastIndex);
console.log('exec2 = ', regexp2.exec(str2), regexp2.lastIndex);
console.log('exec3 = ', regexp2.exec(str2), regexp2.lastIndex); // 遍历第二个