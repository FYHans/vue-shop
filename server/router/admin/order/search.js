
module.exports = (req, res) => {
    console.log('search', req.query);
    res.send([{
        "ordernum": "201908080101000001",
        "date": "2021-07-02",
        "account": "王大猴",
        "money": "￥199",
        "pay": "微信",
        "origin": "App订单",
        "status": "已完成",
        "orderType": "正常"
    }])
}