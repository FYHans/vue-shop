const { db, MESSAGE, SECRET } = require('../../tools');
const jwt = require('jsonwebtoken');
module.exports = (req, res) => {
    console.log('login', req.body);
    db.collection('manager')
        .findOne({ username: req.body.username, password: req.body.password })
        .then(
            data => {
                
                res.json({ errno: 0, username: data.username })
            }
        )
        .catch(err => res.send(err))
}