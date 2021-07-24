
module.exports = (req, res) => {
    console.log('managerInfo', req.query);
    res.json({ errno:0, username: 'xiaoming' })
}