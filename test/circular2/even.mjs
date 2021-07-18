import {odd} from './odd.mjs';

let counter = 0;
export function even(n){
    counter ++;
    console.log('even',counter,'n',n);

    return n == 0 || odd(n-1);
}

// const { odd } = require('./odd')
// var counter = 0
// exports.even = function (n) {
//     counter++;
//     console.log('even', counter, 'n', n);
//     return n == 0 || odd(n - 1);
// }