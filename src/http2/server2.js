const port = 3000
const spdy = require('spdy')
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

const options = {
    key: fs.readFileSync(__dirname + '/ssl/key.pem'),
    cert: fs.readFileSync(__dirname + '/ssl/crt.pem')
}

// app.get('/', (req, res) => {
//     res.end('hello from http/2')
// })

app.get('/', (req, res) => {
    var stream = res.push('/test1.js', {
        status: 200, // optional
        method: 'GET', // optional
        request: {
            accept: '*/*'
        },
        response: {
            'content-type': 'application/javascript'
        }
    })
    stream.on('error', function() {})
    stream.end(fs.readFileSync('./public2/test1.js'))

    console.log('[p0.0]', typeof stream, stream)
    res.end(fs.readFileSync('./public2/index.html'))
})

app.use('/', express.static(path.join(__dirname, 'public2')))


spdy
    .createServer(options, app)
    .listen(port, (error) => {
        if (error) {
            console.error(error)
            return process.exit(1)
        } else {
            console.log('Listening on port: ' + port + '.')
        }
    })
