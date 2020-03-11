var userApi = {
    getALLUser: 'select * from user',
    saveUserInfo: 'INSERT INTO user (id, name, nickName, avatarUrl, gender, city, province, country) VALUES (0, ?,?,?,?,?,?,?)',
}

exports.userApi = userApi;