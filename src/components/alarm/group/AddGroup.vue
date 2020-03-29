<template>
  <div>
    <el-row>
      <el-col :span="24"><el-page-header @back="goBack" :content="'新建联系人群组'"/></el-col>
    </el-row>
    <el-form ref="contact" :model="group" label-width="80px" status-icon :rules="checkGroup"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-row>
        <el-col :span="8">
          <el-form-item label="组名" prop="name" label-width="100px">
            <el-input v-model="group.name" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="选择联系人" prop="contactsNames" label-width="100px">
            <el-transfer :titles="['已有联系人', '已选联系人']" v-model="group.contactsNames" :data="contactList"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label-width="100px">
        <el-button type="primary" @click="confirmAdd( 'contact' )">保存</el-button>
        <el-button @click="resetForm( 'contact' )" class="reset-button">清空</el-button>
        <el-button @click="goBack" class="cancel-button">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import contact from '../../../api/alarm/contact'
import group from '../../../api/alarm/group'

export default {
  name: 'addGroup',
  created () {
    let userId = this.$route.params.userId
    this.group.userId = userId
    contact.getContactList(userId).then(res => {
      let result = res.data
      for (let i = 0; i < result.length; i++) {
        this.contactList.push({
          key: result[i].name,
          label: result[i].name,
          disabled: false
        })
      }
      console.log(this.contactList)
    })
  },
  data () {
    return {
      loading: false,
      group: {
        userId: '',
        name: '',
        contactsNames: []
      },
      contactList: [],
      checkGroup: {
        name: [
          { required: true, message: '请输入群组名', trigger: 'blur' }
        ],
        contactsNames: [
          { required: true, message: '请选择联系人', trigger: 'blur' }
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
          console.log(this.group)
          group.addGroup(this.group).then(res => {
            if (res.data.code === 400 || res.data.code === 500) {
              this.loading = false
              this.$notify({
                title: res.data.message,
                message: res.data.data
              })
            } else {
              this.$notify({
                title: '添加成功',
                message: '成功添加联系人组'
              })
              this.loading = false
              this.$router.push({
                name: 'contactMain',
                params: {
                  groupList: res.data.data
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
          console.log('error submit!!', this.group)
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
