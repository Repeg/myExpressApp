var userApi = {
    getALLUser: 'select * from user',
    saveUserInfo: 'INSERT INTO user (id, userName, avatar) VALUES (0,?,?)',
    updateUserInfo: 'UPDATE user SET userName=?,avatar=? WHERE id=?',
    getUserWithId: 'select * from user WHERE id = ?',
}

exports.userApi = userApi;