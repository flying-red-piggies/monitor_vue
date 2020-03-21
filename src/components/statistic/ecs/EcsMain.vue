<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="实例列表" name="instance" @click="tabChange('instance')">
        <div class="search">
          <el-input class="elInput" v-model="instanceId" placeholder="输入实例ID或名称进行搜索"/>
<!--          <el-button class="searchBtn" @click="search()">搜索</el-button>-->
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="search(instanceList, instanceId)"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="实例ID/实例名称"
              width="200">
              <template slot-scope="scope">{{ scope.row.instanceId + '/'}}</template>
              <template slot-scope="scope">{{ scope.row.instanceName }}</template>
            </el-table-column>
            <el-table-column
              label="运行状态"
              width="120">
              <template slot-scope="scope">{{ scope.row.status }}</template>
            </el-table-column>
            <el-table-column
              label="所在地域">
              <template slot-scope="scope">{{ scope.row.regionId}}</template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-link style="color: blue" @click="showChart(scope.row)">监控图表</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="报警规则" name="rule" @click="tabChange('rule')">
        <rule-table :if="isReady" :rule-list="ruleList"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ecsInfo from '../../../api/ecs/EcsInfo'
import rule from '../../../api/alarm/rule'
import ruleTable from '../../../common/table/ruleTable'
import tableSearch from '../../../common/table/tableSearch'

export default {
  name: 'ecsMain',
  components: {
    ruleTable
  },
  created () {
    ecsInfo.getInstances(this.userId).then(res => {
      this.instanceList = res.data
    })
    rule.getEcsRuleList(this.userId).then(res => {
      this.ruleList = res.data
      this.isReady = true
    })
  },
  data () {
    return {
      userId: '1072760173225591',
      instanceId: '',
      activeTab: 'instance',
      instanceList: [],
      ruleList: [],
      isReady: false
    }
  },
  methods: {
    search (tableData, key) {
      return tableSearch.filter(tableData, key)
    },
    tabChange (activeTabName) {
      this.activeTab = activeTabName
    },
    showChart: function (scopedRow) {
      this.$router.push({
        name: 'ecsMonitor',
        params: {
          userId: this.userId,
          instanceId: scopedRow.instanceId
        }
      })
    }
  }
}
</script>

<style scoped>
  .search {
    display: flex;
  }
</style>
