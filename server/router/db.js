// 引入mongodb模块
let { MongoClient, ObjectId } = require('mongodb');


// 定义各种数据配置信息
let { MESSAGE } = require('../config');

// 封装类
class Database {
    // 通过constructor
    constructor(connectUrl, dbName, collName) {
        // 安全校验
        if (!this instanceof Database) {
            throw new Error('请使用new来调用');
        }
        this.connectUrl = connectUrl;
        this.dbName = dbName;
        this.collName = collName;
    }
    // 定义连接方法
    connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.connectUrl, { useNewUrlParser: true }, (err, client) => {
                // 捕获错误
                if (err) {
                    return reject(MESSAGE.databaseError);
                }
               
                // 返回数据库
                resolve(client.db(this.dbName));
                // 如果希望每一次操作集合完毕之后 断开连接可以将client一起返回
                // resolve({ db: client.db(this.dbName), client });
            })
        })
    }

    // 操作集合的方法
    collection(collectionName) {
        this.collName = collectionName;
        // 为了链式调用
        return this;
    }

    // 定义方法
    insertOne(obj) {
        // 返回promise对象
        return new Promise((resolve, reject) => {
            // 建立连接
            this.connect()
                .then(
                    db => {
                        // 操作集合
                        db.collection(this.collName)
                            // 该方法是集合中内置的方法
                            .insertOne(obj, (err, data) => {
                                if (err) {
                                    reject(MESSAGE.databaseInsertError)
                                } else if (data.result.n > 0) {
                                    resolve(data.result);
                                } else {
                                    reject(MESSAGE.databaseInsertNotData);
                                }
                            })
                    },
                    err => reject(err)
                )
        })
    }

    // 插入多条数据方法
    insertMany(arr) {
        // 返回promise对象
        return new Promise((resolve, reject) => {
            // 建立连接
            this.connect()
                .then(
                    db => {
                        // 操作集合
                        db.collection(this.collName)
                            .insertMany(arr, (err, data) => {
                                if (err) {
                                    reject(MESSAGE.databaseInsertError);
                                } else if (data.result.n > 0) {
                                    resolve(data.result);
                                } else {
                                    reject(MESSAGE.databaseInsertNotData)
                                }
                            })
                    },
                    err => reject(err)
                )
        })
    }

    // 删除一条数据
    deleteOne(obj) {
        // 返回promise对象
        return new Promise((resolve, reject) => {
            // 建立连接
            this.connect()
                .then(
                    db => {
                        // 处理带有id的数据
                        if (obj._id) {
                            obj._id = ObjectId(obj._id);
                        }

                        // 操作集合
                        db.collection(this.collName)
                            // 该方法是集合中内置的方法
                            .deleteOne(obj, (err, data) => {
                                // console.log(err, 222, data);
                                if (err) {
                                    reject(MESSAGE.databasedeleteError)
                                } else if (data.result.n > 0) {
                                    resolve(data.result);
                                } else {
                                    reject(MESSAGE.databasedeleteNotData);
                                }
                            })
                    },
                    err => reject(err)
                )
        })


    }

    // 删除多条数据
    deleteMany(arr) {
        return Promise.all(arr.map(item => this.deleteOne(item)));
    }

    // 修改一条数据
    updateOne(oldObj, newObj) {
        // 返回promise对象
        return new Promise((resolve, reject) => {
            // 建立连接
            this.connect()
            .then(
                db => {
                    // 处理带有id的数据
                    if (oldObj._id) {
                        oldObj._id = ObjectId(oldObj._id);
                    }

                    // 操作集合
                    db.collection(this.collName)
                        .updateOne(oldObj,  { $set: newObj }, (err, data) => {
                            if (err) {
                                reject(MESSAGE.databaseupdateError);
                            } else if (data.result.n > 0) {
                                resolve(data.result);
                            } else {
                                reject(MESSAGE.databaseupdateNotData);
                            }
                        })
                },
                err => reject(err)
            )
        })
    }


    // 修改多条数据
    updateMany(arr) {
        return Promise.all(arr.map(item => this.updateOne(...item)));
    }

    
    // 查询一条数据
    findOne(obj) {
        return new Promise((resolve, reject) => {
            // 建立连接
            this.connect()
                .then(
                    db => {
                        if (obj._id) {
                            obj._id = ObjectId(obj._id);
                        }
                        // 操作集合
                        db.collection(this.collName)
                            .findOne(obj, (err, data) => {
                                // 捕获异常
                                if (err) {
                                    reject(MESSAGE.databaseufindError);
                                } else if (data) {
                                    resolve(data);
                                } else {
                                    reject(MESSAGE.databasefindNotData);
                                }
                            }) 
                    },
                    err => reject(err)
                )
        })
    }

    // 查询多条数据 
    // es6中配置默认参数  function (data) { return data }
    findMany(obj, fn = data => data) {
        return new Promise((resolve, reject) => {
            // 建立连接
            this.connect()
                .then(
                    db => {
                        // 操作集合
                       let result =  db.collection(this.collName).find(obj);
                                // 执行方法 并返回数据
                                fn(result)
                                .toArray(function(err, arr) {
                                    if (err) {
                                        reject(MESSAGE.databaseufindError);
                                    } else if (arr.length) {
                                        resolve(arr);
                                    } else {
                                        reject(MESSAGE.databasefindNotData);
                                    }
                                })
                    },
                    err => reject(err)
                )
        })
    }
}

// 返回类
module.exports = Database;