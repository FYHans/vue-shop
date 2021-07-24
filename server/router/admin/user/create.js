const { db } = require("../../tools");
module.exports = (req, res) => {
    console.log('create', req.body);
    db.collection('user')
        .insertOne(req.body)
        .then(data => res.json({ errno:0, msg: '添加用户成功了' }))
}