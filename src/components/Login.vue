<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRule"
             status-icon
             v-loading="logining"
             element-loading-text="登录中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             ref="loginForm"
             label-position="left"
             label-width="0px"
             class="login-page">
      <h3 class="login-title">CloudMonitor for Ali Cloud</h3>
      <h1 class="login-title">LOGIN</h1>
      <el-form-item prop="username">
        <el-input type="text"
                  class="login-input"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  class="login-input"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="密码"/>
      </el-form-item>
      <el-checkbox v-model="checked" class="login-check">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button class="login-button" style="width:100%;" @click="login( 'loginForm' )">登录</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button class="register-button" style="width:100%;" @click="toRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import user from '../api/user'

export default {
  name: 'login',
  data () {
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      }
      setTimeout(() => {
        if (value.trim().length === 0) {
          callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }, 500)
    }
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      setTimeout(() => {
        if (value.trim().length === 0) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      logining: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRule: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      checked: false
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.logining = true
          user.login(this.loginForm).then(res => {
            if (res.data.code === 200) {
              console.log(res.data)
              let resData = res.data.data
              let token = resData.tokenHead + resData.token
              sessionStorage.setItem('token', token)
              user.info().then(res => {
                if (res.data.code === 200) {
                  let userId = res.data.data.userId
                  if (userId) {
                    sessionStorage.setItem('userId', userId)
                    console.log(userId)
                    this.logining = false
                    this.$notify({
                      title: '登录成功'
                    })
                    this.$router.push({
                      name: 'generalView'
                    })
                  }
                } else {
                  this.logining = false
                  this.$notify({
                    title: '登录失败',
                    message: res.data.data
                  })
                  console.log(res.data)
                }
              }).catch(err => {
                this.logining = false
                this.$notify({
                  title: '登录失败',
                  message: err.response.status
                })
                console.log(err.response)
              })
            } else {
              this.logining = false
              this.$notify({
                title: '登录失败',
                message: res.data.message
              })
            }
          }).catch(err => {
            this.logining = false
            this.$notify({
              title: '登录失败',
              message: err.response.status
            })
            console.log(err.response)
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    toRegister () {
      this.$router.push({
        name: 'register'
      })
    }
  }
}
</script>

<style scoped>
  .login-title {
    padding-top: 0;
    color: #242327;
  }
  .login-container {
    width: 100%;
    height: 100%;
  }
  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 8% auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login-input>>>.el-input__inner {
    background-color: white;
    border: 1px solid #d3d3d3;
    color: #606266;
    font-weight: bold;
  }
  .login-input:hover>>>.el-input__inner {
    border: 1px solid #5a5c60;
  }
  .login-input>>>.el-input__inner:focus {
    border: 1px solid #3a8ee6;
  }
  .login-button {
    background-color: #3a8ee6;
    color: white;
    border: none;
  }
  .login-button:hover {
    background-color: white;
    color: #3a8ee6;
    border: 1px solid #3a8ee6;
  }
  .register-button {
    background-color: white;
    color: #3a8ee6;
    border: 1px solid #3a8ee6;
  }
  .register-button:hover {
    background-color: #3a8ee6;
    color: white;
    border: none;
  }
  .login-check {
    padding-bottom: 5%;
  }
  .login-check>>>.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #606266;
    font-weight: bold;
  }
  .login-check>>>.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #3a8ee6;
    border-color: #3a8ee6;
  }
</style>
