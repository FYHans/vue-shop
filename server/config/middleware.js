const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { ROOT, STATIC } = require('./index');

module.exports = app => {
    app.engine('.html', ejs.__express);

    app.use(bodyParser.json());
    
    for (let key in STATIC) {
        app.use(key, express.static(path.join(ROOT, STATIC[key])))
    }

    app.use('/data', (req, res, next) => {
        // 以?切割请求路径，分割请求页面和query数据；将第一项后面加上.json后再拼接路径
        let arr = req.url.split('?');
        arr[0] += '.json';
        req.url = arr.join('?');
        // console.log(req.url);
    
        // 执行next放行函数
        next();
    }, express.static(path.join(ROOT, './static/data')))
}