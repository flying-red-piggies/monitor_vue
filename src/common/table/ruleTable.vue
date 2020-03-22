<template>
  <div>
    <div class="search">
      <el-input class="elInput" v-model="ruleName" placeholder="输入规则名称进行搜索"/>
      <el-button @click="addRule">添加规则</el-button>
      <el-button @click="refreshRules" class="refresh-button">刷新</el-button>
    </div>
    <div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
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
    ruleList: Array,
    loading: false
  },
  watch: {
    ruleList: {
      handler (newValue, oldValue) {
        console.log(newValue)
      },
      deep: true
    }
  },
  data () {
    return {
      ruleName: '',
      userId: '1072760173225591'
    }
  },
  methods: {
    search (tableData, key) {
      return tableSearch.filter(tableData, key)
    },
    addRule () {
      this.$router.push({
        name: 'addRule',
        params: {
          userId: this.userId
        }
      })
    },
    refreshRules () {
      this.loading = true
      this.$emit('refreshRules')
    },
    showRule (detail) {
    }
  }
}
</script>

<style scoped>
  .refresh-button {
    float: right;
  }
</style>
