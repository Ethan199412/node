const http = require('http')
const util = require('util')
const querystring = require('querystring')
const { read, insert, deleteData, update } = require('./fileHandler.js')
const { find, save, deleteDataDb, updateDb } = require('./fileHandlerDb.js')
const POST = 'POST'
http.createServer(function (req, res) {
    const { url } = req

    let post = ''
    if (req.method === 'POST') {
        req.on('data', function (chunk) {
            post += chunk
        })
    }

    switch (url) {
        case '/read':
            function getRead({ err, data }) {
                if (err) {
                    res.end(err)
                }
                res.end(JSON.stringify(data))
            }
            find(getRead)
            break
        case '/insert':
            req.on('end', function () {
                console.log('post', post)
                function postInsert(obj) {
                    res.end(JSON.stringify(obj))
                }
                save(JSON.parse(post), postInsert)
            })
            break;
        case '/delete':
            req.on('end', function () {
                function postDelete(obj) {
                    res.end(JSON.stringify(obj))
                }
                console.log('[p0] post', post)
                deleteDataDb(post, postDelete)
            })
            break
        case '/update':
            req.on('end', function () {
                function postUpdate(obj) {
                    res.end(JSON.stringify(obj))
                }
                let obj = JSON.parse(post)
                updateDb(obj._id, obj, postUpdate)
            })
    }
}).listen(3001, function () {
    console.log('server is listening on 3001.')
})