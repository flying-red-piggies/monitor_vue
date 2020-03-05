<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="实例列表" name="instance" @click="tabChange('instance')">
        <div class="search">
          <el-input class="elInput" placeholder="输入实例ID或名称进行搜索"/>
          <el-button>搜索</el-button>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="instanceList"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="实例ID/实例名称"
              width="120">
              <template slot-scope="scope">{{ scope.row.instanceId + '/'}}</template>
              <template slot-scope="scope">{{ scope.row.instanceName }}</template>
            </el-table-column>
<!--            <el-table-column-->
<!--              label="实例名称"i-->
<!--              width="120">-->
<!--              -->
<!--            </el-table-column>-->
            <el-table-column
              label="运行状态">
              <template slot-scope="scope">{{ scope.row.status }}</template>
            </el-table-column>
            <el-table-column
              label="所在地域"
              width="120">
              <template slot-scope="scope">{{ scope.row.regionId}}</template>
            </el-table-column>
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
      <el-tab-pane label="报警规则" name="warn" @click="tabChange('warn')">报警规则</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ecsInfo from '../../../api/ecs/EcsInfo'

export default {
  name: 'ecsMain',
  created () {
    ecsInfo.getInstances().then(res => {
      this.instanceList = res.data
    })
  },
  data () {
    return {
      activeTab: 'instance',
      instanceList: []
    }
  },
  methods: {
    tabChange (activeTabName) {
      this.activeTab = activeTabName
    },
    showChart: function (scopedRow) {
      this.$router.push({name: 'ecsMonitor', params: {instanceId: scopedRow.instanceId}})
    }
  }
}
</script>

<style scoped>
  .search {
    display: flex;
  }
</style>
