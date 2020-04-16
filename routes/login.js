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

router.get('/getUserOpenId', function(req, res, next) {
    console.log("-------getUserOpenId--------" + new Date() + "------"+ new Date().getTime() +"------"+ new Date().getTime() +"---------------");
       //拿到前台给的code后，发送请求
       if(req.query.code) {
        let options = {
            method: 'POST',
            url: 'https://api.weixin.qq.com/sns/jscode2session?',
            formData: {
                appid: wxConfig.appId,
                secret: wxConfig.secret,
                js_code: req.query.code,
                grant_type: 'authorization_code'
            }
        };

        request(options, (error, response, body) => {
            //返回值的字符串转JSON
            let _data = JSON.parse(body);
            console.log("---------_data = JSON.parse(body)--------------------");
            console.log(_data);
            if(_data.errcode) { //请求异常时，返回错误信息
                console.log("---------jscode2session------error---------------");
                res.json({
                    "success": false,
                    "code": _data.errcode,
                    "msg": _data.errmsg
                })
            } else {
                console.log("---------jscode2session------success---------------");
                //根据返回值创建token
                let secretOrPrivateKey = "lipei19931006"; // 这是加密的key（密钥） 
                let token = jwt.sign(_data, secretOrPrivateKey, {
                    expiresIn: 60*60*24  // 1小时过期
                });
                console.log("---------token-----------------");
                console.log(token);
                query(userApi.getUserWithOpenid,[_data.openid],(err1,res1)=>{
                    console.log("------getUserWithOpenid-----_data.openid----" + new Date() + "------"+ new Date().getTime() +"---------------");
                    console.log(err1,res1);
                    if(res1.length > 0){
                        query(userApi.updateTokenByOpenid,[token,_data.openid],(err2,res2)=>{
                            console.log("------updateTokenByOpenid-----_data.openid----" + new Date() + "------"+ new Date().getTime() +"---------------");
                            console.log(err2,res2);
                            if(!err2){
                                res.json({
                                    "token":token,
                                    "openid":_data.openid,
                                    "success": true,
                                    "msg": "updateTokenByOpenid success"
                                });
                            }else{
                                res.json({
                                    "success": false,
                                    "msg": err2
                                });
                            }
                        })
                    }else{
                        query(userApi.insertUserTokenAndOpenid,[_data.openid,token],(err2,res2)=>{
                            console.log("------insertUserTokenAndOpenid-----_data.openid----" + new Date() + "------"+ new Date().getTime() +"---------------");
                            console.log(err2,res2);
                            if(!err2){
                                res.json({
                                    "token":token,
                                    "openid":_data.openid,
                                    "success": true,
                                    "msg": "insertUserTokenAndOpenid success"
                                });
                            }else{
                                res.json({
                                    "success": false,
                                    "msg": err2
                                });
                            }
                        })
                    }
                })
            }
        });
    } else {
        res.json({
            "success": false,
            "msg": "params missing"
        });
    }
});

module.exports = router;
