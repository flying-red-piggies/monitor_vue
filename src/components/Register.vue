<template>
  <div class="register-container">
    <el-form :model="registerForm" :rules="registerRule"
             status-icon
             v-loading="loading"
             element-loading-text="请求中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             ref="registerForm"
             label-position="left"
             label-width="0px"
             class="register-page">
      <h3 class="register-title">用户注册</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  class="register-input"
                  v-model="registerForm.username"
                  auto-complete="off"
                  placeholder="用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  class="register-input"
                  v-model="registerForm.password"
                  auto-complete="off"
                  placeholder="密码"/>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input type="password"
                  class="register-input"
                  v-model="registerForm.confirmPassword"
                  auto-complete="off"
                  placeholder="确认密码"/>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email"
                  class="register-input"
                  v-model="registerForm.email"
                  auto-complete="off"
                  placeholder="邮箱地址"/>
      </el-form-item>
      <el-form-item prop="validCode">
        <div class="code-row">
          <el-input class="register-input code-input"
                    v-model="registerForm.validCode"
                    auto-complete="off"
                    placeholder="验证码"/>
          <el-button class="code-button">发送验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button class="register-button" style="width:100%;" @click="register( 'registerForm' )">注册</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button class="login-button" style="width:100%;" @click="toLogin">已注册 去登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import user from '../api/user'

export default {
  name: 'register',
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
    let validateConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次确认密码'))
      }
      setTimeout(() => {
        if (value !== this.registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }, 500)
    }
    let validateMail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      }
      setTimeout(() => {
        if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value))) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }, 500)
    }
    let validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      }
      setTimeout(() => {
        if (!(/^[0-9]{6}$/.test(value))) {
          callback(new Error('验证码格式错误'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      loading: false,
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        validCode: ''
      },
      registerRule: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          {required: true, message: '请再次确认密码', trigger: 'blur'},
          { validator: validateConfirm, trigger: 'blur' }
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          { validator: validateMail, trigger: 'blur' }
        ],
        validCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          user.register(this.registerForm).then(res => {
            if (res.data.code === 200) {
              this.loading = false
              this.$notify({
                title: '注册成功'
              })
              this.$router.push({path: '/'})
            } else {
              this.loading = false
              this.$notify({
                title: '注册失败',
                message: res.data.data
              })
              console.log(res.data)
            }
          }).catch(err => {
            this.loading = false
            this.$notify({
              title: '注册失败',
              message: err.response.status
            })
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    toLogin () {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>
  .register-title {
    padding-top: 0;
    color: #242327;
  }
  .register-container {
    width: 100%;
    height: 100%;
  }
  .register-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 3% auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .code-row {
    /*float: left;*/
    display: flex;
  }
  .code-input>>>.el-input__inner {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  .code-button {
    background-color: #3a8ee6;
    color: white;
    border: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .code-button:hover {
    background-color: #327ac4;
    color: white;
    border: none;
  }
  .register-input>>>.el-input__inner {
    background-color: white;
    border: 1px solid #d3d3d3;
    color: #606266;
    font-weight: bold;
  }
  .register-input:hover>>>.el-input__inner {
    border: 1px solid #5a5c60;
  }
  .register-input>>>.el-input__inner:focus {
    border: 1px solid #3a8ee6;
  }
  .register-button {
    background-color: #3a8ee6;
    color: white;
    border: none;
  }
  .register-button:hover {
    background-color: white;
    color: #3a8ee6;
    border: 1px solid #3a8ee6;
  }
  .login-button {
    background-color: white;
    color: #3a8ee6;
    border: 1px solid #3a8ee6;
  }
  .login-button:hover {
    background-color: #3a8ee6;
    color: white;
    border: none;
  }
</style>
