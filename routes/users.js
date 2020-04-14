var express = require('express');
var userApi = require('../DB/userApi');
var router = express.Router();
var query = require('../DB/db');

var userApi = userApi.userApi;
var query = query.query;


router.get('/getAllUserInfo', function(req, res, next) {
  query(userApi.getALLUser,'',(err1,res1)=>{
    console.log("---------------" + new Date() + "------"+ new Date().getTime() +"---------------");
    console.log(err1,res1);
    res.send(res1);
  })
});

router.post('/saveUserInfo', function(req, res, next) {
  console.log("---------------" + new Date() + "------"+ new Date().getTime() +"---------------");
  if(req.body.nickName && req.body.avatarUrl && req.body.openid){
    var data = req.body;
    var data = [data.nickName,data.openid, data.nickName, data.avatarUrl, data.gender, data.city, data.province, data.country];
    console.log(data);
    query(userApi.saveUserInfo,data,(error,queryRes)=>{
      console.log(error,queryRes);
      res.json({
        "success": true,
        "msg": "insert success"
      });
    })
  }else{
    res.json({
      "success": false,
      "msg": "params missing"
    });
  }
});

module.exports = router;
