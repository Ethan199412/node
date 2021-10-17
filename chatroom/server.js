const http = require('http')
const fs = require('fs')
const template = require('art-template')
const URL = require('url')

let global = {};

fs.readFile('./data/data.json', (err, data) => {
    global.listData = JSON.parse(data).list
    console.log('[p5] listData', global.listData)
})

http.createServer(function (req, res) {
    const url = req.url
    console.log('[p3]', url)
    res.setHeader('Content-Type', 'text/html;charset=UTF-8')
    switch (url) {
        case '/':
            fs.readFile('./index.html', function (err, data) {
                if (err) {
                    res.end('error')
                }
                res.end(data)
            })
            break
        case '/comment':
            fs.readFile('./comment.html', (err, data) => {
                if (err) {
                    res.end('error')
                }
                else {
                    res.end(data)
                }
            })
            break
        // case './handle-comment':
        //     const obj = URL.parse(url)
        //     res.end(JSON.stringify(obj))
        //     break
        case '/data':
            fs.readFile('./data/data.json', function (err, data) {
                if (err) {
                    res.end('data not found')
                }
                res.end(data)
            })
            break
        case '/test-template':
            fs.readdir('./', function (err, files) {
                console.log('files', files)
                res.end(files.toString())
                //res.end(files)
            })

            break
        default:
            console.log('[p4] default')
            if (/^\/public/.test(url)) {
                console.log('[url]', url)
                if (/^\/public\/template/.test(url)) {
                    fs.readFile(`.${url}`, function (err, html) {
                        if (err) {
                            res.end('template err', err)
                        } else {

                            const htmlStr = template.render(html.toString(), {
                                title: '聊天室',
                                listData: global.listData
                            })
                            res.end(htmlStr)

                        }
                    })
                }


                else {
                    fs.readFile(`.${url}`, function (err, data) {
                        if (err) {
                            res.end('read public files error')
                        } else {
                            res.end(data)
                        }
                    })
                }
            }
            else if (/^\/handle-comment/.test(url)) {

                const obj = URL.parse(url)
                console.log('[p2]', obj)
                let [name, comment] = obj.query.split('&')
                newComment = {
                    name: name.split('=')[1],
                    comment: comment.split('=')[1]
                }
                //res.end(JSON.stringify(newComment))
                global.listData.push(newComment)
                console.log('[p6]',global.listData)
                res.statusCode=302
                res.setHeader('Location','/public/template/template.html')
                res.end('') 
                break
            }
            else {
                res.end('404 not found!')
            }

    }

}).listen(3000, function () {
    console.log('server is starting')
})