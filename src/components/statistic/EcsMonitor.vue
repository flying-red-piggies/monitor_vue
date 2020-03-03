<template>
<!--  <div id="ecsMonitor">-->
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
<!--&lt;!&ndash;    cpu三个一组&ndash;&gt;-->
<!--    <div class="titleTab">cpu</div>-->
<!--    <el-card class="box-card chartGroup">-->
<!--      <div>-->
<!--        <div class="group1">-->
<!--          <div id="cpuTotalChart" style="width: 800px;height: 300px;"></div>-->
<!--        </div>-->
<!--        <div class="group2">-->
<!--          <div id="cpuSystemChart" style="width: 400px;height: 300px;"></div>-->
<!--          <div id="cpuUserChart" style="width: 400px;height: 300px;"></div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-card>-->
<!--&lt;!&ndash;    &ndash;&gt;-->
<!--    <div class="titleTab">系统负载</div>-->
<!--    <el-card shadow="always" class="box-card">-->
<!--      <div class="group2">-->
<!--        <div id="load1MChart" style="width: 800px;height:300px;"></div>-->
<!--      </div>-->
<!--      <div class="group2">-->
<!--        <div id="load5MChart" style="width: 400px;height:300px;"></div>-->
<!--        <div id="load15MChart" style="width: 400px;height:300px;"></div>-->
<!--      </div>-->
<!--    </el-card>-->

<!--&lt;!&ndash;    &ndash;&gt;-->
<!--&lt;!&ndash;    memory自己一组&ndash;&gt;-->
<!--    <div class="titleTab">内存</div>-->
<!--    <el-card class="box-card chartGroup">-->
<!--    <div>-->
<!--      <div id="memoryChart" style="width: 800px;height:300px;"></div>-->
<!--    </div>-->
<!--    </el-card>-->
<!--&lt;!&ndash;    &ndash;&gt;-->
<!--&lt;!&ndash;    disk五个一组&ndash;&gt;-->
<!--    <div class="titleTab">硬盘</div>-->
<!--    <el-card class="box-card chartGroup">-->
<!--      <div>-->
<!--        <div class="group1">-->
<!--          <div id="diskInodeChart" style="width: 800px;height:300px;"></div>-->
<!--        </div>-->
<!--        <div class="group2">-->
<!--          <div id="diskRRateChart" style="width: 400px;height:300px;"></div>-->
<!--          <div id="diskWRateChart" style="width: 400px;height:300px;"></div>-->
<!--        </div>-->
<!--        <div class="group3">-->
<!--          <div id="diskRIopsChart" style="width: 400px;height:300px;"></div>-->
<!--          <div id="diskWIopsChart" style="width: 400px;height:300px;"></div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-card>-->
<!--&lt;!&ndash;    &ndash;&gt;-->
<!--&lt;!&ndash;    最后五个一组&ndash;&gt;-->
<!--    <div class="titleTab">网络</div>-->
<!--    <el-card class="box-card chartGroup">-->
<!--      <div>-->
<!--        <div class="group1">-->
<!--          <div id="tcpConnectionChart" style="width: 800px;height:300px;"></div>-->

<!--        </div>-->
<!--        <div class="group2">-->
<!--          <div id="netIRateChart" style="width: 400px;height:300px;"></div>-->
<!--          <div id="netORateChart" style="width: 400px;height:300px;"></div>-->

<!--        </div>-->
<!--        <div class="group3">-->
<!--          <div id="netIPpsChart" style="width: 400px;height:300px;"></div>-->
<!--          <div id="netOPpsChart" style="width: 400px;height:300px;"></div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-card>-->

<!--  </div>-->
  <div id="ecsMonitor">
    <el-tabs type="border-card" v-model="activeTab">
      <el-tab-pane label="实例列表" name="instance" :key="instance">
        <div class="search">
          <el-input class="elInput" placeholder="输入IP、主机名称或实例ID进行搜索"></el-input>
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
  // mounted () {
  //   this.myChart = this.$echarts.init(document.getElementById(chartId))
  // },
  created () {
    ecsInfo.getInstances().then(res => {
      this.cpuTotal = this.$echarts.init(document.getElementById('cpuTotalChart'))
      this.cpuSystem = this.$echarts.init(document.getElementById('cpuSystemChart'))
      this.cpuUser = this.$echarts.init(document.getElementById('cpuUserChart'))

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
      cpuTotal: {},
      cpuSystem: {},
      cpuUser: {}
    }
  },
  methods: {
    refreshData (instanceId) {
      let endTime = new Date().valueOf()
      let startTime = moment(endTime).add(-50, 'd').valueOf()
      let interval = moment.duration(60, 'minutes').as('minutes')
      ecsMetric.getCpuTotal(instanceId, startTime, endTime, interval).then(res => {
        console.log(res.data)
        this.drawLine('cpuTotalChart', 'CPU总使用率', res.data)
      })
      ecsMetric.getCpuSystem(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('cpuSystemChart', 'CPU内核空间使用率', res.data)
      })
      ecsMetric.getCpuUser(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('cpuUserChart', 'CPU用户空间使用率', res.data)
      })
      ecsMetric.getLoad1m(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('load1MChart', '系统平均负载(1分钟内)', res.data)
      })
      ecsMetric.getLoad5m(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('load5MChart', '系统平均负载(5分钟内)', res.data)
      })
      ecsMetric.getLoad15m(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('load15MChart', '系统平均负载(15分钟内)', res.data)
      })
      ecsMetric.getMemory(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('memoryChart', '内存使用率', res.data)
      })
      ecsMetric.getDiskInode(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('diskInodeChart', '磁盘inode使用率', res.data)
      })
      ecsMetric.getDiskReadRate(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('diskRRateChart', '磁盘读速率(Byte/s)', res.data)
      })
      ecsMetric.getDiskWriteRate(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('diskWRateChart', '磁盘写速率(Byte/s)', res.data)
      })
      ecsMetric.getDiskReadIOPS(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('diskRIopsChart', '磁盘读IOPS', res.data)
      })
      ecsMetric.getDiskWriteIOPS(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('diskWIopsChart', '磁盘写IOPS', res.data)
      })
      ecsMetric.getNetInBPS(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('netIRateChart', '下行带宽(bit/s)', res.data)
      })
      ecsMetric.getNetOutBPS(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('netORateChart', '上行带宽(bit/s)', res.data)
      })
      ecsMetric.getNetInPPS(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('netIPpsChart', '网络流入数据包(packages/s)', res.data)
      })
      ecsMetric.getNetOutPPS(instanceId, startTime, endTime, interval).then(res => {
        this.drawLine('netOPpsChart', '网络流出数据包(packages/s)', res.data)
      })
      ecsMetric.getTcpConnection(instanceId, startTime, endTime, interval).then(res => {
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
      myChart.setOption(option)
      myChart.hideLoading()
    }
  }
}
</script>

<style scoped>
  #ecsMonitor {
    height: 100%;
  }
  .titleTab {
    padding: 10px 0 10px 10px;
    background-color: #efefef;
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
  .search {
    display: flex;
  }
</style>
