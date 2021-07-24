<template>
    <div class="manager-set">
        <div class="info">
            <div class="title">修改资料</div>
            <CommonForm :formLabel="formLabel" :form="data">
                <template>
                    <el-form-item class="avatar" label="头像" prop="img">
                        <img class="currentAvatar" :src="data.img" alt="" width="100">
                        <el-upload
                            class="avatar-uploader"
                            action="/admin/manager/avatarUpload"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :before-upload="beforeAvatarUpload"
                            :show-file-list="false"
                        >   
                            <img v-if="imageUrl" :src="imageUrl" class="newAvatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <!-- <img class="load-img" :src="data.img" alt=""> -->
                    </el-form-item>
                </template>
                <template #operation>
                    <el-button type="success" @click="resetValue">重置</el-button>
                    <el-button type="danger" @click="update">修改</el-button>
                </template>
            </CommonForm>
        </div>

        <div class="updatePassword">
            <h2>修改密码</h2>
            <!-- 样式: 1 placeholder  2  label   3 label-width -->
            <!-- 校验: 1 v-model  2 prop  3 model  4 rules  -->
            <!-- 提交: 1 ref  2 绑定事件 3 validate -->
            <el-form label-width="200px" :model="data" :rules="rules" ref="passwordForm">
                <el-form-item label="用户名" prop="username">
                    <el-input placeholder="请输入用户名" v-model="data.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="请输入密码" v-model="data.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="repeat">
                    <el-input placeholder="请输入重复密码" v-model="data.repeat" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="resetValue">重置</el-button>
                    <el-button type="danger" @click="updatePassword">修改</el-button>
                </el-form-item>
            </el-form>
        </div>


    </div>
</template>

<style lang="scss">
.manager-set {
    padding: 20px;
    background-color: #fff;
    // data
    .info {
        margin-bottom: 50px;
        .title {
            font-size: 28px;
            padding-bottom: 20px;
            border-bottom: 1px solid #efefef;
            margin-bottom: 20px;
        }
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .newAvatar {
        width: 100px;
        height: 100px;
        display: block;
    }

    h2 {
        font-size: 22px;
        padding: 15px 0;
        border-bottom: 1px solid #ccc;
        margin-bottom: 22px;
    }
    .el-input {
        width: 100%;
    }

    .el-form--inline .el-form-item {
        display: block;
    }
    .operationBtn {
        display: flex;
        margin-left: 200px;
    }
}
</style>

<script>
import CommonForm from '@/components/form/CommonForm';
import { validateUsername, validatePassword, validateRepeat } from '@/tools/validator';
export default {
    components: { CommonForm },
    data() {
        return {
            data: {},
            rules: {
                username: [{ trigger: 'blur', validator: validateUsername }],
                password: [{ trigger: 'blur', validator: validatePassword }],
                repeat: [{ trigger: 'blur', validator: (...args) => {
                    validateRepeat(this.data.password, '密码', ...args);
                }}],
            },
            form: {},
            formLabel: [
                    {
                        model: 'username',
                        label: '姓名',
                        type: 'input'
                    },
                    {
                        model: 'permission',
                        label: '权限',
                        type: 'input'
                    },
                    {
                        model: 'position',
                        label: '职位',
                        type: 'input',
                    },
                    {
                        model: 'city',
                        label: '所在城市',
                        type: 'input'
                    },
                    {
                        model: 'intro',
                        label: '个人简介',
                        type: 'textarea'
                    },
                    {
                        model: 'password',
                        label: '账号密码',
                        type: 'input'
                    },
                    {
                        model: 'payword',
                        label: '支付密码',
                        type: 'input'
                    },
                    {
                        model: 'telphone',
                        label: '手机号',
                        type: 'input',
                    },
                    {
                        model: 'bankcard',
                        label: '银行卡号',
                        type: 'input'
                    },
                    {
                        model: 'wechat',
                        label: '微信号',
                        type: 'input'
                    }
                ],
            imageUrl: ''
        }
    },
    methods: {
        getData() {
            // 获取路由数据
            // let { params } = this.$route;
            const username = this.window.sessionStorage.getItem('username')
            // this.$http.get('/admin/managerInfo', { params: { username } })
            this.$http.get('/data/manager/managerInfo' )
                .then(({ data }) => {
                    this.data = data;
                })
                .catch(err => this.$message.error('ManagerSet-getData', err))
        },
        beforeAvatarUpload(file) {
            console.log(123);
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 上传成功
        uploadSuccess(data) {
            this.imageUrl = window.URL.createObjectURL(file.raw);
            // 更改数据
            if (data.errno === 0) {
                this.$set(this.data, 'img', data.img);
            } else {
                this.$message.error({
                    message: '加载图片失败',
                    type: 'warning'
                })
            }

        },
        // 上传失败
        uploadError() {
            this.$message.error({
                message: '上传失败',
                type: 'warning'
            })
        },
        // 重置
        resetValue() {
            // 重置数据
            this.$refs.passwordForm.resetFields();
            console.log(this.$refs.passwordForm);
        },
        // 修改密码
        updatePassword() {
            this.$refs.passwordForm.validate(val => {
                if (val) {
                   this.update();
                }
            })
        },
        // 修改信息
        update() {
            // 发送请求修改
            this.$confirm('您确定修改吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http
                    .post('/admin/manager/update', this.data)
                    .then(({ data }) => {
                        if (data.errno === 0) {
                            // 提示文字
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            })
                            // 1s之后跳转页面
                            setTimeout(() => {
                                // 刷新页面
                                // location.reload();
                                // 通过router
                                this.$router.go(0);
                            }, 1000)
                            
                        } else {
                            // 提示
                            this.$message({
                                message: data.msg,
                                type: 'warning'
                            })
                        }
                    })
            }).catch(() => {this.$message({ type: 'info', message: '已取消修改' })
        })
        }
    },
    created() {
        this.getData();
    }
}
</script>