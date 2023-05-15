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

// router.post('/saveUserInfo', function(req, res, next) {
//   console.log("---------------" + new Date() + "------"+ new Date().getTime() +"---------------");
//   if(req.body.nickName && req.body.avatarUrl && req.body.openid){
//     var data = req.body;
//     query(userApi.getUserWithOpenid,[req.body.openid],(err1,res1)=>{
//       console.log("---------saveUserInfo----getUserWithOpenid---openid-" + req.body.openid + "----" + new Date() + "------"+ new Date().getTime() +"---------------");
//       console.log(err1,res1);
//       if(err1){
//         res.json({
//           "success": false,
//           "msg": err1
//         });
//       }else{
//         var msg = 'new';
//         var api = userApi.saveUserInfo;
//         var queryData = [data.openid, data.nickName, data.nickName, data.avatarUrl, data.gender, data.city, data.province, data.country];
//         if(res1.length > 0){
//           api = userApi.updateUserInfo;
//           queryData = [data.nickName, data.nickName, data.avatarUrl, data.gender, data.city, data.province, data.country, data.openid];
//           msg = "";
//         }
//         query(api,queryData,(error,queryRes)=>{
//           console.log(error,queryRes);
//           if(error){
//             res.json({
//               "success": false,
//               "msg": error
//             });
//           }else{
//             res.json({
//               "success": true,
//               "msg": "saveUserInfo success " + msg
//             });
//           }
//         })
//       }
//     })
//   }else{
//     res.json({
//       "success": false,
//       "msg": "params missing"
//     });
//   }
// });
router.post('/saveUserInfo', function(req, res, next) {
  console.log("---------------" + new Date() + "------"+ new Date().getTime() +"---------------");
  if(req.body.userName && req.body.avatar){
    var data = req.body;
    query(userApi.getUserWithOpenid,[req.body.openid],(err1,res1)=>{
      console.log("---------saveUserInfo----getUserWithOpenid---openid-" + req.body.openid + "----" + new Date() + "------"+ new Date().getTime() +"---------------");
      console.log(err1,res1);
      if(err1){
        res.json({
          "success": false,
          "msg": err1
        });
      }else{
        var msg = 'new';
        var api = userApi.saveUserInfo;
        var queryData = [data.openid, data.nickName, data.nickName, data.avatarUrl, data.gender, data.city, data.province, data.country];
        if(res1.length > 0){
          api = userApi.updateUserInfo;
          queryData = [data.nickName, data.nickName, data.avatarUrl, data.gender, data.city, data.province, data.country, data.openid];
          msg = "";
        }
        query(api,queryData,(error,queryRes)=>{
          console.log(error,queryRes);
          if(error){
            res.json({
              "success": false,
              "msg": error
            });
          }else{
            res.json({
              "success": true,
              "msg": "saveUserInfo success " + msg
            });
          }
        })
      }
    })
  }else{
    res.json({
      "success": false,
      "msg": "params missing"
    });
  }
});

module.exports = router;
