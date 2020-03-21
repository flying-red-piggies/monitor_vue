<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="实例列表" name="instance" @click="tabChange('instance')">
        <div class="search">
          <el-input class="elInput" v-model="instanceId" placeholder="输入实例id或名称进行搜索"/>
<!--          <el-button class="searchBtn">搜索</el-button>-->
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="search(instanceList, instanceId)"
            tooltip-effect="dark"
            style="width: 100%">
            <!--          @selection-change="handleSelectionChange">-->
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="实例ID"
              width="120">
              <template slot-scope="scope">{{ scope.row.dBInstanceId }}</template>
            </el-table-column>
            <el-table-column
              label="实例名称"
              width="120">
              <template slot-scope="scope">{{ scope.row.dBInstanceDescription }}</template>
            </el-table-column>
            <el-table-column
              label="运行状态">
              <template slot-scope="scope">{{ scope.row.dBInstanceStatus }}</template>
            </el-table-column>
            <el-table-column
              label="数据库类型">
              <template slot-scope="scope">{{ scope.row.engine + '-' + scope.row.engineVersion }}</template>
            </el-table-column>
            <el-table-column
              label="所在地域-可用区"
              width="240">
              <template slot-scope="scope">{{ scope.row.regionId + '-' + scope.row.zoneId}}</template>
            </el-table-column>
<!--            <el-table-column-->
<!--              label="可用区"-->
<!--              width="120">-->
<!--              <template slot-scope="scope">{{ scope.row.zoneId }}</template>-->
<!--            </el-table-column>-->
            <el-table-column
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-link style="color: blue" @click="showChart(scope.row)">监控图表</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="报警规则" name="warn" @click="tabChange('instance')">
        <rule-table v-if="isReady" :rule-list="ruleList"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import rdsInfo from '../../../api/rds/RdsInfo'
import rule from '../../../api/alarm/rule'
import tableSearch from '../../../common/table/tableSearch'

import ruleTable from '../../../common/table/ruleTable'

export default {
  name: 'rdsMain',
  components: {
    ruleTable
  },
  created () {
    rdsInfo.getInstances(this.userId).then(res => {
      this.instanceList = res.data
      console.log(res.data)
    })
    rule.getRdsRuleList(this.userId).then(res => {
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
    tabChange (activeName) {
      this.activeTab = activeName
    },
    showChart: function (scopedRow) {
      this.$router.push({
        name: 'rdsMonitor',
        params: {
          userId: this.userId,
          dBInstanceId: scopedRow.dBInstanceId
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
