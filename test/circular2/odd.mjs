import {even} from './even.mjs';

console.log('this is odd')
export function odd(n){
    return n != 0 && even(n-1);
}

// const { even } = require('./even');

// console.log('this is odd')
// exports.odd = function (n) {
//     return n != 0 && even(n - 1);
// }