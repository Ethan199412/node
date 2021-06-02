const fs = require('fs')
fs.readFile('./db.json', function (err, data) {
    console.log('[p0]', data.toString())
    let temp = data.toString()
    temp = temp.replace(/[\"\s]/g, '')
    temp = comma2SemiInArray(temp)
    console.log('[p1]', temp)
    console.log('[p2]', getNewObj(temp))
    //console.log('[p2]', objString2Array('周一:3,周二:5,周三:1,周四:6,周五:10'))
    while (temp.indexOf('}') !== -1) {
        temp = comma2SemiInArray(temp)
        let { l, r, subString } = getNewObj(temp)
        console.log('[p4]', l, r)

        if (l === 0) {
            console.log('[p7]', subString)
            temp = objString2Array(subString)
            break
        }
        let leftStr = temp.slice(0, l)
        let rightStr = temp.slice(r + 1, temp.length)

        temp = `${leftStr}${objString2Array(subString)}${rightStr}`
        temp = temp.replace(/[\"\s]/g, '')
        console.log('[temp]', temp)
    }
    console.log('[p3]', temp)
    temp = temp.replace(/\(/g, '{').replace(/\)/g, '}').replace(/;/g, ',').replace(/\@/g, ':').replace(/\"\[/g,'[').replace(/\]\"/g,']')
    console.log('[p6]', temp)
    console.log('[p7]', JSON.parse(temp))
})

function getNewObj(s, type = 'Object') {
    let [leftChar, rightChar] = [undefined, undefined]
    switch (type) {
        case 'Object':
            [leftChar, rightChar] = ['{', '}']
            break
        case 'Array':
            [leftChar, rightChar] = ['[', ']']
            break
    }
    let r = s.indexOf(rightChar)
    if (r === -1) return null
    let i;
    for (i = r; i > 0; i--) {
        if (s[i] === leftChar) break
    }
    return {
        l: i,
        r,
        subString: s.slice(i + 1, r)
    }
}

function big2Small(obj) {
    return JSON.stringify(obj).replace(/{/g, '(').replace(/}/g, ')').replace(/\:/g, '@')
}

function objString2Array(objString) {
    let l = objString.split(',')
    res = []
    for (let i in l) {
        let [key, value] = l[i].split(':')
        // if (!isNaN(Number(value))) {
        //     value = Number(value)
        // }
        if (value[0] === '[') {
            //value = eval(value)
            console.log('[p999999]',value)
        }
        res.push({
            key,
            value
        })
    }
    console.log('[p8]', big2Small(res))
    return big2Small(res)
}

function comma2SemiInArray(s) {
    let stack = []
    needChange = false
    for (let i = 0; i < s.length; i++) {
        //console.log('[p6]',stack,s)
        let char = s[i]
        switch (char) {
            case '[':
                stack.push(char)
                needChange = true
                break
            case ']':
                stack.pop()
                if (stack.length > 0 && stack[stack.length - 2] === '[')
                    needChange = true
                else {
                    needChange = false
                }
                break
            case '{':
                stack.push(char)
                needChange = false
                break
            case '}':
                stack.pop()
                if (stack.length > 0 && stack[stack.length - 2] === '[')
                    needChange = true
                else {
                    needChange = false
                }
                break
            case ',':
                if (needChange) {
                    s = `${s.slice(0, i)};${s.slice(i + 1, s.length)}`
                }
        }
    }
    console.log('[p5]', s)
    return s
}