// exports.finished = false;
// var b = require('./b')
// console.log('in a.js, has b finished?', b.finished)
// exports.finished = true;
// console.log('a finish')
//import {bar} from './b.mjs';
const { bar } = require('./b.js')
module.exports = {
  foo() {
    bar();
    console.log('a foo 执行完毕');
  }
}
foo();