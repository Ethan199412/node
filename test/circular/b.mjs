import {foo} from './a.mjs';
export function bar() {  
  //if (Math.random() > 0.5) {
    foo();
    console.log('b foo 执行完毕')
  //}
}