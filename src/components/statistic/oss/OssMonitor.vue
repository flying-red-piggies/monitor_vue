<template>
  <div id="ossMonitor">
    <el-page-header @back="goBack" :content="'Bucket: ' + bucketName">
    </el-page-header>
    <el-card class="box-card chartGroup">
      <div slot="header">
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
      <div slot="header">
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
      <div slot="header">
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
import ossMetric from '../../../api/oss/OssMetric'
import myChart from '../../../common/echarts/myChart'
import moment from 'moment'

export default {
  name: 'ossMonitor',
  mounted () {
    this.initCharts()
    this.showLoading()
    this.refreshData(this.userId, this.bucketName)
  },
  created () {
    this.userId = this.$route.params.userId
    this.bucketName = this.$route.params.bucketName
  },
  data () {
    return {
      userId: '',
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
    goBack () {
      this.$router.back()
    },
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
      let loading = myChart.loading
      this.storageUtil.showLoading(loading)
      this.getRequest.showLoading(loading)
      this.putRequest.showLoading(loading)
      this.internetRX.showLoading(loading)
      this.internetTX.showLoading(loading)
      this.userRequest.showLoading(loading)
      this.userTraffic.showLoading(loading)
      this.bucketRequest.showLoading(loading)
      this.bucketTraffic.showLoading(loading)
    },
    refreshData (userId, bucketName) {
      this.showLoading()
      let endTime = new Date().valueOf()
      let startTime = moment(endTime).add(-50, 'd').valueOf()
      let interval = moment.duration(5, 'minutes').as('minutes')
      console.log(userId, bucketName)
      ossMetric.getStorageUtil(userId, startTime, endTime, interval, bucketName).then(res => {
        console.log(res.data)
        let dataNames = ['meteringStorageUtilization']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.storageUtil, myChart.getChartOption('存储用量(B)', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      ossMetric.getGetRequest(userId, startTime, endTime, interval, bucketName).then(res => {
        let dataNames = ['meteringGetRequest']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.getRequest, myChart.getChartOption('Get请求数', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      ossMetric.getPutRequest(userId, startTime, endTime, interval, bucketName).then(res => {
        let dataNames = ['meteringPutRequest']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.putRequest, myChart.getChartOption('Put请求数', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      ossMetric.getInternetTX(userId, startTime, endTime, interval, bucketName).then(res => {
        let dataNames = ['meteringInternetTX']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.internetTX, myChart.getChartOption('公网流出流量(B)', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      ossMetric.getInternetRX(userId, startTime, endTime, interval, bucketName).then(res => {
        let dataNames = ['meteringInternetRX']
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.internetRX, myChart.getChartOption('公网流入流量(B)', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      ossMetric.getUserRequest(userId, startTime, endTime, interval).then(res => {
        let dataNames = [
          'userTotalRequestCount', 'userSuccessRate',
          'userServerErrorRate', 'userNetworkErrorRate',
          'userAuthorizationErrorRate', 'userResourceNotFoundErrorRate',
          'userClientTimeoutErrorRate', 'userClientOtherErrorRate'
        ]
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.userRequest, myChart.getChartOption('用户层级请求详情', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      ossMetric.getUserTraffic(userId, startTime, endTime, interval).then(res => {
        let dataNames = [
          'userInternetSend', 'userInternetRecv',
          'userIntranetSend', 'userIntranetRecv',
          'userCdnSend', 'userCdnRecv',
          'userSyncSend', 'userSyncRecv'
        ]
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.userTraffic, myChart.getChartOption('用户层级流量详情', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      ossMetric.getBucketRequest(userId, startTime, endTime, interval, bucketName).then(res => {
        let dataNames = [
          'totalRequestCount', 'successRate',
          'serverErrorRate', 'networkErrorRate',
          'authorizationErrorRate', 'resourceNotFoundErrorRate',
          'clientTimeoutErrorRate', 'clientOtherErrorRate'
        ]
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.bucketRequest, myChart.getChartOption('bucket层级请求详情', dataNames, lines, myChart.mapXTimes(res.data)))
      })
      ossMetric.getBucketTraffic(userId, startTime, endTime, interval, bucketName).then(res => {
        let dataNames = [
          'internetSend', 'internetRecv',
          'intranetSend', 'intranetRecv',
          'cdnSend', 'cdnRecv',
          'syncSend', 'syncRecv'
        ]
        let dataPoints = myChart.mapDataPoints(res.data, dataNames)
        let lines = myChart.getLines(dataNames, dataPoints)
        myChart.drawLines(this.bucketTraffic, myChart.getChartOption('bucket层级流量详情', dataNames, lines, myChart.mapXTimes(res.data)))
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
  .bucket-name {
    background-color: #0a0c13;
    border-color: #3a8ee6;
  }
</style>
