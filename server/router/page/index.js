const { Router } = require('express');

const router = new Router();

router.get('/admin', require('./admin'))

module.exports = router