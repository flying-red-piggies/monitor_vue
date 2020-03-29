<template>
  <div>
    <el-row>
      <el-col :span="24"><el-page-header @back="goBack" :content="'新建报警联系人'"/></el-col>
    </el-row>
    <el-form ref="contact" :model="contact" label-width="80px" status-icon :rules="checkContact"
             v-loading="loading"
             element-loading-text="请求中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="contact.name" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="sms">
            <el-input v-model="contact.sms" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="20%" label="邮箱" prop="mail">
            <el-input v-model="contact.mail" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="旺旺" prop="aliIM">
            <el-input v-model="contact.aliIM" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label-width="20%" label="钉钉机器人" prop="dingWebHook">
            <el-input v-model="contact.dingWebHook" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="描述" prop="describe">
            <el-input v-model="contact.describe" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="confirmAdd( 'contact' )">保存</el-button>
        <el-button @click="resetForm( 'contact' )" class="reset-button">清空</el-button>
        <el-button @click="goBack" class="cancel-button">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import contact from '../../../api/alarm/contact'

export default {
  name: 'addContact',
  created () {
    this.contact.userId = this.$route.params.userId
  },
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'))
      }
      setTimeout(() => {
        if (value.trim().length === 0) {
          callback(new Error('姓名不能为空'))
        } else {
          callback()
        }
      }, 500)
    }
    let validateSms = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电话号码'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value) || !(/^1([3456789])\d{9}$/.test(value))) {
          callback(new Error('电话号码格式错误'))
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
    return {
      loading: false,
      contact: {
        userId: '',
        name: '',
        sms: '',
        mail: '',
        aliIM: null,
        dingWebHook: null,
        describe: null
      },
      checkContact: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
        sms: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: validateSms, trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateMail, trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    confirmAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          console.log(this.contact)
          contact.addContact(this.contact).then(res => {
            if (res.data.code === 400 || res.data.code === 500) {
              this.loading = false
              this.$notify({
                title: res.data.message,
                message: res.data.data
              })
            } else {
              this.$notify({
                title: '保存成功',
                message: '成功保存报警联系人'
              })
              this.loading = false
              this.$router.push({
                name: 'contactMain',
                params: {
                  contactList: res.data
                }
              })
            }
          }).catch(err => {
            this.loading = false
            this.$notify({
              title: '失败',
              message: err.response.status
            })
            console.log(err.response.data)
          })
        } else {
          console.log('error submit!!', this.contact)
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .reset-button {
    color: #bf2020;
    border-color: #bf2020;
  }
  .reset-button:hover {
    color: #da2525;
    border-color: #da2525;
  }
  .cancel-button {
    color: #72767b;
  }
  .cancel-button:hover {
    color: #a4acb1;
  }
</style>
