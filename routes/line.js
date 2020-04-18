var express = require('express');
var router = express.Router();
var query = require('../DB/db');
var lineApi = require('../DB/lineApi');

var lineApi = lineApi.lineApi;
var query = query.query;

var timeRangeList = [60000,300000,600000,1800000,3600000,21600000,43200000,86400000,604800000,2592000000,31536000000,1586867717324];

router.post('/addOne', function(req, res, next) {
    console.log("-------addOne--------" + new Date() + "------"+ new Date().getTime() +"---------------");
    var time = new Date().getTime();
    var openid = req.body.openid;
    var timeRange = req.body.timeRange;
    query(lineApi.addOne,[time, openid],(err1,res1)=>{
        if(res1){
            queryCount(timeRange,(successRes)=>{
                res.json({
                    "id": res1.insertId,
                    "count": successRes.length,
                    "time": time,
                    "success": true,
                    "msg": "insert addOne success"
                });
            },(failRes)=>{
                res.json({
                    "success": false,
                    "msg": failRes
                });
            })
        }else{
            res.json({
                "success": false,
                "msg": err1
            });
        }
    })
})

function queryCount(timeRange,successCallBack,failCallBack){
    var timeStart;
    var timeNow = new Date().getTime();
    timeRange = parseInt(timeRange);
    if(timeRange == 11){
        timeStart = timeRangeList[11];
    }else{
        timeStart = timeNow - timeRangeList[timeRange];
    }
    query(lineApi.getTimeRangeCount,[timeStart, timeNow],(err1,res1)=>{
        if(res1){
            successCallBack(res1);
        }else{
            failCallBack(err1);
        }
    })
}

router.get('/getTimeRangeCount', function(req, res, next) {
    console.log("-------getTimeRangeCount--------" + new Date() + "------"+ new Date().getTime() +"---------------");
    var timeRange = req.query.timeRange;
    queryCount(timeRange,(successRes)=>{
        res.json({
            "count": successRes.length,
            "list": successRes,
            "success": true,
            "msg": "getTimeRangeCount success"
        });
    },(failRes)=>{
        res.json({
            "success": false,
            "msg": failRes
        });
    });
})

module.exports = router;