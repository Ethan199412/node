import {bar} from './b.mjs';
export function foo() {
  bar();  
  console.log('a foo 执行完毕');
}
foo();