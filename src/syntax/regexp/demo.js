const regexp = /[a-z]+#([A-Z]+#\d{4})/
const str = 'lazada#MY#5474'

console.log(regexp.test(str))
console.log(RegExp.$1)
// true
// 5474

const res = str.match(regexp)
console.log('match res = ', res)

const execRes = regexp.exec(str)[1].replace('#','_')
console.log('exec res = ', execRes)