module.exports = (req, res) => {
    console.log('update', req.body);
    res.json({errno:0, msg: '修改成功'})
}