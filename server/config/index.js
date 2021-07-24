module.exports = {
    ROOT: process.cwd(),
    HTTP_PORT: 3002,
    HTTPS_PORT: 3003,
    STATIC: {
        '/static': './static'
    },
    SECRET: 'abcdefg',
    MESSAGE: {
        // 操作成功
        success: { errno: 0 },
        // 连接数据库失败
        databaseError: { errno: 1, msg: '数据库错误' },
        // 插入数据
        databaseInsertError: { errno: 2, msg: '数据库错误'},
        databaseInsertNotData: { errno: 3, msg: '数据库错误' },
        // 删除数据
        databasedeleteError: { errno: 4, msg: '数据库错误' },
        databasedeleteNotData: { errno: 5, msg: '数据库错误' },
        // 修改数据
        databaseupdateError: { errno: 6, msg: '数据库错误' },
        databaseupdateNotData: { errno: 7, msg: '数据库错误' },
        // 查询数据
        databaseufindError: { errno: 8, msg: '数据库错误' },
        databasefindNotData: { errno: 9, msg: '没有数据' },
        // 登录错误
        loginError: { errno: 10, msg: '登录失败，请检查用户名和密码' },
        // 没有登录
        notLogin: { errno: 11, msg: '没有登录' },
        // 解析图片失败
        uploadParseError: { errno: 12, msg: '上传失败' },
        // 更改图片位置失败
        saveUploadError: { errno: 13, msg: '上传失败' }
    },
    // 连接数据库字符串
    CONNECTURL: 'mongodb://localhost:27017',
    // 数据库的名称
    DBNAME: 'db-shop-admin',
    // 定义上传图片缓存路径
    UPLOAD_CACHE_DIR: '/cache/',
    // 定义上传图片存储的路径
    UPLOAD_SAVE_DIR: '/static/upload/',

}