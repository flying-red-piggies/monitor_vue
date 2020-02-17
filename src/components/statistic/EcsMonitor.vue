<template>
  <div id="ecsMonitor">
<!--    没用的-->
<!--      <el-select v-model="instances.instanceId" placeholder="请选择实例"-->
<!--               style="width: 100%">-->
<!--        <el-option v-for="item in instances" :key="item.instanceId" :label="item.instanceId"-->
<!--                 :value="item.instanceId"/>-->
<!--      </el-select>-->
<!--    <el-select v-model="selectValueId" placeholder="请选择"-->
<!--               @change="refreshData(selectValueId)">-->
<!--      <el-option-->
<!--        v-for="item in instances"-->
<!--        :key="item.instanceId"-->
<!--        :value="item.instanceId">-->
<!--      </el-option>-->
<!--    </el-select>-->
    <label>
      <select @change="refreshData($event.target.value)">
        <option v-for="item in instances" v-bind:key="item.instanceId">{{item.instanceId}}</option>
      </select>
    </label>
<!--    cpu三个一组-->
<!--    <el-card shadow="always" class="box-card">-->
      <div id="cpuTotalChart" style="width: 500px;height:400px;"></div>
      <div id="cpuSystemChart" style="width: 500px;height:400px;"></div>
      <div id="cpuUserChart" style="width: 500px;height:400px;"></div>
<!--    </el-card>-->
<!--    -->
<!--    load三个一组-->
<!--    <el-card shadow="always" class="box-card">-->
<!--      <div class="marginClass top" style="width: 500px;height:400px;"></div>-->
<!--      <div class="left_right">-->
<!--        <div class="marginClass left" style="width: 500px;height:400px;"></div>-->
<!--        <div class="marginClass right" style="width: 500px;height:400px;"></div>-->
<!--      </div>-->
<!--    </el-card>-->

<!--    -->
<!--    memory自己一组-->
    <div id="memoryChart" style="width: 500px;height:400px;"></div>
<!--    -->
<!--    disk五个一组-->
    <div id="diskInodeChart" style="width: 500px;height:400px;"></div>
    <div id="diskRRateChart" style="width: 500px;height:400px;"></div>
    <div id="diskWRateChart" style="width: 500px;height:400px;"></div>
    <div id="diskRIopsChart" style="width: 500px;height:400px;"></div>
    <div id="diskWIopsChart" style="width: 500px;height:400px;"></div>
<!--    -->
<!--    最后五个一组-->
    <div id="netIRateChart" style="width: 500px;height:400px;"></div>
    <div id="netORateChart" style="width: 500px;height:400px;"></div>
    <div id="netIPpsChart" style="width: 500px;height:400px;"></div>
    <div id="netOPpsChart" style="width: 500px;height:400px;"></div>
    <div id="tcpConnectionChart" style="width: 500px;height:400px;"></div>
<!--    -->
  </div>
</template>

<script>
import ecsInfo from '@/api/ecs/ecsInfo'
import ecsMetric from '@/api/ecs/ecsMetric'
import moment from 'moment'
export default {
  name: 'ecsMonitor',
  // mounted () {
  //   this.myChart = this.$echarts.init(document.getElementById(chartId))
  // },
  created () {
    ecsInfo.getInstances().then(res => {
      this.instances = res.data
      this.instanceId = res.data[0].instanceId
      this.refreshData(this.instanceId)
    })
  },
  data () {
    return {
      instances: [],
      instanceId: '',
      cpuTotal: [],
      cpuSystem: [],
      cpuUser: [],
      selectValueId: ''
    }
  },
  methods: {
    refreshData (instanceId) {
      let endTime = new Date().valueOf()
      let startTime = moment(endTime).add(-1, 'h').valueOf()
      ecsMetric.getCpuTotal(instanceId, startTime, endTime).then(res => {
        this.cpuTotal = res.data
        this.drawLine('cpuTotalChart', 'CPU总使用率', res.data)
      })
      ecsMetric.getCpuSystem(instanceId, startTime, endTime).then(res => {
        this.cpuSystem = res.data
        this.drawLine('cpuSystemChart', 'CPU内核空间使用率', res.data)
      })
      ecsMetric.getCpuUser(instanceId, startTime, endTime).then(res => {
        this.cpuUser = res.data
        this.drawLine('cpuUserChart', 'CPU用户空间使用率', res.data)
      })
      ecsMetric.getLoad1m(instanceId, startTime, endTime).then(res => {
        this.drawLine('load1MChart', '系统平均负载(1分钟内)', res.data)
      })
      ecsMetric.getLoad5m(instanceId, startTime, endTime).then(res => {
        this.drawLine('load5MChart', '系统平均负载(5分钟内)', res.data)
      })
      ecsMetric.getLoad15m(instanceId, startTime, endTime).then(res => {
        this.drawLine('load15MChart', '系统平均负载(15分钟内)', res.data)
      })
      ecsMetric.getMemory(instanceId, startTime, endTime).then(res => {
        this.drawLine('memoryChart', '内存使用率', res.data)
      })
      ecsMetric.getDiskInode(instanceId, startTime, endTime).then(res => {
        this.drawLine('diskInodeChart', '磁盘inode使用率', res.data)
      })
      ecsMetric.getDiskReadRate(instanceId, startTime, endTime).then(res => {
        this.drawLine('diskRRateChart', '磁盘读速率(Byte/s)', res.data)
      })
      ecsMetric.getDiskWriteRate(instanceId, startTime, endTime).then(res => {
        this.drawLine('diskWRateChart', '磁盘写速率(Byte/s)', res.data)
      })
      ecsMetric.getDiskReadIOPS(instanceId, startTime, endTime).then(res => {
        this.drawLine('diskRIopsChart', '磁盘读IOPS', res.data)
      })
      ecsMetric.getDiskWriteIOPS(instanceId, startTime, endTime).then(res => {
        this.drawLine('diskWIopsChart', '磁盘写IOPS', res.data)
      })
      ecsMetric.getNetInBPS(instanceId, startTime, endTime).then(res => {
        this.drawLine('netIRateChart', '下行带宽(bit/s)', res.data)
      })
      ecsMetric.getNetOutBPS(instanceId, startTime, endTime).then(res => {
        this.drawLine('netORateChart', '上行带宽(bit/s)', res.data)
      })
      ecsMetric.getNetInPPS(instanceId, startTime, endTime).then(res => {
        this.drawLine('netIPpsChart', '网络流入数据包(packages/s)', res.data)
      })
      ecsMetric.getNetOutPPS(instanceId, startTime, endTime).then(res => {
        this.drawLine('netOPpsChart', '网络流出数据包(packages/s)', res.data)
      })
      ecsMetric.getTcpConnection(instanceId, startTime, endTime).then(res => {
        // this.drawLine('tcpConnectionChart', 'TCP连接数', res.data)
        this.drawTcpConnection('tcpConnectionChart', 'TCP连接数', res.data)
      })
    },
    drawLine (chartId, chartName, metricArray) {
      let myChart = this.$echarts.init(document.getElementById(chartId))
      myChart.showLoading({
        text: '正在加载'
      })
      let max = metricArray.map(function (item) {
        return item['maximum']
      })
      let min = metricArray.map(function (item) {
        return item['minimum']
      })
      let avg = metricArray.map(function (item) {
        return item['average']
      })
      let times = metricArray.map(function (item) {
        return moment(item['timestamp']).format('YYYY/MM/DD HH:mm')
      })
      let option = {
        backgroundColor: '#21202D',
        legend: {
          data: ['最大值', '最小值', '平均值'],
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
            name: '最大值',
            type: 'line',
            data: max
          },
          {
            name: '最小值',
            type: 'line',
            data: min
          },
          {
            name: '平均值',
            type: 'line',
            data: avg
          }
        ]
      }
      myChart.setOption(option)
      myChart.hideLoading()
    },
    drawTcpConnection (chartId, chartName, metricArray) {
      let myChart = this.$echarts.init(document.getElementById(chartId))
      myChart.showLoading({
        text: '正在加载'
      })
      let total = metricArray.map(function (item) {
        if (item['state'] === 'TCP_TOTAL') {
          return item['average']
        }
      })
      let estb = metricArray.map(function (item) {
        if (item['state'] === 'ESTABLISHED') {
          return item['average']
        }
      })
      let nestb = metricArray.map(function (item) {
        if (item['state'] === 'NON_ESTABLISHED') {
          return item['average']
        }
      })
      let times = metricArray.map(function (item) {
        return moment(item['timestamp']).format('YYYY/MM/DD HH:mm')
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
      myChart.setOption(option)
      myChart.hideLoading()
    }
  }
}
</script>

<style scoped>
.el-card {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
</style>
