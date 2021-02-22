'use strict';


(async () => {
    const obj = {
        name: 'lfo',
        age: 11,
        gf: {
            name: 'xx',
            age: 12,
        }
    };

    for (let [key, value] of Object.entries(obj)) {
        if (typeof value !== 'object') value += 1;
        else value.age += 1;
        console.log(`${key}: ${JSON.stringify(value)}`);
    }

    console.log(obj);
})();

// name: "lfo1"
// age: 12
// gf: {"name":"xx","age":13}
// { name: 'lfo', age: 11, gf: { name: 'xx', age: 13 } }