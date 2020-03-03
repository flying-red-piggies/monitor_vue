<template>
  <div id="ecsMonitor">
    <el-select v-model="instanceId" placeholder="请选择"
               @change="refreshData(instanceId)"
    style="margin-bottom: 20px;">
      <el-option
        v-for="item in instances"
        :key="item.instanceId"
        :value="item.instanceId">
      </el-option>
    </el-select>
    <el-card class="box-card chartGroup">
      <div class="titleTab">CPU</div>
      <div class="group1">
        <div id="cpuChart" style="width: 100%;height: 300px;"></div>
      </div>
    </el-card>
<!--    cpu三个一组-->
<!--    <el-card class="box-card chartGroup">-->
<!--      <div class="titleTab">CPU</div>-->
<!--      <div>-->
<!--        <div class="group1">-->
<!--          <div id="cpuTotalChart" style="width: 100%;height: 300px;"></div>-->
<!--        </div>-->
<!--        <div class="group2">-->
<!--          <div id="cpuSystemChart" style="width: 50%;height: 300px;"></div>-->
<!--          <div id="cpuUserChart" style="width: 50%;height: 300px;"></div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-card>-->
<!--    -->
    <el-card shadow="always" class="box-card">
      <div class="titleTab">系统负载</div>
      <div class="group2">
        <div id="loadMChart" style="width: 800px;height:300px;"></div>
<!--        <div id="load1MChart" style="width: 800px;height:300px;"></div>-->
      </div>
<!--      <div class="group2">-->
<!--        <div id="load5MChart" style="width: 400px;height:300px;"></div>-->
<!--        <div id="load15MChart" style="width: 400px;height:300px;"></div>-->
<!--      </div>-->
    </el-card>

<!--    -->
<!--    memory自己一组-->
    <el-card class="box-card chartGroup">
      <div class="titleTab">内存</div>
      <div class="group1">
        <div id="memoryChart" style="width: 800px;height:300px;"></div>
      </div>
    </el-card>
<!--    -->
<!--    disk五个一组-->
    <el-card class="box-card chartGroup">
      <div class="titleTab">硬盘</div>
      <div>
        <div class="group1">
          <div id="diskInodeChart" style="width: 800px;height:300px;"></div>
        </div>
        <div class="group2">
          <div id="diskRateChart" style="width: 800px;height:300px;"></div>
<!--          <div id="diskRRateChart" style="width: 400px;height:300px;"></div>-->
<!--          <div id="diskWRateChart" style="width: 400px;height:300px;"></div>-->
        </div>
        <div class="group3">
          <div id="diskIopsChart" style="width: 800px;height:300px;"></div>
<!--          <div id="diskRIopsChart" style="width: 400px;height:300px;"></div>-->
<!--          <div id="diskWIopsChart" style="width: 400px;height:300px;"></div>-->
        </div>
      </div>
    </el-card>
<!--    -->
<!--    最后五个一组-->
    <div class="titleTab">网络</div>
    <el-card class="box-card chartGroup">
      <div>
        <div class="group1">
          <div id="tcpConnectionChart" style="width: 800px;height:300px;"></div>

        </div>
        <div class="group2">
          <div id="netbpsChart" style="width: 800px;height:300px;"></div>
<!--          <div id="netIRateChart" style="width: 400px;height:300px;"></div>-->
<!--          <div id="netORateChart" style="width: 400px;height:300px;"></div>-->
        </div>
        <div class="group3">
          <div id="netPpsChart" style="width: 800px;height:300px;"></div>
<!--          <div id="netIPpsChart" style="width: 400px;height:300px;"></div>-->
<!--          <div id="netOPpsChart" style="width: 400px;height:300px;"></div>-->
        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
import ecsInfo from '@/api/ecs/ecsInfo'
import ecsMetric from '@/api/ecs/ecsMetric'
import moment from 'moment'
export default {
  name: 'ecsMonitor',
  mounted () {
    this.initCharts()
    this.showLoading()
  },
  created () {
    ecsInfo.getInstances().then(res => {
      console.log(res.data)
      this.instances = res.data
      this.instanceId = res.data[0].instanceId
      this.refreshData(this.instanceId)
    })
  },
  data () {
    return {
      instances: [],
      instanceId: '',
      cpu: {},
      loadM: {},
      diskRate: {},
      diskIops: {},
      netbps: {},
      netPps: {},
      // cpuTotal: {},
      // cpuSystem: {},
      // cpuUser: {},
      // load1M: {},
      // load5M: {},
      // load15M: {},
      memory: {},
      diskInode: {},
      // diskRRate: {},
      // diskWRate: {},
      // diskRIops: {},
      // diskWIops: {},
      tcpConnection: {}
      // netIRate: {},
      // netORate: {},
      // netIPps: {},
      // netOPps: {}
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
        let time = value[0].map(function (item) {
          return moment(item.timestamp).format('MM/DD HH:mm')
        })
        let dataNames = ['CPU总使用率', '内核空间使用率', '用户空间使用率']
        let lines = this.getLines(dataNames, [cpuTotal, cpuUser, cpuSystem])
        this.drawLines(this.cpu, this.getChartOption('CPU使用率', dataNames, lines, time))
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
        let time = value[0].map(function (item) {
          return moment(item.timestamp).format('MM/DD HH:mm')
        })
        let dataNames = ['过去1分钟', '过去5分钟', '过去15分钟']
        let lines = this.getLines(dataNames, [load1m, load5m, load15m])
        this.drawLines(this.loadM, this.getChartOption('系统平均负载', dataNames, lines, time))
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
        let time = value[0].map(function (item) {
          return moment(item.timestamp).format('MM/DD HH:mm')
        })
        let dataNames = ['读字节数', '写字节数']
        let lines = this.getLines(dataNames, [read, write])
        this.drawLines(this.diskRate, this.getChartOption('磁盘读写速率(Bps)', dataNames, lines, time))
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
        let time = value[0].map(function (item) {
          return moment(item.timestamp).format('MM/DD HH:mm')
        })
        let dataNames = ['读IOPS', '写IOPS']
        let lines = this.getLines(dataNames, [read, write])
        this.drawLines(this.diskIops, this.getChartOption('磁盘读写请求数', dataNames, lines, time))
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
        let time = value[0].map(function (item) {
          return moment(item.timestamp).format('MM/DD HH:mm')
        })
        let dataNames = ['流入速率', '流出速率']
        let lines = this.getLines(dataNames, [inB, outB])
        this.drawLines(this.netbps, this.getChartOption('网络流入流出速率(bps)', dataNames, lines, time))
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
        let time = value[0].map(function (item) {
          return moment(item.timestamp).format('MM/DD HH:mm')
        })
        let dataNames = ['流入数', '流出数']
        let lines = this.getLines(dataNames, [inP, outP])
        this.drawLines(this.netPps, this.getChartOption('网络流入流出数据包(pps)', dataNames, lines, time))
      })
    },
    initCharts () {
      this.cpu = this.$echarts.init(document.getElementById('cpuChart'))
      // this.cpuTotal = this.$echarts.init(document.getElementById('cpuTotalChart'))
      // this.cpuSystem = this.$echarts.init(document.getElementById('cpuSystemChart'))
      // this.cpuUser = this.$echarts.init(document.getElementById('cpuUserChart'))
      // this.load1M = this.$echarts.init(document.getElementById('load1MChart'))
      // this.load5M = this.$echarts.init(document.getElementById('load5MChart'))
      // this.load15M = this.$echarts.init(document.getElementById('load15MChart'))
      this.loadM = this.$echarts.init(document.getElementById('loadMChart'))
      this.memory = this.$echarts.init(document.getElementById('memoryChart'))
      this.diskInode = this.$echarts.init(document.getElementById('diskInodeChart'))
      this.diskRate = this.$echarts.init(document.getElementById('diskRateChart'))
      this.diskIops = this.$echarts.init(document.getElementById('diskIopsChart'))
      // this.diskRRate = this.$echarts.init(document.getElementById('diskRRateChart'))
      // this.diskWRate = this.$echarts.init(document.getElementById('diskWRateChart'))
      // this.diskRIops = this.$echarts.init(document.getElementById('diskRIopsChart'))
      // this.diskWIops = this.$echarts.init(document.getElementById('diskWIopsChart'))
      this.netbps = this.$echarts.init(document.getElementById('netbpsChart'))
      this.netPps = this.$echarts.init(document.getElementById('netPpsChart'))
      this.tcpConnection = this.$echarts.init(document.getElementById('tcpConnectionChart'))
      // this.netIRate = this.$echarts.init(document.getElementById('netIRateChart'))
      // this.netORate = this.$echarts.init(document.getElementById('netORateChart'))
      // this.netIPps = this.$echarts.init(document.getElementById('netIPpsChart'))
      // this.netOPps = this.$echarts.init(document.getElementById('netOPpsChart'))
    },
    showLoading () {
      this.cpu.showLoading({
        text: '正在加载'
      })
      this.loadM.showLoading({
        text: '正在加载'
      })
      // this.cpuTotal.showLoading({
      //   text: '正在加载'
      // })
      // this.cpuSystem.showLoading({
      //   text: '正在加载'
      // })
      // this.cpuUser.showLoading({
      //   text: '正在加载'
      // })
      // this.load1M.showLoading({
      //   text: '正在加载'
      // })
      // this.load5M.showLoading({
      //   text: '正在加载'
      // })
      // this.load15M.showLoading({
      //   text: '正在加载'
      // })
      this.memory.showLoading({
        text: '正在加载'
      })
      this.diskInode.showLoading({
        text: '正在加载'
      })
      this.diskRate.showLoading({
        text: '正在加载'
      })
      this.diskIops.showLoading({
        text: '正在加载'
      })
      // this.diskRRate.showLoading({
      //   text: '正在加载'
      // })
      // this.diskWRate.showLoading({
      //   text: '正在加载'
      // })
      // this.diskRIops.showLoading({
      //   text: '正在加载'
      // })
      // this.diskWIops.showLoading({
      //   text: '正在加载'
      // })
      this.netbps.showLoading({
        text: '正在加载'
      })
      this.netPps.showLoading({
        text: '正在加载'
      })
      this.tcpConnection.showLoading({
        text: '正在加载'
      })
      // this.netIRate.showLoading({
      //   text: '正在加载'
      // })
      // this.netORate.showLoading({
      //   text: '正在加载'
      // })
      // this.netIPps.showLoading({
      //   text: '正在加载'
      // })
      // this.netOPps.showLoading({
      //   text: '正在加载'
      // })
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
      // ecsMetric.getCpuTotal(instanceId, startTime, endTime, interval).then(res => {
      //   // console.log(res.data)
      //   // this.drawLine(this.cpuTotal, 'CPU总使用率', res.data)
      //   let dataNames = ['maximum', 'minimum', 'average']
      //   let dataPoints = this.mapDataPoints(res.data, dataNames)
      //   let lines = this.getLines(dataNames, dataPoints)
      //   this.drawLines(this.cpuTotal, this.getChartOption('CPU总使用率', dataNames, lines, this.mapXTimes(res.data)))
      // })
      // ecsMetric.getCpuSystem(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.cpuSystem, 'CPU内核空间使用率', res.data)
      // })
      // ecsMetric.getCpuUser(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.cpuUser, 'CPU用户空间使用率', res.data)
      // })
      // ecsMetric.getLoad1m(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.load1M, '系统平均负载(1分钟内)', res.data)
      // })
      // ecsMetric.getLoad5m(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.load5M, '系统平均负载(5分钟内)', res.data)
      // })
      // ecsMetric.getLoad15m(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.load15M, '系统平均负载(15分钟内)', res.data)
      // })
      ecsMetric.getMemory(instanceId, startTime, endTime, interval).then(res => {
        // this.drawLine(this.memory, '内存使用率', res.data)
        let dataNames = ['maximum', 'minimum', 'average']
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLines(this.memory, this.getChartOption('内存使用率', dataNames, lines, this.mapXTimes(res.data)))
      })
      ecsMetric.getDiskInode(instanceId, startTime, endTime, interval).then(res => {
        // this.drawLine(this.diskInode, '磁盘inode使用率', res.data)
        let dataNames = ['maximum', 'minimum', 'average']
        let dataPoints = this.mapDataPoints(res, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLines(this.diskInode, this.getChartOption('磁盘inode使用率', dataNames, lines, this.mapXTimes(res)))
      })
      // ecsMetric.getDiskReadRate(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.diskRRate, '磁盘读速率(Byte/s)', res.data)
      // })
      // ecsMetric.getDiskWriteRate(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.diskWRate, '磁盘写速率(Byte/s)', res.data)
      // })
      // ecsMetric.getDiskReadIOPS(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.diskRIops, '磁盘读IOPS', res.data)
      // })
      // ecsMetric.getDiskWriteIOPS(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.diskWIops, '磁盘写IOPS', res.data)
      // })
      // ecsMetric.getNetInBPS(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.netIRate, '下行带宽(bit/s)', res.data)
      // })
      // ecsMetric.getNetOutBPS(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.netORate, '上行带宽(bit/s)', res.data)
      // })
      // ecsMetric.getNetInPPS(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.netIPps, '网络流入数据包(packages/s)', res.data)
      // })
      // ecsMetric.getNetOutPPS(instanceId, startTime, endTime, interval).then(res => {
      //   this.drawLine(this.netOPps, '网络流出数据包(packages/s)', res.data)
      // })
      ecsMetric.getTcpConnection(instanceId, startTime, endTime, interval).then(res => {
        // this.drawLine('tcpConnectionChart', 'TCP连接数', res.data)
        // this.drawTcpConnection(this.tcpConnection, 'TCP连接数', res.data)
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
        let lines = this.getLines(dataNames, [total, estb, nestb])
        this.drawLines(this.tcpConnection, this.getChartOption('TCP连接数', dataNames, lines, times))
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
        backgroundColor: '#21202D',
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
    drawLines (chart, option) {
      chart.setOption(option)
      chart.hideLoading()
    },
    // drawLine (chart, chartName, metricArray) {
    //   let max = metricArray.map(function (item) {
    //     return item['maximum']
    //   })
    //   let min = metricArray.map(function (item) {
    //     return item['minimum']
    //   })
    //   let avg = metricArray.map(function (item) {
    //     return item['average']
    //   })
    //   let times = metricArray.map(function (item) {
    //     return moment(item['timestamp']).format('YYYY/MM/DD HH:mm')
    //   })
    //   let option = {
    //     backgroundColor: '#21202D',
    //     legend: {
    //       data: ['最大值', '最小值', '平均值'],
    //       inactiveColor: '#777',
    //       textStyle: {
    //         color: '#fff'
    //       }
    //     },
    //     title: {
    //       text: chartName,
    //       textStyle: {
    //         color: '#fff',
    //         fontSize: 12
    //       }
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         animation: false,
    //         type: 'cross',
    //         lineStyle: {
    //           color: '#376df4',
    //           width: 2,
    //           opacity: 1
    //         }
    //       }
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: times,
    //       axisLine: { lineStyle: { color: '#8392A5' } }
    //     },
    //     yAxis: {
    //       scale: true,
    //       axisLine: { lineStyle: { color: '#8392A5' } },
    //       splitLine: { show: true }
    //     },
    //     grid: {
    //       bottom: 80
    //     },
    //     dataZoom: [{
    //       textStyle: {
    //         color: '#8392A5'
    //       },
    //       handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    //       handleSize: '80%',
    //       dataBackground: {
    //         areaStyle: {
    //           color: '#8392A5'
    //         },
    //         lineStyle: {
    //           opacity: 0.8,
    //           color: '#8392A5'
    //         }
    //       },
    //       handleStyle: {
    //         color: '#fff',
    //         shadowBlur: 3,
    //         shadowColor: 'rgba(0, 0, 0, 0.6)',
    //         shadowOffsetX: 2,
    //         shadowOffsetY: 2
    //       }
    //     }, {
    //       type: 'inside'
    //     }],
    //     series: [
    //       {
    //         name: '最大值',
    //         type: 'line',
    //         data: max
    //       },
    //       {
    //         name: '最小值',
    //         type: 'line',
    //         data: min
    //       },
    //       {
    //         name: '平均值',
    //         type: 'line',
    //         data: avg
    //       }
    //     ]
    //   }
    //   chart.setOption(option)
    //   chart.hideLoading()
    // },
    drawTcpConnection (chart, chartName, metricArray) {
      let total = metricArray.filter(function (item) {
        return item.state === 'TCP_TOTAL'
      }).map(function (item) {
        return item.average
      })
      let estb = metricArray.filter(function (item) {
        return item.state === 'ESTABLISHED'
      }).map(function (item) {
        return item.average
      })
      let nestb = metricArray.filter(function (item, index, arr) {
        return item.state === 'NON_ESTABLISHED'
      }).map(function (item) {
        return item.average
      })
      let times = metricArray.filter(function (item, index, arr) {
        return index % 3 === 0
      }).map(function (item) {
        return moment(item.timestamp).format('YYYY/MM/DD HH:mm')
      })
      let option = {
        backgroundColor: '#21202D',
        legend: {
          data: ['TCP_TOTAL', 'ESTABLISHED', 'NON_ESTABLISHED'],
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
          data: times,
          axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis: {
          scale: true,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: { show: true }
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
        series: [
          {
            name: 'TCP_TOTAL',
            type: 'line',
            data: total
          },
          {
            name: 'ESTABLISHED',
            type: 'line',
            data: estb
          },
          {
            name: 'NON_ESTABLISHED',
            type: 'line',
            data: nestb
          }
        ]
      }
      chart.setOption(option)
      chart.hideLoading()
    }
  }
}
</script>

<style scoped>
  .titleTab {
    padding: 10px 0 10px 10px;
    background-color: #efefef;
    width: 800px;
  }
  .chartGroup {
    /*width: 100%;*/
    display: flex;
    flex-direction: column;
    margin: 20px 0;
  }
  .group1,.group2,.group3 {
    display: flex;
    flex-direction: row;
    margin: 5px 5px 5px 0;
  }
/*.el-card {*/
/*  width: 100%;*/
/*  height: auto;*/
/*  display: flex;*/
/*  justify-content: space-between;*/
/*  align-items: center;*/
/*  flex-direction: column;*/
/*}*/
</style>
