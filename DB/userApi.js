var userApi = {
    getALLUser: 'select * from user',
    saveUserInfo: 'INSERT INTO user (id, userName, avatar, level) VALUES (0, ?, ?, ?)',
    updateUserInfo: 'UPDATE user SET userName=?,avatar=? WHERE id=?',
    getUserWithId: `SELECT 
    user.*,
    JSON_OBJECT(
        'tagArray', JSON_ARRAYAGG(
            JSON_OBJECT('tagId', user_tag.tagId, 'tagName', tag.name)
        )
    ) AS tags
    FROM user
    LEFT JOIN user_tag ON user.id = user_tag.userId
    LEFT JOIN tag ON user_tag.tagId = tag.id
    WHERE user.id = ?
    GROUP BY user.id, user.userName;`,
    getLevelUser: `select * from user where level = ?`,
    addTag: `INSERT into user_tag (id, userId, tagId) values (0, ?, ?)`,
}

exports.userApi = userApi;