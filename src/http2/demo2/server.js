const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('../ssl/key.pem'),
  cert: fs.readFileSync('../ssl/crt.pem')
});

server.on('stream', (stream, headers) => {
  if (headers[':path'] === '/sse') {
    stream.respond({
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      'connection': 'keep-alive',
    //   'access-control-allow-origin': '*'
    });

    // 每秒向客户端发送一条消息
    setInterval(() => {
      const data = { message: 'This is a server push message' };
      stream.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 1000);
  } else {
    stream.respond({
      'content-type': 'text/html',
      ':status': 200
    });
    const file = fs.readFileSync('./index.html').toString()
    stream.end(file);
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});