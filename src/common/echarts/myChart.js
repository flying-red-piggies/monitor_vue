import moment from 'moment'
import echarts from 'echarts'

export default {
  vuePage: '',
  create (page) {
    this.vuePage = page
    return this
  },
  loading: {
    text: 'Loading',
    color: '#4feeef',
    textColor: '#4feeef',
    maskColor: '#0a0c13'
  },
  color: [
    '#ee2c29', '#c2d602',
    '#23b709', '#348af9',
    '#a01cbd', '#ab715b',
    '#ff791c', '#c4759a',
    '#12088b', '#2c8161'
  ],
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
  getLines (legendNames, dataPoints) {
    let series = []
    let color = this.color
    for (let i = 0; i < legendNames.length; i++) {
      series.push({
        name: legendNames[i],
        type: 'line',
        symbolSize: 4,
        // symbol: 'path://M27.273 753.613l485.222-484.233 484.233 485.222z',
        symbol: 'triangle',
        lineStyle: {
          normal: {
            width: 1
          }
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: color[i]
          }, {
            offset: 1,
            color: 'transparent'
          }])
        },
        data: dataPoints[i]
      })
    }
    return series
  },
  getChartOption (chartName, legendNames, series, xTime) {
    let vuePage = this.vuePage
    let color = this.color
    return {
      backgroundColor: '#0a0c13',
      color: color,
      legend: {
        data: legendNames,
        icon: 'pin',
        inactiveColor: '#777',
        top: '10%',
        textStyle: {
          color: '#fff',
          fontSize: 10,
          fontWeight: 1
        }
      },
      title: {
        text: chartName,
        top: '1%',
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
      toolbox: {
        right: 50,
        top: 0,
        iconStyle: {
          borderColor: '#3e7bff',
          borderWidth: 1
        },
        emphasis: {
          iconStyle: {
            borderColor: '#3ea9f1',
            borderWidth: 2
          }
        },
        feature: {
          myShowBig: {
            show: true,
            title: '查看大图',
            icon: 'path://M471.466667 590.933333c8.533333-8.533333 6.4-21.333333 0-29.866666-8.533333-8.533333-21.333333-8.533333-29.866667 0L87.466667 910.933333s-2.133333 0-2.133334 2.133334V580.266667c0-12.8-8.533333-21.333333-21.333333-21.333334s-21.333333 8.533333-21.333333 21.333334V981.333333h407.466666c12.8 0 21.333333-8.533333 21.333334-21.333333s-8.533333-21.333333-21.333334-21.333333H117.333333s0 2.133333 2.133334 0l352-347.733334zM578.133333 42.666667c-12.8 0-21.333333 8.533333-21.333333 21.333333s8.533333 21.333333 21.333333 21.333333h332.8s0 2.133333-2.133333 4.266667L558.933333 441.6c-8.533333 8.533333-6.4 21.333333 0 29.866667 8.533333 8.533333 21.333333 8.533333 29.866667 2.133333L938.666667 121.6v-2.133333 332.8c0 12.8 8.533333 21.333333 21.333333 21.333333s21.333333-8.533333 21.333333-21.333333V42.666667H578.133333z',
            onclick: function (e) {
              let opts = e.getOption()
              opts.toolbox[0].feature.myShowBig.show = false
              console.log(opts)
              vuePage.showBig(opts)
            }
          },
          saveAsImage: {
            icon: 'path://M996.01 1024H27.99c-7.318 0-13.825-2.837-19.5-8.49-5.653-5.675-8.49-12.16-8.49-19.5 0-8.02 2.837-14.677 8.49-20.01 5.675-5.333 12.16-8 19.5-8h968.02c7.318 0 13.825 2.667 19.5 8 5.653 5.333 8.49 11.99 8.49 20.01 0 7.318-2.837 13.825-8.49 19.5-5.675 5.653-12.16 8.49-19.5 8.49z m-69.013-648c5.334 5.333 7.83 11.99 7.51 20.01-0.342 8-3.84 14.998-10.496 20.993L529.984 811.989l-4.992 2.006-2.987 2.986a44.8 44.8 0 0 1-22.997 0l-2.005-2.986a6.784 6.784 0 0 1-5.014-1.984L97.003 417.003a33.216 33.216 0 0 1-6.998-21.014c0-8 2.496-14.506 7.488-19.498 5.014-4.992 11.84-7.488 20.502-7.488 8.682 0 15.338 2.346 20.01 6.997l347.968 346.005V27.99c0-8 2.496-14.656 7.51-19.989C498.496 2.667 504.66 0 512 0s13.504 2.667 18.496 8c5.013 5.333 7.51 11.99 7.51 20.01v693.974l347.967-345.963c4.672-4.672 11.35-6.997 20.011-6.997s15.659 2.347 20.992 6.997z'
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
        top: '25%',
        bottom: 70
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
