const express = require('express');

const route = express.Router();

var users = [
    {id:1,loginName:"zs",password:"12346"},
    {id:2,loginName:"ls",password:"12346"},

];
var position = {
    jd: 100.254,
    wd: 845.124
}
    

route.post("/api/login",function(req,res,next){
    // body实体，它后面的变量名称对应ajax请求时的传递的数据
    // 起不了作用，是没有加入管线来解析,这个代码是在运行的index.js中添加管线
    var loginName = req.body.loginName;
    var password = req.body.password;
    if(!loginName || !password){
        res.json({
            code:201,
            message:"账号和密码不能为空"
        })
        // 记住return
        return;
    }
    var index = users.findIndex(function(v){
        // console.log(v);
        return v.loginName === loginName && v.password === password;
    })
    if(index == -1){
        res.json({
            code:202,
            message:"用户名或者密码出错!"
        })
        return;
    }


    console.log(loginName);
    res.json({
        code:200,
        message:"登陆成功"
    })
})
// get数据传递是明文的
route.post("/api/qd",function(req,res,next){
    // || 当前者有值，则使用前者的值，如果没值，则使用后者的值
    var jd = req.body.jd || 0;
    var wd = req.body.wd || 0;

    var distince = Math.sqrt( Math.pow(jd - position.jd, 2) + Math.pow(wd - position.wd, 2));
    /* if(distince < 100){
        res.json({
            code:200,
            message:"签到成功"
        })
    }else{
        res.json({
            code:201,
            message:"签到不成功"
        })
    } */
    distince < 100 ? res.json({
        code:200,
            message:"签到成功"
    }) : res.json({
        code:201,
        message:"签到不成功"
    })
})

route.post("/api/register",function(req,res,next){
    var accountR = req.body.accountR || 0;
    var passwordR = req.body.passwordR || 0;
    var passwordRAgain = req.body.passwordRAgain || 0;
    if(!accountR || !passwordR || !passwordRAgain){
        res.json({
            code:201,
            message:"账号和密码不能为空"
        })
        return;
    }
    var index = users.findIndex(function(v){
        return v.loginName === accountR;
    })
    if(index > -1){
        res.json({
            code:202,
            message:"您注册的账号已经存在"
        })
        return;
    }
    //Cannot set headers after they are sent to the client 出现这个错误主要就是讲res.json({})写到了else中，而if没有进行return结束，造成重复调用造成崩溃
    if(passwordR != passwordRAgain){
        res.json({
            code:203,
            message:"密码不一致"
        })
        return;
    }else{
        console.log("密码一致"+passwordR+"--"+passwordRAgain);
       
        // 当往json数组中添加数据时，若变量一样的话，只写一个loginName，若变量不一样的loginName : accountR的格式，键:值
        users.push({
            id:users.length+1,
            loginName : accountR,
            password : passwordRAgain
        })  
        console.log("json数组长度"+users.length);
    }
    res.json({
        code:200,
        message:"注册成功"
    })

})

module.exports = route;