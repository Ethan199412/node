var http = require("http");
// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/plain",
// "Access-Control-Allow-Origin": 'http://localhost:3001' });
//     res.end("Hello World11\n" );
//   })
//   .listen(1337, "127.0.0.1");
var server = http.createServer();

var allowOriginList = ["http://localhost:3001", "http://127.0.0.1:3001"];

server.on("request", function (req, res) {
  console.log("receive a request. url is:", req.url);
  if (allowOriginList.includes(req.headers.origin)) {
    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin":req.headers.origin
    });
  }
  console.log(req.url)
  switch(req.url){
    case '/login':
      res.write('login')
      break
    case '/register':
      res.write('register')
      break
    case '/product':
      let data = [{
        name:'apple x',
        price: 3000
      },{
        name:'apple 7',
        price: 2000
      }]
      res.write(JSON.stringify(data))
      break
    default:
      res.write('404')
  }
  //res.write("hello");
  //res.write("world");
  res.end();
});

server.listen(1337, function () {
  console.log("server is running at 127.0.0.1:1337");
});
