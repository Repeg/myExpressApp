var lineApi = {
    addOne: 'INSERT INTO line (id,timeStamp) VALUES (0,?)',
    getTimeRangeCount: 'SELECT * from line WHERE timeStamp > ? and timeStamp < ?'
}

exports.lineApi = lineApi;