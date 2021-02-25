function test(boy, info) {
    // return function (info) {
    //     console.log('info = ', info);
    //     console.log('this.name = ', this.name);
    // }.bind(boy)(info)

    // return function (info) {
    //     console.log('info = ', info);
    //     console.log('this.name = ', this.name);
    // }.call(boy, info);

    console.log('info = ', info);
    console.log('this.name = ', boy.name);
}

const res = test({ name: "lfo" }, { hobby: "run" });
console.log('res = ', res);