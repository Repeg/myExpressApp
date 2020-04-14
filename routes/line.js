var express = require('express');
var router = express.Router();

router.get('/addOne', function(req, res, next) {
    console.log("-------addOne--------" + new Date() + "------"+ new Date().getTime() +"---------------");

})