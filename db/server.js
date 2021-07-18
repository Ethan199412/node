const http = require('http')
const util = require('util')
const querystring = require('querystring')
const { read, insert, deleteData, update } = require('./fileHandler.js')
const POST = 'POST'
http.createServer(function (req, res) {
    const { url } = req
    console.log('url', url)
    let post = ''
    if (req.method === 'POST') {
        console.log('url', url)

        req.on('data', function (chunk) {
            post += chunk
        })
    }

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
            req.on('end', function () {
                console.log('post', post)
                function postInsert(msg) {
                    res.end(msg)
                }
                insert(JSON.parse(post), postInsert)
                //post = querystring.parse(post)
                //console.log('post',post)
            })
            break;
        case '/delete':
            req.on('end', function () {
                function postDelete(msg) {
                    res.end(msg)
                }
                deleteData(Number(post), postDelete)
            })
            break
        case '/update':
            req.on('end', function(){
                function postUpdate(msg){
                    res.end(msg)
                }
                update(JSON.parse(post), postUpdate)
            })

        //console.log(JSON.parse(post))
        //res.end(util.inspect(post))

        // if (req.method === 'POST') {
        //     function postInsert(msg) {
        //         res.end(msg)
        //     }
        //     insert(dataInserted, postInsert)
        // }
    }
}).listen(3001, function () {
    console.log('server is listening on 3001.')
})