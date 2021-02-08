function Person(name, age) {
    // this.name = name;
    // this.age = age;
    console.log('person', this);
}

function Men(name, age) {
    // Person.call(this, name, age); // 执行Person函数,this指向Men, 如果Person函数中有对this做操作,那么就会传递到Men的实例men中
    console.log('men', this); // 在执行Men中this操作之前,已经继承了Person中对this的操作
    this.name = name; // 如果Person和Men操作同一个变量,则会被覆盖
    this.age = 20;
    console.log('men', this);
}


(() => {
    const men = new Men('lfo', 19);
    console.log('men = ', men);
})();

// person Men { name: 'lfo', age: 19 }
// men Men { name: 'lfo', age: 19 }
// men Men { name: 'lfo', age: 20 }
// men =  Men { name: 'lfo', age: 20 }