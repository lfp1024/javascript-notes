'use strict'

const define = {
    STUDENT: {
        AGE: 0,
        NAME: 'LFP'
    }
}

Object.freeze(define);
Object.freeze(define.STUDENT); // 只冻结直属属性(浅冻结)，如果属性是对象，则属性的属性的值可以改变

(() => {
    console.log(Object.isFrozen(define));
    define.STUDENT.AGE = 11;
    console.log('age = ', define.STUDENT.AGE);
})()