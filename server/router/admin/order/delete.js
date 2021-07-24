const { db, MESSAGE } = require('../../tools')
module.exports = (req, res) => {
    console.log('delete', req.body);
    db.collection('order')
        .deleteOne(req.body)
        .then(() => res.json(MESSAGE.success))
        .catch(err => res.json(err))
    // res.json({ errno:0, msg: '删除了' })

}