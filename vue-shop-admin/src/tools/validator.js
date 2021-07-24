export function validateUsername(obj, value, cb) {
    if (!value) {
        cb(new Error('请确认是2-10用户名'))
    }
    if (!/^\w{2,10}$/.test(value)) {
        cb(new Error('请输入2-10位用户名'))
    }
    cb();
}

export function validatePassword(obj, value, cb) {
    if (!value) {
        cb(new Error('请确认是4-10密码'))
    }
    if (!/^\w{4,10}$/.test(value)) {
        cb(new Error('请输入4-10位密码'))
    }
    cb();
}

// 重复密码
export function validateRepeat(repeatValue, name, obj, value, cb) {
    // console.log(333, arguments);
    // 校验是否输入密码
    if (!value) {
        cb(new Error(`请输入${name}`));
    }
    // 校验密码和重复密码
    if (repeatValue !== value) {
        cb(new Error(`您两次输入的${name}不一致`))
    }
    // 正确也要执行cb
    cb();
}

// 订单编号
export function validateOrderNum(obj, value, cb) {
    if (!value) {
        cb(new Error('请输入18位订单编号'))
    }
    if (!/^[0-9]{18}$/.test(value)) {
        cb(new Error('您输入的订单编号有误'))
    }
    cb();
}

// 手机号
export function validateTelphone(obj, value, cb) {
    if (!value) {
        cb(new Error('请输入合法手机号'))
    }
    const regTelphone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    if (!regTelphone.test(value)) {
        cb(new Error('请输入合法手机号！'))
    }
    cb();
}

// 邮箱
export function validateEmail(obj, value, cb) {
    if (!value) {
        cb(new Error('请输入合法邮箱'))
    }
    const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    if (!regEmail.test(value)) {
        cb(new Error('请输入合法邮箱！'))
    }
    cb();
}

// 验证码
export function validateCode(obj, value, cb) {
    if (!value) {
        cb(new Error('请输入验证码'))
    }
    if (!/^\d{6}$/.test(value)) {
        cb(new Error('请输入验证码'))
    }
    cb();
}