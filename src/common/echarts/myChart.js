import moment from 'moment'

export default {
  loading: {
    text: 'Loading',
    color: '#4feeef',
    textColor: '#4feeef',
    maskColor: '#0a0c13'
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
  getLines (names, dataPoints) {
    let series = []
    for (let i = 0; i < names.length; i++) {
      series.push({
        name: names[i],
        type: 'line',
        symbolSize: 4,
        lineStyle: {
          normal: {
            width: 1
          }
        },
        data: dataPoints[i]
      })
    }
    return series
  },
  getChartOption (chartName, dataNames, series, xTime) {
    return {
      backgroundColor: '#0a0c13',
      color: ['#d32724', '#3198a2', '#2c8161', '#7c8b02',
        '#a01cbd', '#ab715b', '#ff791c', '#c4759a',
        '#12088b', '#23d109'],
      legend: {
        data: dataNames,
        inactiveColor: '#777',
        textStyle: {
          color: '#fff',
          fontSize: 10,
          fontWeight: 1
        }
      },
      title: {
        text: chartName,
        textStyle: {
          color: '#fff',
          fontSize: 12,
          fontWeight: 4
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false,
          type: 'cross',
          lineStyle: {
            color: '#376df4',
            width: 1,
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
          color: '#8392A5',
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
