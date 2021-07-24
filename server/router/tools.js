// 引入conf
let conf = require('../config');
// 引入db
let Database = require('./db');
// 引入db
let db = new Database(conf.CONNECTURL, conf.DBNAME);

// 暴露接口
module.exports = { db, ...conf };