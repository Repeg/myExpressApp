var express = require('express');
var router = express.Router();
var query = require('../DB/db');
var picApi = require('../DB/picApi');
const request = require('request');

var picApi = picApi.picApi;
var query = query.query;

router.get('/getPic', function(req, res, next) {
    console.log("-------getPic--------" + new Date() + "------"+ new Date().getTime() +"---------------");
    let options = {
        method: 'GET',
        url: 'https://api.66mz8.com/api/rand.tbimg.php?format=json',
        formData: {}
    };

    request(options, (error, response, body) => {
        //返回值的字符串转JSON
        let _data = JSON.parse(body);
        console.log("---------_data = JSON.parse(body)--------------------");
        console.log(_data);
        var time = new Date().getTime();
        var picUrl = _data.pic_url;
        query(picApi.addOne,[time, picUrl],(addOnErr,addOneRes)=>{
            if(!addOnErr){
                res.json({
                    "pic_url": picUrl,
                    "success": true,
                    "msg": "getPic success"
                });
            }else{
                res.json({
                    "success": false,
                    "msg": addOnErr
                });
            }
        })
    })
})

module.exports = router;