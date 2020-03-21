<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="报警联系人" name="contact">
        <div class="search">
          <el-input class="elInput" v-model="name" placeholder="输入联系人名称进行搜索"/>
        </div>
        <div>
          <el-table
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
            <el-table-column
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-link @click="showRule(scope.row)">详情</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="联系人群组" name="group">
        <div class="search">
          <el-input class="elInput" v-model="groupName" placeholder="输入群组名称进行搜索"/>
        </div>
        <div>
          <el-table
            ref="multipleTable"
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
            <el-table-column
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-link @click="showRule(scope.row)">详情</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import contact from '../../../api/alarm/contact'
import group from '../../../api/alarm/group'
import tableSearch from '../../../common/table/tableSearch'

export default {
  name: 'contactMain',
  created () {
    group.getGroupList(this.userId).then(res => {
      this.groupList = res.data
      this.groupList.forEach((value) => {
        this.contactList = this.contactList.concat(value.contacts)
      })
    })
  },
  data () {
    return {
      userId: '1072760173225591',
      name: '',
      groupName: '',
      activeTab: 'contact',
      contactList: [],
      groupList: []
    }
  },
  methods: {
    search (tableData, key) {
      return tableSearch.filter(tableData, key)
    },
    showRule (detail) {
    }
  }
}
</script>

<style scoped>

</style>
