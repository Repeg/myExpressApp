var express = require('express');
var userApi = require('../DB/userApi');
var router = express.Router();
var query = require('../DB/db');
const { logInfo } = require('../util');

var userApi = userApi.userApi;
var query = query.query;


router.get('/getAllUserInfo', function(req, res, next) {
  query(userApi.getALLUser, '',(err1,res1)=>{
    // logInfo();
    console.log(err1,res1);
    res.send(res1);
  })
});

router.get('/getUserWithId', function(req, res, next) {
  query(userApi.getUserWithId, req.body.id, (err1, res1)=>{
    // logInfo();
    console.log(err1,res1);
    res.send(res1);
  })
});

router.post('/addTag', function(req, res, next) {
  const params = [req.body.userId, req.body.tagId]
  query(userApi.addTag, params, (err1, res1)=>{
    // logInfo();
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
  // logInfo();
  try {
      const params = [req.body.userName, req.body.avatar, parseInt(req.body.level)];
      console.log(params)
      query(userApi.saveUserInfo, params, (err1,res1)=>{
        // logInfo();
        console.log(err1,res1);
        res.send(res1);
      })
  } catch (error) {
    res.json({
      "success": false,
      "msg": error
    });
  }
});

module.exports = router;
