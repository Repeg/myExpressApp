var decorator = require('./decorator');
var userApi = require('../DB/userApi');
var userApi = userApi.userApi;
// var log = decorator.log;
var needLogin = decorator.needLogin;

function needLogin(target) {
    target.prototype.logger = () => `${target.name} 被调用`
}

class userApiNeedLogin {
    constructor (){}

    saveUserInfo(data) {
        return new Promise(function (resolve, reject) {
            query(userApi.saveUserInfo,data,(error,queryRes)=>{
                if(!error){
                    resolve(true);
                }else{
                    reject(error);
                }
            })
        })
    }
}

module.exports = { userApiNeedLogin }

