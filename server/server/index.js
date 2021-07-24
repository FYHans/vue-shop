// const http = require('http');
// const https = require('https');
// const path = require('path');
// const fs = require('fs');
// const { ROOT, HTTP_PORT, HTTPS_PORT } = require('../config')


// const httpPort = process.argv[2] || HTTP_PORT;
// const httpsPort = process.argv[3] || (process.argv[2] ? process.argv[2] + 1 : HTTPS_PORT);

// module.exports = app => {
//     http.createServer(app)
//     .listen(httpPort, () => console.log('listen http at ' + httpPort));
    
//     const key = fs.readFileSync(path.join(ROOT, './server/ssl/private.pem'))
//     const cert = fs.readFileSync(path.join(ROOT, './server/ssl/file.crt'))
//     https.createServer({ key, cert }, app)
//         .listen(httpsPort, () => console.log('listen https at ' + httpsPort));
// }


// 引入模块
// 引入http
let http = require('http');
// 引入https
let https = require('https');
// 引入path
let path = require('path');
// 引入fs模块
let fs = require('fs');

// 引入conf
let { HTTP_PORT, HTTPS_PORT, ROOT } = require('../config');

// 定义端口号
let httpPort = process.argv[2] || HTTP_PORT;
let httpsPort = process.argv[3] || (process.argv[2] ? +process.argv[2] + 1 : HTTPS_PORT);

// console.log(process.argv);


// 暴露接口
module.exports = app => {
    // 监听端口号
    http.createServer(app)
    .listen(httpPort, () => console.log('http server at ' + httpPort))

    let key = fs.readFileSync(path.join(ROOT, './server/ssl/private.pem'));
    let cert = fs.readFileSync(path.join(ROOT, './server/ssl/file.crt'));

    https.createServer({ key, cert }, app)
    .listen(httpsPort, () => console.log('https server at ' + httpsPort))

}

