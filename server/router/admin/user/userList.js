const { db, MESSAGE } = require('../../tools');
module.exports = (req, res) => {
    let { query, pagenum, pagesize } = req.query;
    let length;
    if (query) {
         db.collection('user')
        .findMany({username: query})
        .then(data => res.json({errno: 0, data}))
        .catch(err => res.json(err))
    } else {
        db.collection('user').findMany(null).then(res => { length = res.length})
        db.collection('user')
            .findMany(
                null,
                data => data.sort({ id: 1 })
                .skip((pagenum - 1) * pagesize)
                // 截取数据
                .limit(parseInt(pagesize))
            )
            .then(data => res.json({errno: 0, data, length}))
            .catch(err => res.json(err))
    }
}