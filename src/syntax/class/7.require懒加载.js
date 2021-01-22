'use strict';

const A = require('./6.通过constructor访问');

console.log(typeof A, A instanceof A);
const a = new A();
console.log(typeof a, a instanceof A);

// function false
// object true