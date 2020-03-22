<template>
  <div id="rdsMonitor">
    <big-chart :visible="dialogVisible" :chart-option="chartOption"/>
    <el-row>
      <el-col :span="24"><el-page-header @back="goBack" :content="'实例: ' + dBInstanceId"/></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><time-picker @timeConfirm="getTime"/></el-col>
    </el-row>
    <el-card class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>CPU/内存</span>
      </div>
      <div class="group1">
        <div id="cpuUsageChart" style="width: 100%;height:300px;"></div>
<!--        <span class="showBigGraph">查看大图</span>-->
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

import timePicker from '../../../common/timePicker'
import bigChart from '../../../common/echarts/bigChart'

export default {
  name: 'rdsMonitor',
  components: {
    timePicker,
    bigChart
  },
  mounted () {
    this.initCharts()
    this.refreshData(this.userId, this.dBInstanceId)
  },
  created () {
    myChart.create(this)
    this.userId = this.$route.params.userId
    this.dBInstanceId = this.$route.params.dBInstanceId
    this.endTime = moment().valueOf()
    this.startTime = moment(this.endTime).add(-1, 'h').valueOf()
    this.interval = 1
  },
  data () {
    return {
      userId: '',
      dBInstanceId: '',
      startTime: '',
      endTime: '',
      interval: '',
      cpuUsage: {},
      memoryUsage: {},
      diskUsage: {},
      iopsUsage: {},
      connectionUsage: {},
      dataDelay: {},
      dialogVisible: false,
      chartOption: {}
    }
  },
  methods: {
    showBig (option) {
      this.dialogVisible = true
      this.chartOption = option
    },
    getTime (times) {
      this.startTime = times[0]
      this.endTime = times[1]
      this.interval = times[2]
      this.refreshData(this.userId, this.dBInstanceId)
    },
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
      let endTime = this.endTime
      let startTime = this.startTime
      let interval = this.interval
      let legendNames = ['平均值', '最大值', '最小值']
      rdsMetric.getCpuUsage(userId, dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(legendNames, dataPoints)
        myChart.drawLines(this.cpuUsage, myChart.getChartOption('CPU使用率', legendNames, lines, myChart.mapXTimes(res.data)))
      })
      rdsMetric.getMemoryUsage(userId, dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(legendNames, dataPoints)
        myChart.drawLines(this.memoryUsage, myChart.getChartOption('内存使用率', legendNames, lines, myChart.mapXTimes(res.data)))
      })
      rdsMetric.getDiskUsage(userId, dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(legendNames, dataPoints)
        myChart.drawLines(this.diskUsage, myChart.getChartOption('磁盘使用率', legendNames, lines, myChart.mapXTimes(res.data)))
      })
      rdsMetric.getIopsUsage(userId, dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(legendNames, dataPoints)
        myChart.drawLines(this.iopsUsage, myChart.getChartOption('IOPS使用率', legendNames, lines, myChart.mapXTimes(res.data)))
      })
      rdsMetric.getConnectionUsage(userId, dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(legendNames, dataPoints)
        myChart.drawLines(this.connectionUsage, myChart.getChartOption('连接数使用率', legendNames, lines, myChart.mapXTimes(res.data)))
      })
      rdsMetric.getDataDelay(userId, dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(legendNames, dataPoints)
        myChart.drawLines(this.dataDelay, myChart.getChartOption('只读实例延迟', legendNames, lines, myChart.mapXTimes(res.data)))
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
  .showBigGraph {
    background: #0099cc;
    color: #fff;
    display: inline-block;
    height: 24px;
    line-height: 24px;
    padding: 0 15px;
    cursor: pointer;
  }
</style>
