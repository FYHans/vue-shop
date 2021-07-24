const { Router } = require('express');

module.exports = new Router()
    .post('/admin/login', require('./manager/login'))
    .get('/admin/managerInfo', require('./manager/managerInfo'))
    .post('/admin/manager/avatarUpload', require('./manager/avatarUpload'))
    .post('/admin/manager/update', require('./manager/update'))

    .get('/admin/order/orderlist', require('./order/orderlist'))
    .post('/admin/order/delete', require('./order/delete'))
    .get('/admin/order/search', require('./order/search'))

    .get('/admin/user/userList', require('./user/userList'))
    .post('/admin/user/create', require('./user/create'))
    .get('/admin/user/userInfo', require('./user/userInfo'))
    .put('/admin/user/update', require('./user/update'))
    .put('/admin/user/statusChange', require('./user/statusChange'))
    .delete('/admin/user/delete', require('./user/delete'))
