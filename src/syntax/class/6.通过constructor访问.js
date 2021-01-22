'use strict';

class CalledByConstructor {

    get sequelize() {
        // console.log('1111111', this.constructor.sequelize, this.sequelize);
        return this.constructor.sequelize;
    }

    constructor() {

    }

    static init(sequelize) {
        this.sequelize = sequelize
    }

    static test() {
        console.log(this.sequelize);
        console.log(this.constructor.sequelize);
    }
}

module.exports = CalledByConstructor;

// CalledByConstructor.init('Sushant');
// CalledByConstructor.test();
// const c = new CalledByConstructor();
// console.log(c.sequelize);
