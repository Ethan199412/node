const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    const { url } = req
    let file
    if (url == '/') {
        file = fs.readFileSync('./dist/index.html')
        res.end(file.toString())
        return
    }
    if (/^\/dist/.test(url)) {
        
        file = fs.readFileSync('.' + url)
        if (/\.js$/.test(url)) {
            console.log(url)
            res.setHeader('Content-Type', 'text/javascript')
        }
        res.end(file.toString())
        return
    }
}).listen(3001, () => {
    console.log('server running in 3001')
})