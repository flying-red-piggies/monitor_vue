<template>
  <div>
    <div class="search">
      <el-input class="elInput" v-model="ruleName" placeholder="输入规则名称进行搜索"/>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="search(ruleList, ruleName)"
        tooltip-effect="dark"
        style="width: 100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="规则名称"
          width="150">
          <template slot-scope="scope">{{ scope.row.ruleName }}</template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="150">
          <template slot-scope="scope">{{ scope.row.alertState }}</template>
        </el-table-column>
        <el-table-column
          label="启用">
          <template slot-scope="scope">{{ scope.row.enableState }}</template>
        </el-table-column>
        <el-table-column
          label="监控项">
          <template slot-scope="scope">{{ scope.row.metricName }}</template>
        </el-table-column>
        <el-table-column
          label="产品名称">
          <template slot-scope="scope">{{ scope.row.namespace }}</template>
        </el-table-column>
        <el-table-column
          label="通知对象">
          <template slot-scope="scope">{{ scope.row.contactGroups }}</template>
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
  </div>
</template>

<script>
import tableSearch from './tableSearch'

export default {
  name: 'ruleTable',
  props: {
    ruleList: Array
  },
  data () {
    return {
      ruleName: ''
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
