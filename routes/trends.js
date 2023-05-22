var express = require('express');
var trendsApi = require('../DB/trends');
var router = express.Router();
var query = require('../DB/db');
const { logInfo } = require('../util');

var trendsApi = trendsApi.trendsApi;
var query = query.query;

router.post('/create', function(req, res, next) {
    const data = req.body;
    const params = [data.content, data.userId, data.type];
    try {
        query(trendsApi.createUserTrends, params,(trendsErr, trendsInfo)=>{
            // logInfo();
            const logParams = [data.userId, trendsInfo.insertId];
            query(trendsApi.createUserTrendsLog, logParams,(err1,res1)=>{
                res.send(trendsInfo);
            })
        })
    } catch (error) {
        res.send(error);
    }
});

router.post('/update', function(req, res, next) {
    const data = req.body;
    const params = [data.content, data.type, data.userId];
    try {
        query(trendsApi.updateUserTrends, params,(trendsErr, trendsInfo)=>{
            // logInfo();
            res.send(trendsInfo);
        })
    } catch (error) {
        res.send(error);
    }
});

router.get('/get', function(req, res, next) {
    const data = req.body;
    const params = [data.userId];
    query(trendsApi.getUserTrends, params,(err1,res1)=>{
        // logInfo();
        console.log(err1,res1);
        res.send(res1);
    })
});

module.exports = router;
