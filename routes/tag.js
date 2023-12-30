var express = require('express');
var tagApi = require('../DB/tagApi');
var router = express.Router();
var query = require('../DB/db');

var tagApi = tagApi.tagApi;
var query = query.query;

router.get('/getAllTag', function(req, res, next) {
    query(tagApi.getALLTag, '',(err1,res1)=>{
      // logInfo();
      console.log(err1,res1);
      res.send(res1);
    })
});

router.post('/add', function(req, res, next) {
    const params = [req.body.tagName]
    query(tagApi.add, params,(err1,res1)=>{
      // logInfo();
      console.log(err1,res1);
      res.send(res1);
    })
});

module.exports = router;