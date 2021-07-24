const { db } = require("../../tools");

module.exports = (req, res) => {
    let { id } = req.query;
    db.collection('user')
        .findOne({ id: parseInt(id) })
        .then(data => res.json({errno: 0, data}))
        .catch(err => res.json(err))
}