<template>
  <div class="login-container">
    <div class="page-login">
      <!-- 1.样式   1.label  2.label-width  3.placeholder -->
      <!-- 2.输入校验  1.v-model  2.prop  3.model  4.rules -->
      <!-- 3.提交校验  1.ref  2.绑定事件  3.validate -->
      <el-form :model="data" ref="loginForm">
        <el-menu class="el-menu-demo" mode="horizontal" :default-active="activeIndex" @select="handleSelect">
          <el-menu-item index="1">账号密码登录</el-menu-item>
          <el-menu-item index="2">手机号登录</el-menu-item>
        </el-menu>

        <el-form ref="account1" v-if="activeIndex==1" :model="data" :rules="rules1">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="data.username">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="data.password">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
        </el-form>

        <el-form ref="account2" v-else :model="data" :rules="rules2">
          <el-form-item prop="telphone">
            <el-input placeholder="请输入手机号" v-model="data.telphone">
              <i slot="prefix" class="el-input__icon el-icon-phone"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input placeholder="请输入验证码" v-model="data.code">
              <i slot="prefix" class="el-input__icon el-icon-s-comment"></i>
              <span slot="suffix" class="getValidCode" @click="getValidationCode">获取验证码</span>
            </el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click.prevent="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>


<style lang="scss" scoped>
 .login-container {
   position: relative;
    height: 100%;
    background-image: url('../../assets/background.jpg');
    background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    .page-login {
      position: absolute;
      left: 52%;
      top: 30%;
        .el-menu {
          margin-bottom: 20px;
        }
        .el-menu-item {
          font-size: 18px;
          width: 50%;
          text-align: center;
        }
        .el-button {
          width: 100%;
        }
        .getValidCode {
          cursor: pointer;
        }
      }
  }
</style>

<script>
import { validateUsername, validatePassword, validateTelphone, validateCode } from '@/tools/validator'
export default {
  data() {
    return {
      activeIndex: '1',
      validationCode: '',
      data: {
        username: '',
        password: '',
        telphone: '',
        code: ''
      },
      rules1: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername}],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      rules2: {
        telphone: [{ required: true, trigger: 'blur', validator: validateTelphone }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }]
      }
    }
  },
  methods: {
    handleSelect(activeIndex) {
      this.activeIndex = activeIndex;
    },
    handleLogin() {
      if (this.$refs.account1) {
        console.log(this.$refs.account1);
        this.$refs.account1.validate(async valid => {
          console.log(this.data,valid);
          if (valid) {
            console.log(valid);
            const data = await this.$http.post('/admin/login', this.data);
            if(data.status === 200) {
              this.window.sessionStorage.setItem('username', data.data.username);
              // this.$router.go(0);
              this.$router.push('/')
            }
          }
        })
      } else {
        this.$refs.account2.validate(async valid => {
          if (valid) {
            const data = await this.$http.post('/admin/login', this.data);
            if(data.status === 200) {
              this.window.sessionStorage.setItem('username', data.data.username);
              // this.$router.go(0);
              this.$router.push('/')
            }
          }
        })
      }
    },
    getValidationCode() {
      this.$message({ type: 'success', message: 'Please waiting for ......' })
    }
  }
}
</script>