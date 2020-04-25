var lineApi = {
    addOne: 'INSERT INTO line (id, timeStamp, useropenid, linesId) VALUES (0,?,?,?)',
    add_user_line: 'INSERT INTO user_line (id, userOpenId, linesId) VALUES (0,?,?)',
    user_line_check: 'SELECT linesId FROM user_line WHERE userOpenId = ? and linesId = ?',
    getTimeRangeCount: 'SELECT * from line WHERE timeStamp > ? and timeStamp < ? and linesId = ?',
    getUserLineList:    `select linesId,count(*) AS count,allLine.lineName from line 
                        left JOIN allLine
                        on (allLine.id = line.linesId) and line.linesId in (SELECT linesId from user_line WHERE userOpenId = ?)
                        WHERE allLine.lineName is not NULL
                        GROUP BY linesId`,
    addLine: 'INSERT INTO allLine (id, lineName, lineAddTime, createdUserOpenid) VALUES (0, ?, ?, ?)',
}

exports.lineApi = lineApi;