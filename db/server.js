const http = require('http')
const util = require('util')
const querystring = require('querystring')
const { read, insert } = require('./fileHandler.js')
const POST = 'POST'
http.createServer(function (req, res) {
    const { url } = req

    console.log('url', url)
    switch (url) {
        case '/read':
            function getRead(err, data) {
                if (err) {
                    res.end(err)
                }
                res.end(JSON.stringify(data))
            }
            read(getRead)
            break
        case '/insert':
            if (req.method === POST) {
                let post = ''
                req.on('data', function (chunk) {
                    post += chunk
                })

                req.on('end', function () {
                    console.log('post', post)
                    function postInsert(msg) {
                        res.end(msg)
                    }
                    insert(JSON.parse(post), postInsert)
                    //post = querystring.parse(post)
                    //console.log('post',post)
                })
            }

        //console.log(JSON.parse(post))
        //res.end(util.inspect(post))

        // if (req.method === 'POST') {
        //     function postInsert(msg) {
        //         res.end(msg)
        //     }
        //     insert(dataInserted, postInsert)
        // }
    }
}).listen(3000, function () {
    console.log('server is listening.')
})