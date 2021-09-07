console.log('b starting');
import { bar } from './a.js';
export const foo = 'foo';
console.log('in a, bar:', bar);
setTimeout(() => {
    console.log('in a, setTimeout bar:', bar);
})
console.log('b done');


module.exports.a = 1

exports = {
    a: 1
}