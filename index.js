const express = require('express');
// path是node自带的模块，不需要安装
// path对象主要控制和路径相关的API
const path = require('path');
const user = require('./router/user');
const app = express();

// 管道顺序之分

// app.use(express.static('public'));
// .join()方法用于连接路径，__dirname总是指向被执行js文件的绝对路径
app.use(express.static(path.join(__dirname, "public")));
// urlencoded用来解析客户端传递的数据，格式: ?loginName = lk&&password = 123,称为查询字符串
app.use(express.urlencoded({extended:false}));
// json()用来解析JSON格式的字面量对象数据
app.use(express.json());
app.use(user);


app.listen(8000,function(){
    console.log("服务已启动，请访问：http://localhost:8000");
});