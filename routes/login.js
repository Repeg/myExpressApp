var express = require('express');
var userApi = require('../DB/userApi');
var router = express.Router();
var query = require('../DB/db');
var wxConfig = require('../config');
const request = require('request');
var jwt = require("jsonwebtoken");

wxConfig = wxConfig.config.wxConfig;
var userApi = userApi.userApi;
var query = query.query;

router.post('/getUserOpenId', function(req, res, next) {
    console.log("-------getUserOpenId--------" + new Date() + "---------------");
       //拿到前台给的code后，发送请求
       if(req.body.code) {
        let options = {
            method: 'POST',
            url: 'https://api.weixin.qq.com/sns/jscode2session?',
            formData: {
                appid: wxConfig.appId,
                secret: wxConfig.secret,
                js_code: req.body.code,
                grant_type: 'authorization_code'
            }
        };

        request(options, (error, response, body) => {
            if(error) { //请求异常时，返回错误信息
                console.log("---------jscode2session------error---------------");
                console.log(error);
                res.json({
                    "status": "error",
                    "code": ""
                })
            } else {
                //返回值的字符串转JSON
                let _data = JSON.parse(body);
                console.log("---------_data = JSON.parse(body)--------------------");
                console.log(_data);

                //根据返回值创建token
                let secretOrPrivateKey = "lipei19931006"; // 这是加密的key（密钥） 
                let token = jwt.sign(_data, secretOrPrivateKey, {
                    expiresIn: 60*60*24  // 1小时过期
                });
                var users = [];
                query(userApi.getALLUser,'',(err1,res1)=>{
                    console.log("------getALLUser---------" + new Date() + "---------------");
                    console.log(err1,res1);
                    users = res1;
                    users.count({
                        "openid": _data.openid
                    }, (err, result) => {
                        //当数据库中没有该openid时，插入。
                        if(result == 0) {
                            users.insert({
                                "openid": _data.openid,
                                "localToken": _l,
                                "serverToken": _s
                            }, (err, result) => {
                                res.json({
                                    "status": "ok",
                                    "token": _l
                                });
                                client.close();
    
                            })
                        };
                        //当数据库中查询到openid时，更新token
                        if(result != 0) {
                            users.update({
                                "openid": _data.openid
                            }, {
                                $set: {
                                    "localToken": _l,
                                    "serverToken": _s
                                }
                            }, (err, result) => {
                                if(err) {
                                    res.json({
                                        "status": "error",
                                        "code": "0003"
                                    });
                                    client.close();
                                } else {
                                    res.json({
                                        "status": "ok",
                                        "token": _l
                                    });
                                    client.close();
                                }
                            })
                        }
                    })
                })
            }
        });
    } else {
        res.json({
            "status": "error",
            "code": "0004"
        });
    }
});

module.exports = router;
