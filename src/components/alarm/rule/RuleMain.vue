<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="规则概览" name="rule">
        <rule-table v-if="isReady" :rule-list="ruleList" :loading.sync="ruleLoading" @refreshRules="refreshRules"/>
      </el-tab-pane>
      <el-tab-pane label="其它" name="warn" disabled>其它</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import rule from '../../../api/alarm/rule'
import ruleTable from '../../../common/table/ruleTable'
import common from '../../../api/common'

export default {
  name: 'ruleMain',
  components: {
    ruleTable
  },
  created () {
    this.ruleLoading = true
    this.ruleList = this.$route.params.ruleList
    if (this.ruleList === undefined) {
      console.log('ruleList in RuleMain is undefined, means first enter')
      common.getOperators().then(res => {
        let operators = res.data
        rule.getRuleList(this.userId).then(res => {
          this.ruleList = res.data
          this.ruleList.map(item => {
            for (let key in operators) {
              if (operators[key].name === item.comparisonOperator) {
                item.op = operators[key].op
              }
            }
            return item
          })
          this.isReady = true
          this.ruleLoading = false
        })
      })
    } else {
      this.isReady = true
      this.ruleLoading = false
      console.log('ruleList in RuleMain is created, means new rule had been added')
    }
  },
  data () {
    return {
      userId: '1072760173225591',
      activeTab: 'rule',
      ruleList: [],
      isReady: false,
      ruleLoading: false
    }
  },
  methods: {
    refreshRules () {
      this.ruleLoading = true
      rule.refreshRules(this.userId).then(res => {
        if (res.data.code === 400) {
          this.ruleLoading = false
          this.$message(res.data.message)
        } else {
          this.ruleList = res.data
          this.ruleLoading = false
          this.$message('刷新成功')
        }
      }).catch(err => {
        this.ruleLoading = false
        this.$notify({
          title: '失败',
          message: err.response.status
        })
        console.log(err.response.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
