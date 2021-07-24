let path = require('path');
let root = process.cwd();

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        outputDir: path.join(root, '../server/static/admin/'),
        indexPath: path.join(root, '../server/views/admin.html'),
        publicPath: '/static/admin/'
    }
} else {
    const proxyObject = {
        target: 'http://localhost:3002'
    }


    module.exports = {
        devServer: {
            proxy: {
                '/data/echarts/dataMain': proxyObject,
                '/data/echarts/seller': proxyObject,
                '/data/echarts/orderlist/orderlist': proxyObject,
                '/data/echarts/trend': proxyObject,
                '/data/echarts/visitor': proxyObject,
                '/data/echarts/stock': proxyObject,
                '/data/orderlist/orderlist': proxyObject,
                '/data/manager/managerInfo': proxyObject,
                '/data/tabledata/scroll': proxyObject,
                '/data/user/userlist': proxyObject,

                '/admin/login': proxyObject,
                // '/admin/logout': proxyObject,

                '/admin/order/orderlist': proxyObject,
                '/admin/order/delete': proxyObject,
                '/admin/order/search': proxyObject,

                '/admin/manager/avatarUpload': proxyObject,
                '/admin/manager/update': proxyObject,

                '/admin/user/userList': proxyObject,
                '/admin/user/create': proxyObject,
                '/admin/user/userInfo': proxyObject,
                '/admin/user/update': proxyObject,
                '/admin/user/statusChange': proxyObject,
                '/admin/user/delete': proxyObject
            }
        }
    }
}