var http = require('http');

var sessions = {};
var session_id = 'session_id';
var EXPIRES = 20 * 60 * 1000;	//过期时长

http.createServer(function (req, res) {
    req.cookies = parseCookie(req.headers.cookie);	//解析客户端的cookie，,暂存在req.cookies上
    console.log('[p0] cookies', req.cookies)

    // 拿出session_id 的值
    var id = req.cookies[session_id];  //取出每个用户唯一的id口令, session_id 是放在 cookie 里的
    console.log('[p1] id', id)
    //更新session状态
    if (!id) {
        req.session = generate();  //生成新的session
    }
    else {
        var session = sessions[id]; //从全局sessions中取出对应id的session，判断session状态
        if (session) {
            if (session.cookie.expire > (new Date()).getTime()) {
                //更新超时时间，延长的更长了，比如用户又一次登录就要重新更新过期时间，老登陆，就老不过期。
                session.cookie.expire = (new Date()).getTime() + EXPIRES;
                req.session = session;
            }
            else {
                //超时了，删除旧的数据，重新生成
                delete sessions[id];
                req.session = generate();
            }
        }
        else {
            //sessions中不存在该id的session（id口令匹配错误或客户端保存着id，但服务器端因超时导致session已取消）,重新生成
            req.session = generate();
        }
    }

    //业务处理，返回客户端
    handle(req, res);

}).listen(8888, function () {
    console.log('listening on 8888')
});


//生成新的session,并存储于sessions
var generate = function () {
    // session 的本质是一个对象
    var session = {};
    session.id = (new Date()).getTime() + Math.random();  //id为当前时间加上随机值
    session.cookie = {
        expire: (new Date()).getTime() + EXPIRES //cookie为当前时间加上超时时长
    };
    sessions[session.id] = session;
    return session;  //返回当前新建的session
};

//业务处理
var handle = function (req, res) {
    if (!req.session.isVisit) {
        sessions[req.session.id].isVisit = true;	//修改服务器相应的session状态
        res.setHeader('Set-Cookie', serialize(session_id, req.session.id));  //头部写入session的id
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.end("<h1>第一次登陆</h1>");
    }
    else {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.end('<h1>再次登陆</h1>');
    }
}

//解析客户端传来的cookie
var parseCookie = function (cookie) {
    var cookies = {};
    if (!cookie) { //为空，返回cookies
        return cookies;
    }
    //存在cookie，则解析客户端的cookie，存储于cookies给服务端使用
    var list = cookie.split(';'); //将Cookie值：session_id1=value; session_id2=value2转变为数组的形式
    for (var i = 0; i < list.length; i++) {
        var pair = list[i].split('=');
        cookies[pair[0].trim()] = pair[1].trim();//trim用于删除字符串头尾的空格
    }
    return cookies;
}

//格式化cookie
var serialize = function (name, val, opt) {
    var pairs = [name + '=' + encodeURIComponent(val)];
    opt = opt || {};

    if (opt.path) pair.push('Path=' + opt.path);	//还可以设置其他选项Domain、Expires等
    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge); //告诉浏览器多久后过期
    return pairs.join(';');  //将数组拼接成用分号连接的字符串
}
