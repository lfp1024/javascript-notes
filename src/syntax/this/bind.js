function Men(hobby1, hobby2) { // 函数本身支持多参数
    console.log('this.name', this.name); // 函数中直接调用this
    console.log('this.age', this.age);
    console.log('Men hobby = ', hobby1, hobby2);
}

const boy = { name: 'lfo', age: 22 }
const bindTest = Men.bind(boy, 'run'); // 设置默认参数

const girl = { name: 'xx', age: 33 };
girl.run = bindTest;
girl.run('walk'); // 调用时传递的参数