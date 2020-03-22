<template>
  <div class="block">
    <el-radio-group v-model="period" size="small" @change="periodConfirm">
      <el-radio-button label="1小时"/>
      <el-radio-button label="12小时"/>
      <el-radio-button label="1天"/>
      <el-radio-button label="3天"/>
      <el-radio-button label="5天"/>
    </el-radio-group>
    <el-tag color="#0a0c13" class="choose-tag">选择时间范围: </el-tag>
    <el-date-picker
      size="small"
      v-model="value"
      type="datetimerange"
      align="right"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00', '12:00:00']"
      @change="dateTimeConfirm">
    </el-date-picker>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'timePicker',
  data () {
    return {
      value: '',
      period: ''
    }
  },
  methods: {
    periodConfirm (value) {
      let startTime = ''
      let endTime = moment().valueOf()
      let interval = ''
      if (value === '1小时') {
        startTime = moment().add(-1, 'h').valueOf()
        interval = 1
      } else if (value === '12小时') {
        startTime = moment().add(-12, 'h').valueOf()
        interval = 1
      } else if (value === '1天') {
        startTime = moment().add(-1, 'd').valueOf()
        interval = 15
      } else if (value === '3天') {
        startTime = moment().add(-3, 'd').valueOf()
        interval = 15
      } else {
        startTime = moment().add(-5, 'd').valueOf()
        interval = 30
      }
      this.$emit('timeConfirm', [startTime, endTime, interval])
    },
    dateTimeConfirm (value) {
      let startTime = value[0].valueOf()
      let endTime = value[1].valueOf()
      let interval = 1
      let minutes = (endTime - startTime) / (60 * 1000)
      if (minutes <= 60 * 12) { // 少于12小时
        interval = 1
      } else if (minutes > 60 * 12 && minutes <= 60 * 24 * 3) { // 超过12小时少于3天
        interval = 15
      } else if (minutes > 60 * 24 * 3 && minutes <= 60 * 24 * 5) { // 超过3天少于5天
        interval = 30
      } else { // 超过5天
        interval = 60
      }
      this.$emit('timeConfirm', [startTime, endTime, interval])
    }
  }
}
</script>

<style scoped>
  .choose-tag {
    border: none;
    font-size: small;
    color: #5394ec;
  }
</style>
