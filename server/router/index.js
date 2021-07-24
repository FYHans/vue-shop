const page = require('./page');
const admin = require('./admin');

module.exports = app => {
    // 安装路由
    app.use(page);
    app.use(admin);
}