// 这是一个反射型 xss 攻击案例，黑客提供给你一个链接让你去点击
// http://localhost:3000/?xss=%3Cscript%3Ealert(%27%E4%BD%A0%E8%A2%ABxss%E6%94%BB%E5%87%BB%E4%BA%86%27)%3C/script%3E
const express = require('express');
// const ejs = require('ejs')
const app = express();

//指定模板引擎
app.set("view engine", 'ejs');
//指定模板位置
app.set('views', __dirname + '/views');

/* GET home page. */
app.get('/', function (req, res, next) {
    res.render('index.ejs', { title: 'Express', xss: req.query.xss });
});

app.get('/health', function (req, res, next) {
    res.send('health')
});

app.listen(3000, function () {
    console.log("请在浏览器访问：http://localhost:3000/");
});

