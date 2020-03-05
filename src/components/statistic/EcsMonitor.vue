<template>
  <div id="ecsMonitor">
<!--    <el-form-item label="选择实例"/>-->
<!--    <el-select v-model="instanceId" placeholder="请选择"-->
<!--               @change="refreshData(instanceId)"-->
<!--    style="margin-bottom: 20px;">-->
<!--      <el-option-->
<!--        v-for="item in instances"-->
<!--        :key="item.instanceId"-->
<!--        :value="item.instanceId">-->
<!--      </el-option>-->
<!--    </el-select>-->
    <el-card class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>CPU</span>
      </div>
      <div class="group1">
        <div id="cpuChart" style="width: 100%;height: 300px;"></div>
      </div>
    </el-card>
    <el-card shadow="always" class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>系统负载</span>
      </div>
      <div class="group2">
        <div id="loadMChart" style="width: 100%;height:300px;"></div>
      </div>
    </el-card>
<!--    -->
<!--    memory自己一组-->
    <el-card class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>内存</span>
      </div>
      <div class="group1">
        <div id="memoryChart" style="width: 100%;height:300px;"></div>
      </div>
    </el-card>
<!--    -->
<!--    disk五个一组-->
    <el-card class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>硬盘</span>
      </div>
      <div>
        <div class="group1">
          <div id="diskInodeChart" style="width: 100%;height:300px;"></div>
        </div>
        <div class="group2">
          <div id="diskRateChart" style="width: 100%;height:300px;"></div>
        </div>
        <div class="group3">
          <div id="diskIopsChart" style="width: 100%;height:300px;"></div>
        </div>
      </div>
    </el-card>
<!--    -->
<!--    最后五个一组-->
    <el-card class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>网络</span>
      </div>
      <div>
        <div class="group1">
          <div id="tcpConnectionChart" style="width: 100%;height:300px;"></div>
        </div>
        <div class="group2">
          <div id="netbpsChart" style="width: 100%;height:300px;"></div>
        </div>
        <div class="group3">
          <div id="netPpsChart" style="width: 100%;height:300px;"></div>
        </div>
      </div>
    </el-card>
    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane label="实例列表" name="instance" :key="instance">
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
  </div>
</template>

<script>
import ecsMetric from '../../api/ecs/EcsMetric'
import myChart from '../../common/echarts/myChart'
import moment from 'moment'

export default {
  name: 'ecsMonitor',
  mounted () {
    this.initCharts()
    this.showLoading()
    this.refreshData(this.instanceId)
  },
  created () {
    // ecsInfo.getInstances().then(res => {
    //   console.log(res.data)
    //   this.instances = res.data
    //   this.instanceId = res.data[0].instanceId
    //
    // })
    this.instanceId = this.$route.query.instanceId
  },
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
      }],
      instanceId: '',
      cpu: {},
      loadM: {},
      diskRate: {},
      diskIops: {},
      netbps: {},
      netPps: {},
      memory: {},
      diskInode: {},
      tcpConnection: {}
    }
  },
  methods: {
    getCpu (instanceId, startTime, endTime, interval) {
      Promise.all([
        ecsMetric.getCpuTotal(instanceId, startTime, endTime, interval),
        ecsMetric.getCpuSystem(instanceId, startTime, endTime, interval),
        ecsMetric.getCpuUser(instanceId, startTime, endTime, interval)]).then(value => {
        let cpuTotal = value[0].map(function (item) {
          return item.average
        })
        let cpuSystem = value[1].map(function (item) {
          return item.average
        })
        let cpuUser = value[2].map(function (item) {
          return item.average
        })
        let time = myChart.mapXTimes(value[0])
        let dataNames = ['CPU总使用率', '内核空间使用率', '用户空间使用率']
        let lines = myChart.getLines(dataNames, [cpuTotal, cpuUser, cpuSystem])
        myChart.drawLines(this.cpu, myChart.getChartOption('CPU使用率', dataNames, lines, time))
      })
    },
    getLoad (instanceId, startTime, endTime, interval) {
      Promise.all([
        ecsMetric.getLoad1m(instanceId, startTime, endTime, interval),
        ecsMetric.getLoad5m(instanceId, startTime, endTime, interval),
        ecsMetric.getLoad15m(instanceId, startTime, endTime, interval)]).then(value => {
        let load1m = value[0].map(function (item) {
          return item.average
        })
        let load5m = value[1].map(function (item) {
          return item.average
        })
        let load15m = value[2].map(function (item) {
          return item.average
        })
        let time = myChart.mapXTimes(value[0])
        let dataNames = ['过去1分钟', '过去5分钟', '过去15分钟']
        let lines = myChart.getLines(dataNames, [load1m, load5m, load15m])
        myChart.drawLines(this.loadM, myChart.getChartOption('系统平均负载', dataNames, lines, time))
      })
    },
    getDiskRate (instanceId, startTime, endTime, interval) {
      Promise.all([
        ecsMetric.getDiskReadRate(instanceId, startTime, endTime, interval),
        ecsMetric.getDiskWriteRate(instanceId, startTime, endTime, interval)]).then(value => {
        let read = value[0].map(function (item) {
          return item.average
        })
        let write = value[1].map(function (item) {
          return item.average
        })
        let time = myChart.mapXTimes(value[0])
        let dataNames = ['读字节数', '写字节数']
        let lines = myChart.getLines(dataNames, [read, write])
        myChart.drawLines(this.diskRate, myChart.getChartOption('磁盘读写速率(Bps)', dataNames, lines, time))
      })
    },
    getDiskIops (instanceId, startTime, endTime, interval) {
      Promise.all([
        ecsMetric.getDiskReadIOPS(instanceId, startTime, endTime, interval),
        ecsMetric.getDiskWriteIOPS(instanceId, startTime, endTime, interval)]).then(value => {
        let read = value[0].map(function (item) {
          return item.average
        })
        let write = value[1].map(function (item) {
          return item.average
        })
        let time = myChart.mapXTimes(value[0])
        let dataNames = ['读IOPS', '写IOPS']
        let lines = myChart.getLines(dataNames, [read, write])
        myChart.drawLines(this.diskIops, myChart.getChartOption('磁盘读写请求数', dataNames, lines, time))
      })
    },
    getNetBPS (instanceId, startTime, endTime, interval) {
      Promise.all([
        ecsMetric.getNetInBPS(instanceId, startTime, endTime, interval),
        ecsMetric.getNetOutBPS(instanceId, startTime, endTime, interval)]).then(value => {
        let inB = value[0].map(function (item) {
          return item.average
        })
        let outB = value[1].map(function (item) {
          return item.average
        })
        let time = myChart.mapXTimes(value[0])
        let dataNames = ['流入速率', '流出速率']
        let lines = myChart.getLines(dataNames, [inB, outB])
        myChart.drawLines(this.netbps, myChart.getChartOption('网络流入流出速率(bps)', dataNames, lines, time))
      })
    },
    getNetPPS (instanceId, startTime, endTime, interval) {
      Promise.all([
        ecsMetric.getNetInPPS(instanceId, startTime, endTime, interval),
        ecsMetric.getNetOutPPS(instanceId, startTime, endTime, interval)]).then(value => {
        let inP = value[0].map(function (item) {
          return item.average
        })
        let outP = value[1].map(function (item) {
          return item.average
        })
        let time = myChart.mapXTimes(value[0])
        let dataNames = ['流入数', '流出数']
        let lines = myChart.getLines(dataNames, [inP, outP])
        myChart.drawLines(this.netPps, myChart.getChartOption('网络流入流出数据包(pps)', dataNames, lines, time))
      })
    },
    initCharts () {
      this.cpu = this.$echarts.init(document.getElementById('cpuChart'))
      this.loadM = this.$echarts.init(document.getElementById('loadMChart'))
      this.memory = this.$echarts.init(document.getElementById('memoryChart'))
      this.diskInode = this.$echarts.init(document.getElementById('diskInodeChart'))
      this.diskRate = this.$echarts.init(document.getElementById('diskRateChart'))
      this.diskIops = this.$echarts.init(document.getElementById('diskIopsChart'))
      this.netbps = this.$echarts.init(document.getElementById('netbpsChart'))
      this.netPps = this.$echarts.init(document.getElementById('netPpsChart'))
      this.tcpConnection = this.$echarts.init(document.getElementById('tcpConnectionChart'))
    },
    showLoading () {
      let loading = myChart.loading
      this.cpu.showLoading(loading)
      this.loadM.showLoading(loading)
      this.memory.showLoading(loading)
      this.diskInode.showLoading(loading)
      this.diskRate.showLoading(loading)
      this.diskIops.showLoading(loading)
      this.netbps.showLoading(loading)
      this.netPps.showLoading(loading)
      this.tcpConnection.showLoading(loading)
    },
    refreshData (instanceId) {
      this.showLoading()
      let endTime = new Date().valueOf()
      let startTime = moment(endTime).add(-50, 'd').valueOf()
      let interval = moment.duration(60, 'minutes').as('minutes')
      this.getCpu(instanceId, startTime, endTime, interval)
      this.getLoad(instanceId, startTime, endTime, interval)
      this.getDiskRate(instanceId, startTime, endTime, interval)
      this.getDiskIops(instanceId, startTime, endTime, interval)
      this.getNetBPS(instanceId, startTime, endTime, interval)
      this.getNetPPS(instanceId, startTime, endTime, interval)
      ecsMetric.getMemory(instanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['maximum', 'minimum', 'average']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.memory, myChart.getChartOption('内存使用率', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      ecsMetric.getDiskInode(instanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['maximum', 'minimum', 'average']
        let dataPoints = myChart.mapDataPoints(res, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.diskInode, myChart.getChartOption('磁盘inode使用率', dataNames, lines, myChart.mapXTimes(res)))
      })
      ecsMetric.getTcpConnection(instanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['TCP_TOTAL', 'ESTABLISHED', 'NON_ESTABLISHED']
        let total = res.data.filter(function (item) {
          return item.state === 'TCP_TOTAL'
        }).map(function (item) {
          return item.average
        })
        let estb = res.data.filter(function (item) {
          return item.state === 'ESTABLISHED'
        }).map(function (item) {
          return item.average
        })
        let nestb = res.data.filter(function (item, index, arr) {
          return item.state === 'NON_ESTABLISHED'
        }).map(function (item) {
          return item.average
        })
        let times = res.data.filter(function (item, index, arr) {
          return index % 3 === 0
        }).map(function (item) {
          return moment(item.timestamp).format('YYYY/MM/DD HH:mm')
        })
        let lines = myChart.getLines(dataNames, [total, estb, nestb])
        myChart.drawLines(this.tcpConnection, myChart.getChartOption('TCP连接数', dataNames, lines, times))
      })
    }
  }
}
</script>

<style scoped>
  .titleTab {
    padding: 10px 0 10px 10px;
    /*background-color: #efefef;*/
    width: 800px;
  }
  .group1,.group2,.group3 {
    display: flex;
    flex-direction: row;
    margin: 5px 5px 5px 0;
  }
  .search {
    display: flex;
  }
</style>
