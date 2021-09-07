const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {
    const { url } = req
    switch (url) {
        case '/':
            fs.readFile('./index.html', function (err, data) {
                console.log(data.toString())
                res.end(data.toString())
            })
            break
        default:
            console.log('url',url)
            fs.readFile(`.${url}`, function (err, data) {
                //console.log(data.toString())
                if(err){
                    res.end(err)
                }
                res.end(data.toString()) 
            })
            
    }
}).listen(3000, function () {
    console.log('listening on 3000')
})