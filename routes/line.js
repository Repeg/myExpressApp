var express = require('express');
var router = express.Router();
var query = require('../DB/db');
var lineApi = require('../DB/lineApi');

var lineApi = lineApi.lineApi;
var query = query.query;

router.post('/addOne', function(req, res, next) {
    console.log("-------addOne--------" + new Date() + "------"+ new Date().getTime() +"---------------");
    var time = new Date().getTime();
    var openid = req.body.openid;
    query(lineApi.addOne,[time, openid],(err1,res1)=>{
        if(res1){
            res.json({
                "id": res1.insertId,
                "time": time,
                "success": true,
                "msg": "insert addOne success"
            });
        }else{
            res.json({
                "success": false,
                "msg": err1
            });
        }
    })
})

router.get('/getTimeRangeCount', function(req, res, next) {
    console.log("-------getTimeRangeCount--------" + new Date() + "------"+ new Date().getTime() +"---------------");
    var timeRangeList = [60000,300000,600000,1800000,3600000,21600000,43200000,86400000,604800000,2592000000,31536000000,1586867717324];
    var tiemRange = req.query.timeRange;
    var timeNow = new Date().getTime();
    var timeStart;
    if(tiemRange == 11){
        timeStart = timeRangeList[11];
    }else{
        timeStart = timeNow - timeRangeList[tiemRange];
    }
    query(lineApi.getTimeRangeCount,[timeStart, timeNow],(err1,res1)=>{
        if(res1){
            res.json({
                "count": res1.length,
                "list": res1,
                "success": true,
                "msg": "getTimeRangeCount success"
            });
        }else{
            res.json({
                "success": false,
                "msg": err1
            });
        }
    })
})

module.exports = router;