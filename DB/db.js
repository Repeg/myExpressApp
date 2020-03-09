var mysql = require('mysql');
var dbConfig = require('../config');
var config = dbConfig.config.DBConfig;

var pool = mysql.createPool({      //创建mysql实例
    connectionLimit: config.connectionLimit,
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
});

function query(sql, values, callback) {
    console.log("db pool");
    pool.getConnection(function (err, connection) {
        if(err) throw err;
        console.log("get connection ");
        //Use the connection
        connection.query(sql, values,function (err, results, fields) {
            console.log(JSON.stringify(results));
            //每次查询都会 回调
            callback(err, results);
            //只是释放链接，在缓冲池了，没有被销毁
            connection.release();
            if(err) throw error;
        });
    });
}

exports.query = query;