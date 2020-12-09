var str = 'hi see Chapter 3.4.5.1';
var re = /see (chapter \d+(\.\d)*)/gi;
var found = str.match(re);

console.log(found);

