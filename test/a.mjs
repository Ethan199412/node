// let count = 0
// let add = () => {
//     count += 1
// }
// export {
//     add,
//     count
// }


function add(a, b, c) {
    return a + b + c
}

function currying(add) {
    return function addc(...arg) {
        if (arg.length >= 3) {
            return add(...arg)
        } else {
            return function (...arg1) {
                return addc(...arg.concat(arg1))
            }
        }
    }
}
let addc = currying(add)
console.log(addc(1,3))