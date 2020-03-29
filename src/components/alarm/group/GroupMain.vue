<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="联系人群组" name="group">
        <div class="search">
          <el-input class="elInput" v-model="name" placeholder="输入群组名称进行搜索"/>
        </div>
        <div>
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            ref="multipleTable"
            :data="search(groupList, name)"
            tooltip-effect="dark"
            style="width: 100%;">
            <!--          @selection-change="handleSelectionChange"-->
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
      <el-tab-pane label="其它" name="warn" disabled>其它</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import group from '../../../api/alarm/group'
import tableSearch from '../../../common/table/tableSearch'

export default {
  name: 'groupMain',
  created () {
    this.loading = true
    group.getGroupList(this.userId).then(res => {
      this.groupList = res.data
      this.loading = false
    })
  },
  data () {
    return {
      userId: '1072760173225591',
      name: '',
      activeTab: 'group',
      groupList: [],
      loading: false
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
