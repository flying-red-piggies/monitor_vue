<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="实例列表" name="instance" @click="tabChange('instance')">
        <div class="search">
          <el-input class="elInput" v-model="instanceId" placeholder="输入实例ID或名称进行搜索"/>
          <el-button @click="refreshEcs" class="refresh-button">刷新</el-button>
        </div>
        <div>
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
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
        <rule-table :if="isReady" :rule-list="ruleList" :loading="ruleLoading" @refreshRules="refreshRules"/>
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
    this.loading = this.ruleLoading = true
    ecsInfo.getInstances(this.userId).then(res => {
      this.instanceList = res.data
      this.loading = false
    })
    rule.getEcsRuleList(this.userId).then(res => {
      this.ruleList = res.data
      this.isReady = true
      this.ruleLoading = false
    })
  },
  data () {
    return {
      userId: '1072760173225591',
      instanceId: '',
      activeTab: 'instance',
      instanceList: [],
      ruleList: [],
      isReady: false,
      loading: false,
      ruleLoading: false
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
    },
    refreshEcs () {
      this.loading = true
      ecsInfo.refreshInstances(this.userId).then(res => {
        if (res.data.code === 400) {
          this.loading = false
          this.$message(res.data.message)
        } else {
          this.instanceList = res.data
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
    refreshRules () {
      this.ruleLoading = true
      rule.refreshRules(this.userId, 'ECS').then(res => {
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
  /*.search {*/
  /*  display: flex;*/
  /*}*/
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
