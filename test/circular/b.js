// exports.finished = false;
// var a = require('./a')
// console.log('in b.js, has a finished?', a.finished)
// exports.finished = true;
// console.log('b finish')
const {foo} =require( './a.js');
exports.bar = function bar() {  
  //if (Math.random() > 0.5) {
    foo();
    console.log('b foo 执行完毕')
  //}
}