// 引入tools
let { db, MESSAGE } = require('../../tools');
module.exports = (req, res) => {

    console.log('updateUser', req.body);
    db.collection('user')
        .updateOne()

    // res.json({ errno:0, msg: '修改用户信息成功了' })
}