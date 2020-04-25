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
    var linesId = req.body.linesId;
    query(lineApi.addOne,[time, openid, linesId],(addOnErr,addOneRes)=>{
        if(!addOnErr){
            query(lineApi.user_line_check,[openid, linesId],(user_line_checkErr,user_line_checkRes)=>{
                if(user_line_checkErr){
                    res.json({
                        "success": false,
                        "msg": user_line_checkErr
                    });
                }else{
                    if(user_line_checkRes.length>0){
                        queryCountFunc(timeRange, linesId, res, time, addOneRes);
                    }else{
                        query(lineApi.add_user_line,[openid, linesId],(add_user_lineErr,add_user_lineRes)=>{
                            if(add_user_lineErr){
                                res.json({
                                    "success": false,
                                    "msg": add_user_lineErr
                                });
                            }else{
                                queryCountFunc(timeRange, linesId, res, time, addOneRes);
                            }
                        })
                    }
                }
            })
        }else{
            res.json({
                "success": false,
                "msg": addOnErr
            });
        }
    })
})

router.post('/addLine', function(req, res, next) {
    console.log("-------addLine--------" + new Date() + "------"+ new Date().getTime() +"---------------");
    var time = new Date().getTime();
    var openid = req.body.openid;
    var lineName = req.body.lineName;
    query(lineApi.addLine,[lineName, time, openid],(addLineErr, addLineRes)=>{
        if(addLineRes){
            query(lineApi.add_user_line,[openid, linesId],(add_user_lineErr,add_user_lineRes)=>{
                if(add_user_lineErr){
                    res.json({
                        "success": false,
                        "msg": add_user_lineErr
                    });
                }else{
                    res.json({
                        "id": addLineRes.insertId,
                        "lineName": lineName,
                        "time": time,
                        "success": true,
                        "msg": "insert addLine success"
                    });
                }
            })
        }else{
            res.json({
                "success": false,
                "msg": addLineErr
            });
        }
    })
})

router.get('/getUserLineList', function(req, res, next) {
    console.log("-------getUserLineList--------" + new Date() + "------"+ new Date().getTime() +"---------------");
    var openid = req.query.openid;
    query(lineApi.getUserLineList,[openid],(getLineListErr1,getLineListRes)=>{
        if(getLineListRes){
            var returnData = {
                list: getLineListRes,
                listData: getLineListRes.length
            }
            res.json({
                "lines": returnData,
                "success": true,
                "msg": "getLineList success"
            });
        }else{
            res.json({
                "success": false,
                "msg": getLineListErr1
            });
        }
    })
})

router.get('/getTimeRangeCount', function(req, res, next) {
    console.log("-------getTimeRangeCount--------" + new Date() + "------"+ new Date().getTime() +"---------------");
    var linesId = req.query.linesId;
    var timeRange = req.query.timeRange;
    queryCount(timeRange, linesId, (successRes)=>{
        res.json({
            "count": successRes.length,
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

function queryCountFunc(timeRange, linesId, res, time, addOneRes){
    queryCount(timeRange, linesId, (successRes)=>{
        res.json({
            "id": addOneRes.insertId,
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
}

function queryCount(timeRange, linesId, successCallBack,failCallBack){
    var timeStart;
    var timeNow = new Date().getTime();
    timeRange = parseInt(timeRange);
    if(timeRange == 11){
        timeStart = timeRangeList[11];
    }else{
        timeStart = timeNow - timeRangeList[timeRange];
    }
    query(lineApi.getTimeRangeCount,[timeStart, timeNow, linesId],(err1,res1)=>{
        if(res1){
            successCallBack(res1);
        }else{
            failCallBack(err1);
        }
    })
}

module.exports = router;
