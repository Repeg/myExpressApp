var userApi = {
    getALLUser: 'select * from user',
    saveUserInfo: 'INSERT INTO user (id, openid, name, nickName, avatarUrl, gender, city, province, country) VALUES (0,?,?,?,?,?,?,?,?)',
    updateUserInfo: 'UPDATE user SET name="?" and nickName="?",avatarUrl="?",gender="?",city="?",province="?",country="?" WHERE openid=?',
    getUserWithOpenid: 'select * from user WHERE openid = ?',
    updateTokenByOpenid: "UPDATE user SET token=? WHERE openid=?",
    insertUserTokenAndOpenid: "INSERT INTO user (id, openid, token) VALUES (0,?,?)"
}

exports.userApi = userApi;