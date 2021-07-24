// 引入模块
// 引入express
const express = require('express');
// 引入path
const path = require('path');
// 定义根目录
const { ROOT } = require('../conf')


module.exports = app => {
    // mock数据  只针对于get请求
    // 为了简化访问数据的方式 
        // 1.省略static: localhost:3002/static/data/home.json => localhost:3002/data/home.json
        // 2.省略.json，使用中间件：localhost:3002/static/data/home.json => localhost:3002/data/home
    // 移动端
    app.use('/data', (req, res, next) => {
        // 以?切割请求路径，分割请求页面和query数据；将第一项后面加上.json后再拼接路径
        let arr = req.url.split('?');
        arr[0] += '.json';
        req.url = arr.join('?');
        // console.log(req.url);
    
        // 执行next放行函数
        next();
    }, express.static(path.join(ROOT, './static/data')))
    
    
    // 后台系统
    // 处理/admin/user/password 修改密码
    // app.post('/admin/user/password', (req, res) => res.json({ errno: 0 }))
    
    // // 处理/admin/product/upload 上传图片
    // app.post('/admin/product/upload', (req, res) => res.json({ errno: 0, img: '/static/img/list/10.jpg' }))
    
    // // 处理'/admin/product/create' 创建商品
    // app.post('/admin/product/create', (req, res) => res.json({ errno: 0, data: '创建商品完成' }))
    
    // // 处理'/admin/product/delete' 删除商品
    // app.post('/admin/product/delete', (req, res) => res.json({ errno: 0 }))
    
    // 处理'/admin/product/update' 修改商品
    // app.post('/admin/product/update', (req, res) => res.json({ errno: 0 }))
    
    // mock数据
    app.use('/admin', (req, res, next) => {
        // 切割数据
        let arr = req.url.split('?');
        arr[0] = arr[0] + '.json';
        req.url = arr.join('?')
        next();
    }, express.static(path.join(ROOT, './static/data')))
}