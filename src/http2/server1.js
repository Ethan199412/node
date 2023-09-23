const port = 3000
const spdy = require('spdy')      
const fs = require('fs') 
const express = require('express')
const app = express() // https://www.it1352.com/1058471.html
const path = require('path')

const options = {
  cert: fs.readFileSync(path.join(__dirname, './ssl/crt.pem')),
  key: fs.readFileSync(path.join(__dirname, './ssl/key.pem'))
}

app.use('/', express.static(path.join(__dirname, 'public2')))
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
  stream.on('error', function () { })
  stream.end('alert("hello from push stream!");')
  stream.end(fs.readFileSync('./public2/test1.js'))
  res.end(fs.readFileSync('./public2/index.html'))
})
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
