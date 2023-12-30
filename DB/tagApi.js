var tagApi = {
    add: `insert into tag (id, name) values (0, ?)`,
    getALLTag: 'select * from tag'
}

exports.tagApi = tagApi;