<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="规则概览" name="rule">
        <rule-table v-if="isReady" :rule-list="ruleList"/>
      </el-tab-pane>
      <el-tab-pane label="其它" name="warn">其它</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import rule from '../../../api/alarm/rule'
import ruleTable from '../../../common/table/ruleTable'

export default {
  name: 'ruleMain',
  components: {
    ruleTable
  },
  created () {
    rule.getRuleList(this.userId).then(res => {
      this.ruleList = res.data
      this.isReady = true
    })
  },
  data () {
    return {
      userId: '1072760173225591',
      activeTab: 'rule',
      ruleList: [],
      isReady: false
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
