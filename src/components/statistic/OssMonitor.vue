<template>
  <div id="ossMonitor">
    <el-select v-model="bucketName" placeholder="请选择"
               @change="refreshData(bucketName)">
      <el-option
        v-for="item in buckets"
        :key="item.name"
        :value="item.name">
      </el-option>
    </el-select>
<!--    <label>-->
<!--      <select @change="refreshData($event.target.value)">-->
<!--        <option v-for="item in buckets" v-bind:key="item.id">{{item.name}}</option>-->
<!--      </select>-->
<!--    </label>-->
    <el-card class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>计量数据</span>
      </div>
      <div class="group1">
        <div id="storageUtilChart" style="width: 100%;height:300px;"></div>
      </div>
      <div class="group2">
        <div id="getRequestChart" style="width: 50%;height:300px;"></div>
        <div id="putRequestChart" style="width: 50%;height:300px;"></div>
      </div>
      <div class="group3">
        <div id="internetRXChart" style="width: 50%;height:300px;"></div>
        <div id="internetTXChart" style="width: 50%;height:300px;"></div>
      </div>
    </el-card>
    <el-card class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>用户层级数据</span>
      </div>
      <div class="group1">
        <div id="userRequestChart" style="width: 100%;height:300px;"></div>
      </div>
      <div class="group2">
        <div id="userTrafficChart" style="width: 100%;height:300px;"></div>
      </div>
    </el-card>
    <el-card class="box-card chartGroup">
      <div slot="header" class="clearfix">
        <span>Bucket层级数据</span>
      </div>
      <div class="group1">
        <div id="bucketRequestChart" style="width: 100%;height:300px;"></div>
      </div>
      <div class="group2">
        <div id="bucketTrafficChart" style="width: 100%;height:300px;"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import ossInfo from '@/api/oss/ossInfo'
import ossMetric from '@/api/oss/ossMetric'
import moment from 'moment'

export default {
  name: 'ossMonitor',
  mounted () {
    this.initCharts()
    this.showLoading()
  },
  created () {
    ossInfo.getBuckets().then(res => {
      this.buckets = res.data
      this.bucketName = res.data[0].name
      this.refreshData(this.bucketName)
    })
  },
  data () {
    return {
      buckets: [],
      bucketName: '',
      storageUtil: {},
      getRequest: {},
      putRequest: {},
      internetRX: {},
      internetTX: {},
      userRequest: {},
      userTraffic: {},
      bucketRequest: {},
      bucketTraffic: {}
    }
  },
  methods: {
    initCharts () {
      this.storageUtil = this.$echarts.init(document.getElementById('storageUtilChart'))
      this.getRequest = this.$echarts.init(document.getElementById('getRequestChart'))
      this.putRequest = this.$echarts.init(document.getElementById('putRequestChart'))
      this.internetRX = this.$echarts.init(document.getElementById('internetRXChart'))
      this.internetTX = this.$echarts.init(document.getElementById('internetTXChart'))
      this.userRequest = this.$echarts.init(document.getElementById('userRequestChart'))
      this.userTraffic = this.$echarts.init(document.getElementById('userTrafficChart'))
      this.bucketRequest = this.$echarts.init(document.getElementById('bucketRequestChart'))
      this.bucketTraffic = this.$echarts.init(document.getElementById('bucketTrafficChart'))
    },
    showLoading () {
      this.storageUtil.showLoading({
        text: '正在加载'
      })
      this.getRequest.showLoading({
        text: '正在加载'
      })
      this.putRequest.showLoading({
        text: '正在加载'
      })
      this.internetRX.showLoading({
        text: '正在加载'
      })
      this.internetTX.showLoading({
        text: '正在加载'
      })
      this.userRequest.showLoading({
        text: '正在加载'
      })
      this.userTraffic.showLoading({
        text: '正在加载'
      })
      this.bucketRequest.showLoading({
        text: '正在加载'
      })
      this.bucketTraffic.showLoading({
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
    refreshData (bucketName) {
      this.showLoading()
      let endTime = new Date().valueOf()
      let startTime = moment(endTime).add(-50, 'd').valueOf()
      let interval = moment.duration(5, 'minutes').as('minutes')
      ossMetric.getStorageUtil(startTime, endTime, interval, bucketName).then(res => {
        let dataNames = ['meteringStorageUtilization']
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.storageUtil, this.getChartOption('存储用量(B)', dataNames, lines, this.mapXTimes(res.data)))
      })
      ossMetric.getGetRequest(startTime, endTime, interval, bucketName).then(res => {
        let dataNames = ['meteringGetRequest']
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.getRequest, this.getChartOption('Get请求数', dataNames, lines, this.mapXTimes(res.data)))
      })
      ossMetric.getPutRequest(startTime, endTime, interval, bucketName).then(res => {
        let dataNames = ['meteringPutRequest']
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.putRequest, this.getChartOption('Put请求数', dataNames, lines, this.mapXTimes(res.data)))
      })
      ossMetric.getInternetTX(startTime, endTime, interval, bucketName).then(res => {
        let dataNames = ['meteringInternetTX']
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.internetTX, this.getChartOption('公网流出流量(B)', dataNames, lines, this.mapXTimes(res.data)))
      })
      ossMetric.getInternetRX(startTime, endTime, interval, bucketName).then(res => {
        let dataNames = ['meteringInternetRX']
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.internetRX, this.getChartOption('公网流入流量(B)', dataNames, lines, this.mapXTimes(res.data)))
      })
      ossMetric.getUserRequest(startTime, endTime, interval).then(res => {
        let dataNames = [
          'userTotalRequestCount', 'userSuccessRate',
          'userServerErrorRate', 'userNetworkErrorRate',
          'userAuthorizationErrorRate', 'userResourceNotFoundErrorRate',
          'userClientTimeoutErrorRate', 'userClientOtherErrorRate'
        ]
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.userRequest, this.getChartOption('用户层级请求详情', dataNames, lines, this.mapXTimes(res.data)))
      })
      ossMetric.getUserTraffic(startTime, endTime, interval).then(res => {
        let dataNames = [
          'userInternetSend', 'userInternetRecv',
          'userIntranetSend', 'userIntranetRecv',
          'userCdnSend', 'userCdnRecv',
          'userSyncSend', 'userSyncRecv'
        ]
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.userTraffic, this.getChartOption('用户层级流量详情', dataNames, lines, this.mapXTimes(res.data)))
      })
      ossMetric.getBucketRequest(startTime, endTime, interval, bucketName).then(res => {
        let dataNames = [
          'totalRequestCount', 'successRate',
          'serverErrorRate', 'networkErrorRate',
          'authorizationErrorRate', 'resourceNotFoundErrorRate',
          'clientTimeoutErrorRate', 'clientOtherErrorRate'
        ]
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.bucketRequest, this.getChartOption('bucket层级请求详情', dataNames, lines, this.mapXTimes(res.data)))
      })
      ossMetric.getBucketTraffic(startTime, endTime, interval, bucketName).then(res => {
        let dataNames = [
          'internetSend', 'internetRecv',
          'intranetSend', 'intranetRecv',
          'cdnSend', 'cdnRecv',
          'syncSend', 'syncRecv'
        ]
        let dataPoints = this.mapDataPoints(res.data, dataNames)
        let lines = this.getLines(dataNames, dataPoints)
        this.drawLine(this.bucketTraffic, this.getChartOption('bucket层级流量详情', dataNames, lines, this.mapXTimes(res.data)))
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
    drawLine (chart, option) {
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
    background-color: #545c64;
  }
  .group1,.group2,.group3 {
    display: flex;
    flex-direction: row;
    margin: 5px 5px 5px 0;
  }
</style>
