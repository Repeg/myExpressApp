var trendsApi = {
    // getALLUser: 'select * from user',
    // saveUserInfo: 'INSERT INTO user (id, userName, avatar, level) VALUES (0, ?, ?, ?)',
    // updateUserInfo: 'UPDATE user SET userName=?,avatar=? WHERE id=?',
    // getUserWithId: 'select * from user WHERE id = ?',
    getUserTrends: `select * from trends where id=any(select * from (select trendId from user_trends where userId = ?) as t)`,
    createUserTrends: `insert into trends (id, content, userId, type) VALUES (0, ?, ?, ?)`,
    updateUserTrends: `update trends set content=?, type=? where trendId=?`,
    createUserTrendsLog: `INSERT INTO user_trends (id, userId, trendId) VALUES (0, ?, ?)`,
}

exports.trendsApi = trendsApi;