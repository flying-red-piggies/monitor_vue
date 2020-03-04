<template>
  <div id="rdsMonitor">
    <el-select v-model="dBInstanceId" placeholder="请选择"
               @change="refreshData(dBInstanceId)">
      <el-option
        v-for="item in dbInstances"
        :key="item.dBInstanceId"
        :value="item.dBInstanceId">
      </el-option>
    </el-select>
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
import rdsInfo from '@/api/rds/RdsInfo'
import rdsMetric from '@/api/rds/RdsMetric'
import moment from 'moment'

export default {
  name: 'rdsMonitor',
  mounted () {
    this.initCharts()
    this.showLoading()
  },
  created () {
    rdsInfo.getInstances().then(res => {
      this.dbInstances = res.data
      this.dBInstanceId = res.data[0].dBInstanceId
      this.refreshData(this.dBInstanceId)
    })
  },
  data () {
    return {
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
    initCharts () {
      this.cpuUsage = this.$echarts.init(document.getElementById('cpuUsageChart'))
      this.memoryUsage = this.$echarts.init(document.getElementById('memoryUsageChart'))
      this.diskUsage = this.$echarts.init(document.getElementById('diskUsageChart'))
      this.iopsUsage = this.$echarts.init(document.getElementById('iopsUsageChart'))
      this.connectionUsage = this.$echarts.init(document.getElementById('connectionUsageChart'))
      this.dataDelay = this.$echarts.init(document.getElementById('dataDelayChart'))
    },
    showLoading () {
      this.cpuUsage.showLoading({
        text: '正在加载'
      })
      this.memoryUsage.showLoading({
        text: '正在加载'
      })
      this.diskUsage.showLoading({
        text: '正在加载'
      })
      this.iopsUsage.showLoading({
        text: '正在加载'
      })
      this.connectionUsage.showLoading({
        text: '正在加载'
      })
      this.dataDelay.showLoading({
        text: '正在加载'
      })
    },
    mapDataPoints (resData, dataNames) {
      let dataPoints = []
      for (let i = 0; i < dataNames.length; i++) {
        dataPoints.push(resData.map(function (item) {
          return item[dataNames[i]]
        }))
      }
      return dataPoints
    },
    mapXTimes (resData) {
      return resData.map(function (item) {
        return moment(item['timestamp']).format('MM/DD HH:mm')
      })
    },
    refreshData (dBInstanceId) {
      this.showLoading()
      let endTime = new Date().valueOf()
      let startTime = moment(endTime).add(-50, 'd').valueOf()
      let interval = moment.duration(5, 'minutes').as('minutes')
      rdsMetric.getCpuUsage(dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.cpuUsage, this.getChartOption('CPU使用率', dataNames, lines, this.mapXTimes(res.data)))
      })
      rdsMetric.getMemoryUsage(dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.memoryUsage, this.getChartOption('内存使用率', dataNames, lines, this.mapXTimes(res.data)))
      })
      rdsMetric.getDiskUsage(dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.diskUsage, this.getChartOption('磁盘使用率', dataNames, lines, this.mapXTimes(res.data)))
      })
      rdsMetric.getIopsUsage(dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.iopsUsage, this.getChartOption('IOPS使用率', dataNames, lines, this.mapXTimes(res.data)))
      })
      rdsMetric.getConnectionUsage(dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.connectionUsage, this.getChartOption('连接数使用率', dataNames, lines, this.mapXTimes(res.data)))
      })
      rdsMetric.getDataDelay(dBInstanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['average', 'maximum', 'minimum']
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.dataDelay, this.getChartOption('只读实例延迟', dataNames, lines, this.mapXTimes(res.data)))
      })
    },
    getLines (names, dataPoints) {
      let series = []
      for (let i = 0; i < names.length; i++) {
        series.push({
          name: names[i],
          type: 'line',
          data: dataPoints[i]
        })
      }
      return series
    },
    getChartOption (chartName, dataNames, series, xTime) {
      return {
        backgroundColor: '#545c64',
        legend: {
          data: dataNames,
          inactiveColor: '#777',
          textStyle: {
            color: '#fff'
          }
        },
        title: {
          text: chartName,
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false,
            type: 'cross',
            lineStyle: {
              color: '#376df4',
              width: 2,
              opacity: 1
            }
          }
        },
        xAxis: {
          type: 'category',
          data: xTime,
          axisLine: {lineStyle: {color: '#8392A5'}}
        },
        yAxis: {
          scale: true,
          axisLine: {lineStyle: {color: '#8392A5'}},
          splitLine: {show: true}
        },
        grid: {
          bottom: 80
        },
        dataZoom: [{
          textStyle: {
            color: '#8392A5'
          },
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          dataBackground: {
            areaStyle: {
              color: '#8392A5'
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5'
            }
          },
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }, {
          type: 'inside'
        }],
        series: series
      }
    },
    drawLine (chart, option) {
      chart.setOption(option)
      chart.hideLoading()
    }
  }
}
</script>

<style scoped>
  .chartGroup {
    /*width: 100%;*/
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    background-color: #545c64;
    border-width: 0;
  }
  .group1,.group2,.group3 {
    display: flex;
    flex-direction: row;
    margin: 5px 5px 5px 0;
  }
</style>
