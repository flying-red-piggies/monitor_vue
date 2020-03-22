<template>
  <div>
    <el-dialog
      append-to-body
      :visible.sync="dialogVisible"
      :width="width">
      <div id="chart" style="width: 100%;height:400px;"></div>
    </el-dialog>
  </div>
</template>

<script>
import myChart from './myChart'

export default {
  name: 'bigChart',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    chartOption: {}
  },
  data () {
    return {
      dialogVisible: false,
      width: '80%'
    }
  },
  computed: {
    dialog () {
      const { visible, chartOption } = this
      return {
        visible,
        chartOption
      }
    }
  },
  watch: {
    dialog (newValue, oldValue) {
      this.dialogVisible = newValue.visible
      if (newValue.visible) {
        this.$nextTick(() => {
          let chart = this.$echarts.init(document.getElementById('chart'))
          chart.showLoading(myChart.loading)
          chart.setOption(newValue.chartOption, true)
          chart.hideLoading()
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
