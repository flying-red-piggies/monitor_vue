<template>
  <div id="ecsMonitor">
    <el-form-item label="选择实例"/>
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
      activeTab: 'instance',
      instances: [],
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
      this.cpu.showLoading({
        text: '正在加载'
      })
      this.loadM.showLoading({
        text: '正在加载'
      })
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
      this.netbps.showLoading({
        text: '正在加载'
      })
      this.netPps.showLoading({
        text: '正在加载'
      })
      this.tcpConnection.showLoading({
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
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLines(this.memory, this.getChartOption('内存使用率', dataNames, lines, this.mapXTimes(res.data)))
      })
      ecsMetric.getDiskInode(instanceId, startTime, endTime, interval).then(res => {
        let dataNames = ['maximum', 'minimum', 'average']
        let dataPoints = this.mapDataPoints(res, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLines(this.diskInode, this.getChartOption('磁盘inode使用率', dataNames, lines, this.mapXTimes(res)))
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
  .search {
    display: flex;
  }
</style>
