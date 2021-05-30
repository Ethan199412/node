const http = require('http')
const fs = require('fs')
const template = require('art-template')
http.createServer(function (req, res) {
    const url = req.url
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
            if (/^\/public/.test(url)) {
                console.log('[url]', url)
                if (/^\/public\/template/.test(url)) {
                    fs.readFile(`.${url}`, function (err, data) {
                        if (err) {
                            res.end('template err',err)
                        } else {
                            const htmlStr = template.render(data.toString(), {
                                title: '哈哈'
                            })
                            res.end(htmlStr)
                        }
                    })
                } else {
                    fs.readFile(`.${url}`, function (err, data) {
                        if (err) {
                            res.end('read public files error')
                        } else {
                            res.end(data)
                        }
                    })
                }
            } else {
                res.end('404 not found!')
            }

    }

}).listen(3000, function () {
    console.log('server is starting')
})