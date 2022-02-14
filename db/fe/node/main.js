Array.prototype.mySlice = function (...arg) {
    let start = 0
    let end = this.length
    if (arg[0]) {
        start = arg[0]
    }
    if (arg[1]) {
        end = arg[1]
    }
    console.log('start',start,'end',end,'this',this)
    let newArray = []
    for (i = start; i < end; i++) {
        newArray.push(this[i])
    }
    console.log('newArray', newArray)
    return newArray
}

let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
}
console.log([].mySlice.call(obj))