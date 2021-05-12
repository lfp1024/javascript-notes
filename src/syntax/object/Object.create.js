'use strict';


(async () => {
    // Shape - 父类(superclass)
    function Shape() {
        this.x = 0;
        this.y = 0;
    }

    // 父类的方法
    Shape.prototype.move = function (x, y) {
        this.x += x;
        this.y += y;
        console.info('Shape moved.');
    };

    // Rectangle - 子类(subclass)
    function Rectangle() {
        Shape.call(this); // call super constructor.
    }

    // 子类续承父类
    Rectangle.prototype = Object.create(Shape.prototype);
    // 需要指定子类原型的constructor属性，使其指向子类自身，否则会沿原型链查找，最终指向父类自身
    // Rectangle.prototype.constructor = Rectangle;
    console.log('Rectangle.prototype.constructor = ', Rectangle.prototype.constructor);

    var rect = new Rectangle();

    console.log('Is rect an instance of Rectangle?',
        rect instanceof Rectangle); // true
    console.log('Is rect an instance of Shape?',
        rect instanceof Shape); // true
    rect.move(1, 1); // Outputs, 'Shape moved.

})();
