<template>
  <div id="rdsMonitor">
    <el-page-header @back="goBack" :content="'实例: ' + dBInstanceId">
    </el-page-header>
    <el-card class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>CPU/内存</span>
      </div>
      <div class="group1">
        <div id="cpuUsageChart" style="width: 100%;height:300px;"></div>
      </div>
      <div class="group2">
        <div id="memoryUsageChart" style="width: 100%;height:300px;"></div>
      </div>
    </el-card>
    <el-card class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>磁盘</span>
      </div>
      <div class="group1">
        <div id="diskUsageChart" style="width: 100%;height:300px;"></div>
      </div>
      <div class="group2">
        <div id="iopsUsageChart" style="width: 100%;height:300px;"></div>
      </div>
    </el-card>
    <el-card class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>连接数</span>
      </div>
      <div class="group1">
        <div id="connectionUsageChart" style="width: 100%;height:300px;"></div>
      </div>
    </el-card>
    <el-card class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>只读实例延迟</span>
      </div>
      <div class="group1">
        <div id="dataDelayChart" style="width: 100%;height:300px;"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import rdsMetric from '../../../api/rds/RdsMetric'
import myChart from '../../../common/echarts/myChart'
import moment from 'moment'

export default {
  name: 'rdsMonitor',
  mounted () {
    this.initCharts()
    this.showLoading()
    this.refreshData(this.userId, this.dBInstanceId)
  },
  created () {
    this.userId = this.$route.params.userId
    this.dBInstanceId = this.$route.params.dBInstanceId
  },
  data () {
    return {
      userId: '',
      dbInstances: [],
      dBInstanceId: '',
      cpuUsage: {},
      memoryUsage: {},
      diskUsage: {},
      iopsUsage: {},
      connectionUsage: {},
      dataDelay: {}
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    initCharts () {
      this.cpuUsage = this.$echarts.init(document.getElementById('cpuUsageChart'))
      this.memoryUsage = this.$echarts.init(document.getElementById('memoryUsageChart'))
      this.diskUsage = this.$echarts.init(document.getElementById('diskUsageChart'))
      this.iopsUsage = this.$echarts.init(document.getElementById('iopsUsageChart'))
      this.connectionUsage = this.$echarts.init(document.getElementById('connectionUsageChart'))
      this.dataDelay = this.$echarts.init(document.getElementById('dataDelayChart'))
    },
    showLoading () {
      let loading = myChart.loading
      this.cpuUsage.showLoading(loading)
      this.memoryUsage.showLoading(loading)
      this.diskUsage.showLoading(loading)
      this.iopsUsage.showLoading(loading)
      this.connectionUsage.showLoading(loading)
      this.dataDelay.showLoading(loading)
    },
    refreshData (userId, dBInstanceId) {
      this.showLoading()
      let endTime = new Date().valueOf()
      let startTime = moment(endTime).add(-50, 'd').valueOf()
      let interval = moment.duration(5, 'minutes').as('minutes')
      rdsMetric.getCpuUsage(userId, dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.cpuUsage, myChart.getChartOption('CPU使用率', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      rdsMetric.getMemoryUsage(userId, dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.memoryUsage, myChart.getChartOption('内存使用率', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      rdsMetric.getDiskUsage(userId, dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.diskUsage, myChart.getChartOption('磁盘使用率', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      rdsMetric.getIopsUsage(userId, dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.iopsUsage, myChart.getChartOption('IOPS使用率', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      rdsMetric.getConnectionUsage(userId, dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.connectionUsage, myChart.getChartOption('连接数使用率', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      rdsMetric.getDataDelay(userId, dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.dataDelay, myChart.getChartOption('只读实例延迟', dataNames, lines, myChart.mapXTimes(res.data)))
      })
    }
  }
}
</script>

<style scoped>
  .group1,.group2,.group3 {
    display: flex;
    flex-direction: row;
    margin: 5px 5px 5px 0;
  }
</style>
