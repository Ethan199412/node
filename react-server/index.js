const http = require('http')
const fs = require('fs')
const a = require('a')

const server = http.createServer(function (req, res) {
    const { url } = req
    switch (url) {
        case '/':
            fs.readFile('./index.html', function (err, data) {
                res.end(data)
                return
            })
            break
        case '/data':
            console.log('[p0] data',req.headers)
            res.end(JSON.stringify({
                name:'liming',
                age:15
            }))
    }
    if(/^\/js/.test(url)){
        fs.readFile(`.${url}`,function(err,data){
            res.end(data)
            return
        })
    }
}).listen(3000,function(){
    console.log('server starting')
})