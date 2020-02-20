<template>
  <div id="ossMonitor">
    <el-select v-model="selectValueId" placeholder="请选择"
               @change="refreshData(selectValueId)">
      <el-option
        v-for="item in buckets"
        :key="item.id"
        :value="item.name">
      </el-option>
    </el-select>
<!--    <label>-->
<!--      <select @change="refreshData($event.target.value)">-->
<!--        <option v-for="item in buckets" v-bind:key="item.id">{{item.name}}</option>-->
<!--      </select>-->
<!--    </label>-->
    <el-card class="box-card chartGroup">
      <div>
        <div class="group1">
          <div id="storageUtilChart" style="width: 500px;height:400px;"></div>
          <div id="getRequestChart" style="width: 500px;height:400px;"></div>
        </div>
        <div class="group2">
          <div id="putRequestChart" style="width: 500px;height:400px;"></div>
          <div id="internetTXChart" style="width: 500px;height:400px;"></div>
        </div>
      </div>
      <div class="group3">
        <div id="internetRXChart" style="width: 500px;height:400px;"></div>
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
      selectValueId: ''
    }
  },
  methods: {
    refreshData (bucketName) {
      let endTime = new Date().valueOf()
      let startTime = moment(endTime).add(-20, 'd').valueOf()
      ossMetric.getStorageUtil(startTime, endTime, bucketName).then(res => {
        this.drawLine('storageUtilChart', '存储用量(B)', res.data, 'meteringStorageUtilization')
      })
      ossMetric.getGetRequest(startTime, endTime, bucketName).then(res => {
        this.drawLine('getRequestChart', 'Get请求数', res.data, 'meteringGetRequest')
      })
      ossMetric.getPutRequest(startTime, endTime, bucketName).then(res => {
        this.drawLine('putRequestChart', 'Put请求数', res.data, 'meteringPutRequest')
      })
      ossMetric.getInternetTX(startTime, endTime, bucketName).then(res => {
        this.drawLine('internetTXChart', '公网流出流量(B)', res.data, 'meteringInternetTX')
      })
      ossMetric.getInternetRX(startTime, endTime, bucketName).then(res => {
        this.drawLine('internetRXChart', '公网流入流量(B)', res.data, 'meteringInternetRX')
      })
    },
    drawLine (chartId, chartName, metricArray, metricName) {
      let myChart = this.$echarts.init(document.getElementById(chartId))
      myChart.showLoading({
        text: '正在加载'
      })
      let result = metricArray.map(function (item) {
        return item[metricName]
      })
      let times = metricArray.map(function (item) {
        return moment(item['timestamp']).format('YYYY/MM/DD HH:mm')
      })
      let option = {
        backgroundColor: '#21202D',
        legend: {
          data: [metricName],
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
            name: metricName,
            type: 'line',
            data: result
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
</style>
