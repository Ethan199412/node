'use strict'
const fs = require('fs') 
const path = require('path')
const http2 = require('http2')
const helper = require('./helper')

const PORT = process.env.PORT || 3000
const PUBLIC_PATH = path.join(__dirname, './public')
console.log('[p0.2]',PUBLIC_PATH)
const publicFiles = helper.getFiles(PUBLIC_PATH)

// 读取证书
const options = {
  cert: fs.readFileSync('./ssl/crt.pem').toString(),
  key: fs.readFileSync('./ssl/key.pem').toString()
}

// 创建HTTP2服务器 
const server = http2.createSecureServer(options, onRequest)
// Request 事件
function onRequest(req, res) {
  // 路径指向 index.html
  const reqPath = req.url === '/' ? '/index.html' : req.url
  //获取html资源
  const file = publicFiles.get(reqPath)
  // 文件不存在
  if (!file) {
    res.statusCode = 404
    res.end()
    return
  }
  res.stream.respondWithFD(file.fileDescriptor, file.headers)
}
server.listen(PORT)
