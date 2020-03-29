<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="报警联系人" name="contact">
        <div class="search">
          <el-input class="elInput" v-model="name" placeholder="输入联系人名称进行搜索"/>
          <el-button @click="addContact">添加联系人</el-button>
          <el-button @click="refreshContacts" class="refresh-button">刷新</el-button>
        </div>
        <div>
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            ref="multipleTable"
            :data="search(contactList, name)"
            tooltip-effect="dark"
            style="width: 100%;">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="联系人名称"
              width="150">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
              label="手机通知"
              width="150">
              <template slot-scope="scope">{{ scope.row.sMS }}</template>
            </el-table-column>
            <el-table-column
              label="邮箱通知">
              <template slot-scope="scope">{{ scope.row.mail }}</template>
            </el-table-column>
            <el-table-column
              label="旺旺通知">
              <template slot-scope="scope">{{ scope.row.aliIM }}</template>
            </el-table-column>
            <el-table-column
              label="钉钉机器人">
              <template slot-scope="scope">{{ scope.row.dingWebHook }}</template>
            </el-table-column>
<!--            <el-table-column-->
<!--              label="操作"-->
<!--              width="80">-->
<!--              <template slot-scope="scope">-->
<!--                <el-link @click="showRule(scope.row)">详情</el-link>-->
<!--              </template>-->
<!--            </el-table-column>-->
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="联系人群组" name="group">
        <div class="search">
          <el-input class="elInput" v-model="groupName" placeholder="输入群组名称进行搜索"/>
          <el-button @click="addGroup">添加群组</el-button>
          <el-button @click="refreshGroups" class="refresh-button">刷新</el-button>
        </div>
        <div>
          <el-table
            v-loading="loading2"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            ref="multipleTable1"
            :data="search(groupList, groupName)"
            tooltip-effect="dark"
            style="width: 100%;">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="群组名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
<!--            <el-table-column-->
<!--              label="操作"-->
<!--              width="80">-->
<!--              <template slot-scope="scope">-->
<!--                <el-link @click="showRule(scope.row)">详情</el-link>-->
<!--              </template>-->
<!--            </el-table-column>-->
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import contact from '../../../api/alarm/contact'
import group from '../../../api/alarm/group'
import tableSearch from '../../../common/table/tableSearch'

export default {
  name: 'contactMain',
  created () {
    this.loading = this.loading2 = true
    this.contactList = this.$route.params.contactList
    this.groupList = this.$route.params.groupList
    console.log(this.contactList)
    if (this.groupList === undefined) {
      console.log('first enter contactmain group')
      group.getGroupList(this.userId).then(res => {
        this.groupList = res.data
        this.loading2 = false
      })
    } else {
      this.loading2 = false
    }
    if (this.contactList === undefined) {
      contact.getContactList(this.userId).then(res => {
        this.contactList = res.data
        this.loading = false
      })
    } else {
      this.loading = false
    }
  },
  data () {
    return {
      userId: '1072760173225591',
      name: '',
      groupName: '',
      activeTab: 'contact',
      contactList: [],
      groupList: [],
      loading: false,
      loading2: false
    }
  },
  methods: {
    search (tableData, key) {
      return tableSearch.filter(tableData, key)
    },
    addContact () {
      this.$router.push({
        name: 'addContact',
        params: {
          userId: this.userId
        }
      })
    },
    refreshContacts () {
      this.loading = true
      contact.refreshContacts(this.userId).then(res => {
        if (res.data.code === 400) {
          this.loading = false
          this.$message(res.data.message)
        } else {
          this.contactList = res.data
          this.loading = false
          this.$message('刷新成功')
        }
      }).catch(err => {
        this.loading = false
        this.$notify({
          title: '失败',
          message: err.response.status
        })
        console.log(err.response.data)
      })
    },
    addGroup () {
      this.$router.push({
        name: 'addGroup',
        params: {
          userId: this.userId
        }
      })
    },
    refreshGroups () {
      this.loading2 = true
      group.refreshGroups(this.userId).then(res => {
        if (res.data.code === 400) {
          this.loading2 = false
          this.$message(res.data.message)
        } else {
          this.groupList = res.data
          // this.contactList = []
          // this.groupList.forEach((value) => {
          //   this.contactList = this.contactList.concat(value.contacts)
          // })
          this.loading2 = false
          this.$message('刷新成功')
        }
      }).catch(err => {
        this.loading2 = false
        this.$notify({
          title: '失败',
          message: err.response.status
        })
        console.log(err.response.data)
      })
    },
    showRule (detail) {
    }
  }
}
</script>

<style scoped>
  .refresh-button {
    float: right;
    background-color: #337eca;
    border: 1px solid #337eca;
    color: #000000;
    font-weight: bold;
  }
  .refresh-button:hover {
    background-color: #0a0c13;
    border: 1px  solid #337eca;
    color: #337eca;
  }
</style>
