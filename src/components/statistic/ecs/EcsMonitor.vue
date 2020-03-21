<template>
  <div id="ecsMonitor">
    <el-page-header @back="goBack" :content="'实例: ' + instanceId">
    </el-page-header>
<!--    <el-row>-->
<!--&lt;!&ndash;      <el-col :span="12"><el-button class="searchBtn">返回实例列表</el-button></el-col>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-col :span="12"> <span class="bucket-name"></span></el-col>&ndash;&gt;-->
<!--    </el-row>-->
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
  </div>
</template>

<script>
import ecsMetric from '../../../api/ecs/EcsMetric'
import myChart from '../../../common/echarts/myChart'
import moment from 'moment'

export default {
  name: 'ecsMonitor',
  mounted () {
    this.initCharts()
    this.showLoading()
    this.refreshData(this.userId, this.instanceId)
  },
  created () {
    this.userId = this.$route.params.userId
    this.instanceId = this.$route.params.instanceId
  },
  data () {
    return {
      userId: '',
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
    goBack () {
      this.$router.back()
    },
    getCpu (userId, instanceId, startTime, endTime, interval) {
      Promise.all([
        ecsMetric.getCpuTotal(userId, instanceId, startTime, endTime, interval),
        ecsMetric.getCpuSystem(userId, instanceId, startTime, endTime, interval),
        ecsMetric.getCpuUser(userId, instanceId, startTime, endTime, interval)]).then(value => {
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
    getLoad (userId, instanceId, startTime, endTime, interval) {
      Promise.all([
        ecsMetric.getLoad1m(userId, instanceId, startTime, endTime, interval),
        ecsMetric.getLoad5m(userId, instanceId, startTime, endTime, interval),
        ecsMetric.getLoad15m(userId, instanceId, startTime, endTime, interval)]).then(value => {
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
    getDiskRate (userId, instanceId, startTime, endTime, interval) {
      Promise.all([
        ecsMetric.getDiskReadRate(userId, instanceId, startTime, endTime, interval),
        ecsMetric.getDiskWriteRate(userId, instanceId, startTime, endTime, interval)]).then(value => {
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
    getDiskIops (userId, instanceId, startTime, endTime, interval) {
      Promise.all([
        ecsMetric.getDiskReadIOPS(userId, instanceId, startTime, endTime, interval),
        ecsMetric.getDiskWriteIOPS(userId, instanceId, startTime, endTime, interval)]).then(value => {
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
    getNetBPS (userId, instanceId, startTime, endTime, interval) {
      Promise.all([
        ecsMetric.getNetInBPS(userId, instanceId, startTime, endTime, interval),
        ecsMetric.getNetOutBPS(userId, instanceId, startTime, endTime, interval)]).then(value => {
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
    getNetPPS (userId, instanceId, startTime, endTime, interval) {
      Promise.all([
        ecsMetric.getNetInPPS(userId, instanceId, startTime, endTime, interval),
        ecsMetric.getNetOutPPS(userId, instanceId, startTime, endTime, interval)]).then(value => {
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
    refreshData (userId, instanceId) {
      this.showLoading()
      let endTime = new Date().valueOf()
      let startTime = moment(endTime).add(-50, 'd').valueOf()
      let interval = moment.duration(60, 'minutes').as('minutes')
      this.getCpu(userId, instanceId, startTime, endTime, interval)
      this.getLoad(userId, instanceId, startTime, endTime, interval)
      this.getDiskRate(userId, instanceId, startTime, endTime, interval)
      this.getDiskIops(userId, instanceId, startTime, endTime, interval)
      this.getNetBPS(userId, instanceId, startTime, endTime, interval)
      this.getNetPPS(userId, instanceId, startTime, endTime, interval)
      ecsMetric.getMemory(userId, instanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['maximum', 'minimum', 'average']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.memory, myChart.getChartOption('内存使用率', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      ecsMetric.getDiskInode(userId, instanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['maximum', 'minimum', 'average']
        let dataPoints = myChart.mapDataPoints(res, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.diskInode, myChart.getChartOption('磁盘inode使用率', dataNames, lines, myChart.mapXTimes(res)))
      })
      ecsMetric.getTcpConnection(userId, instanceId, startTime, endTime, interval).then(res => {
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
</style>
