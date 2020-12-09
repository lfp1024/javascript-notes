function replacer(match, p1, p2, p3, offset, string) {
    console.log(match, p1, p2, p3, offset, string);
    // c12345#$*% c 12345 #$*% 3 ab6c12345#$*%111
    return [p3, p2, p1].join('-');
}
// 整个正则作为一个整体去匹配，而不是每个组单独匹配。（想要匹配哪部分，就安装其格式写正则）
// 做为一个整体匹配后，再分组捕获
var newString = 'ab6c12345#$*%111'.replace(/([^\d]*)(\d*)([^\w]+)/, replacer);
console.log(newString);  // ab6#$*%-12345-c111

