var lineApi = {
    addOne: 'INSERT INTO line (id, timeStamp, useropenid) VALUES (0,?,?)',
    getTimeRangeCount: 'SELECT * from line WHERE timeStamp > ? and timeStamp < ?'
}

exports.lineApi = lineApi;