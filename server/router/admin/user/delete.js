
module.exports = (req, res) => {
    console.log('deleteUser', req.body);
    res.json({ errno:0, msg: '删除用户成功了' })
}