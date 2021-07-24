const { db } = require("../../tools");

module.exports = (req, res) => {
    console.log('statusChange', req.body);
    let {id, status} = req.body
    db.collection('user')
        .updateOne({ id }, { status })
        .then(data => res.json({errno:0, msg: '用户状态修改成功了'}))
        .catch(err => res.json(err))
}