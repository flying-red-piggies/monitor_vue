<template>
  <div>
    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane label="实例列表" name="instance">
        <div class="search">
          <el-input class="elInput" placeholder="输入实例id或名称进行搜索"/>
          <el-button>搜索</el-button>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="instanceList"
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
              <router-link slot-scope="scope" style="color: blue" :to="{path:'/rdsMonitor', query:{dBInstanceId: scope.row.dBInstanceId}}">监控图表</router-link>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="报警规则" name="warn" :key="warn">报警规则</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import rdsInfo from '../../../api/rds/RdsInfo'
export default {
  name: 'rdsMain',
  created () {
    rdsInfo.getInstances().then(res => {
      this.instanceList = res.data
      console.log(res.data)
    })
  },
  data () {
    return {
      activeTab: 'instance',
      instanceList: []
    }
  }
}
</script>

<style scoped>

</style>
