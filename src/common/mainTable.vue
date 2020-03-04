<template>
  <el-tabs type="border-card" v-model="activeTab">
    <el-tab-pane label="实例列表" name="instance" :key="activeTab">
      <div class="search">
        <el-input class="elInput" placeholder="输入IP、主机名称或实例ID进行搜索"/>
        <el-button>搜索</el-button>
        <el-button>同步主机信息</el-button>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="instanceList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="实例name/主机名"
            width="120">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column
            label="插件状态（全部）"
            width="120">
            <template slot-scope="scope">{{ scope.row.plugins }}</template>
          </el-table-column>
          <el-table-column
            label="Agent版本">
            <template slot-scope="scope">{{ scope.row.version }}</template>
          </el-table-column>
          <el-table-column
            label="所在地域"
            width="120">
            <template slot-scope="scope">{{ scope.row.origin }}</template>
          </el-table-column>
          <el-table-column
            label="IP"
            width="120">
            <template slot-scope="scope">{{ scope.row.IP }}</template>
          </el-table-column>
          <el-table-column
            label="网络类型"
            width="120">
            <template slot-scope="scope">{{ scope.row.netWork }}</template>
          </el-table-column>
          <el-table-column
            label="CPU使用率"
            width="120">
            <template slot-scope="scope">{{ scope.row.cpuPerc }}</template>
          </el-table-column>
          <el-table-column
            label="内存使用率"
            width="120">
            <template slot-scope="scope">{{ scope.row.menmoryPerc }}</template>
          </el-table-column>
          <el-table-column
            label="磁盘使用率"
            width="120">
            <template slot-scope="scope">{{ scope.row.diskPerc }}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <el-link style="color: blue">监控图表报警规则</el-link>
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="报警规则" name="warn" :key="warn">报警规则</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'mainTable',
  data () {
    return {
      activeTab: 'instance',
      instanceList: [{
        name: '1234',
        plugins: 'running',
        version: '2.1.1',
        origin: 'south',
        IP: '127.0.0.1',
        netWork: 'private',
        cpuPerc: '1.73%',
        menmoryPerc: '2.22%',
        diskPerc: '4.33%',
        operation: 'ii'
      }]
    }
  }
}
</script>

<style scoped>

</style>
