var express = require('express');
var trendsApi = require('../DB/trends');
var userApi = require('../DB/userApi');
var router = express.Router();
var query = require('../DB/db');
const { logInfo } = require('../util');

var trendsApi = trendsApi.trendsApi;
var userApi = userApi.userApi;
var query = query.query;

router.post('/create', function(req, res, next) {
    const data = req.body;
    try {
        query(userApi.getUserWithId, [data.userId], (err1, userInfo)=>{
            // logInfo();
            console.log(err1,userInfo);
            const params = [data.content, data.userId, data.type, userInfo[0].level];
            query(trendsApi.createUserTrends, params,(trendsErr, trendsInfo)=>{
                // logInfo();
                console.log(err1,trendsInfo);
                const logParams = [data.userId, trendsInfo.insertId];
                query(trendsApi.createUserTrendsLog, logParams,(err1,res1)=>{
                    res.send(trendsInfo);
                })
            })
        })
    } catch (error) {
        res.send(error);
    }
});

router.post('/update', function(req, res, next) {
    const data = req.body;
    const params = [data.content, data.type, data.trendId];
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

const levelRule = {
    1: [8],
    2: [6, 7, 8],
    3: [3, 4, 5, 6, 7, 8],
    4: [3, 4, 5, 6, 7, 8],
    5: [3, 4, 5, 6, 7, 8],
    6: [3, 4, 5, 6, 7, 8],
    7: [5, 6, 7, 8],
    8: [6, 7, 8],
}

async function getUserWithId () {
    try {
        const userInfo = await query(userApi.getUserWithId, params);
        for(i in levelRule[userInfo.level]){
            query(userApi.getLevelUser, [i], (err2, levelUser) => {
                userList.push(levelUser)
            })
        }
    } catch {

    }
}

router.get('/getOtherTrends', function(req, res, next) {
    const data = req.body;
    const params = [data.userId];
    const userList = [];
    query(userApi.getUserWithId, params, (err1, userInfo)=>{
        for(i in levelRule[userInfo.level]){
            query(userApi.getLevelUser, [i], (err2, levelUser) => {
                userList.push(levelUser)
            })
        }
    })
    query(trendsApi.getUserTrends, params,(err1,res1)=>{
        // logInfo();
        console.log(err1,res1);
        res.send(res1);
    })
});

module.exports = router;
