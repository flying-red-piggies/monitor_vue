<template>
  <div id="generalView">
    <div id="addProfile" v-if="showForm">
      <h3 class="add-title">添加Access Key信息并开始使用</h3>
      <el-form ref="profile" :model="profile" status-icon :rules="checkProfile"
               label-position="top"
               v-loading="loading"
               element-loading-text="请求中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-row>
          <el-col :span="20">
            <el-form-item label="Access Key ID" prop="acKey">
              <el-input v-model="profile.acKey" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="Access Key Secret" prop="acSecret">
              <el-input v-model="profile.acSecret" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="区域" prop="regionId">
              <el-select v-model="profile.regionId" clearable placeholder="请选择区域">
                <el-option v-for="item in regions" :label="item.localName" :key="item.regionId" :value="item.regionId"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="OSS Endpoint" prop="endpoint">
              <el-select v-model="profile.endpoint" clearable placeholder="请选择Endpoint">
                <el-option v-for="item in regions"
                           :label="item.ossEndpoint"
                           :key="item.ossEndpoint"
                           :value="item.ossEndpoint"/>
              </el-select>
              <!--            <el-button @click="refreshRegions">刷新</el-button>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="16">
            <el-form-item>
              <el-button type="primary" @click="addProfile( 'profile' )">确定</el-button>
              <el-button @click="resetForm( 'profile' )" class="reset-button">清空</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="group1" v-if="showChart">
        <el-row>
          <div class="card-group" v-if="cardVisible">
          <el-col :span="8">
            <el-card shadow="always" class="card card-header">
              <div slot="header">
                <span>{{ 'ECS实例数: ' + resources.ecs.length }}</span>
              </div>
              <el-collapse>
                <el-collapse-item class="detail" v-for="item in resources.ecs" :key="item.instanceId" :title="item.instanceId">
                  <div>{{ '实例ID: ' + item.instanceId }}</div>
                  <div>{{ '所在区域: ' + item.localName }}</div>
                  <div>{{ '运行状态: ' + item.status }}</div>
                </el-collapse-item>
              </el-collapse>
            </el-card>
            <div class="gap"/>
            <el-card shadow="always" class="card card-header">
              <div slot="header">
                <span>{{ 'RDS实例数: ' + resources.rds.length }}</span>
              </div>
              <el-collapse>
                <el-collapse-item class="detail" v-for="item in resources.rds" :key="item.dBInstanceId" :title="item.dBInstanceId">
                  <div>{{ '实例ID: ' + item.dBInstanceId }}</div>
                  <div>{{ '所在区域: ' + item.localName }}</div>
                  <div>{{ '运行状态: ' + item.dBInstanceStatus }}</div>
                </el-collapse-item>
              </el-collapse>
            </el-card>
            <div class="gap"/>
            <el-card shadow="always" class="card card-header">
              <div slot="header">
                <span>{{ 'OSS Bucket数: ' + resources.oss.length }}</span>
              </div>
              <el-collapse>
                <el-collapse-item class="detail" v-for="item in resources.oss" :key="item.name" :title="item.name">
                  <div>{{ 'Bucket: ' + item.name }}</div>
                  <div>{{ '所在区域: ' + item.localName }}</div>
                </el-collapse-item>
              </el-collapse>
            </el-card>
          </el-col>
          </div>
          <el-col :span="16">
<!--            <el-row>-->
<!--              <el-col :span="24"><h2 class="main-title">阿里云资源概览</h2></el-col>-->
<!--            </el-row>-->
            <h2 class="main-title" v-if="cardVisible">阿里云资源概览</h2>
            <div id="mapChart"></div>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import 'echarts/map/js/china.js'
import common from '../../api/common'
import user from '../../api/user'

export default {
  name: 'generalView',
  created () {
    common.getRegions().then(res => {
      this.regions = res.data
      console.log(this.regions)
    })
    this.userId = sessionStorage.getItem('userId')
    console.log('general created ' + this.userId)
    if (this.userId) {
      this.showForm = false
      this.showChart = true
      common.getResources(this.userId).then(res => {
        if (res.data.code === 200) {
          this.resources = res.data.data
          console.log(res.data.data)
          let dataPoint = this.mapResources()
          this.renderChart(dataPoint)
        }
      })
    }
  },
  data () {
    let validateAcKey = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入Access Key ID'))
      }
      setTimeout(() => {
        if (value.trim().length === 0) {
          callback(new Error('Access Key ID不能为空'))
        } else {
          callback()
        }
      }, 500)
    }
    let validateAcSecret = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入Access Key Secret'))
      }
      setTimeout(() => {
        if (value.trim().length === 0) {
          callback(new Error('Access Key Secret不能为空'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      userId: null,
      showChart: false,
      showForm: true,
      cardVisible: false,
      loading: false,
      map: {},
      profile: {
        acKey: '',
        acSecret: '',
        regionId: '',
        endpoint: ''
      },
      checkProfile: {
        acKey: [
          {required: true, message: '请输入Key', trigger: 'blur'},
          { validator: validateAcKey, trigger: 'blur' }
        ],
        acSecret: [
          {required: true, message: '请输入Secret', trigger: 'blur'},
          { validator: validateAcSecret, trigger: 'blur' }
        ],
        regionId: [{required: true, message: '请选择Region', trigger: 'blur'}],
        endpoint: [{required: true, message: '请选择Endpoint', trigger: 'blur'}]
      },
      regions: [],
      resources: {}
    }
  },
  watch: {
    resources (newValue, oldValue) {
      this.cardVisible = !!newValue
    }
  },
  methods: {
    mapResources () {
      this.resources.ecs.map((item) => {
        for (let i = 0; i < this.regions.length; i++) {
          let region = this.regions[i]
          if (region.regionId === item.regionId) {
            item.localName = region.localName
            item.province = region.province
          }
        }
        console.log(item)
        return item
      })
      this.resources.rds.map((item) => {
        for (let i = 0; i < this.regions.length; i++) {
          let region = this.regions[i]
          if (region.regionId === item.regionId) {
            item.localName = region.localName
            item.province = region.province
          }
        }
        console.log(item)
        return item
      })
      this.resources.oss.map((item) => {
        for (let i = 0; i < this.regions.length; i++) {
          let region = this.regions[i]
          if (region.ossEndpoint === item.extranetEndpoint) {
            item.localName = region.localName
            item.province = region.province
          }
        }
        console.log(item)
        return item
      })
      let ecs = this.resources.ecs.reduce((prev, cur) => {
        if (cur.province in prev) {
          prev[cur.province]++
        } else {
          prev[cur.province] = 1
        }
        return prev
      }, {})
      let rds = this.resources.rds.reduce((prev, cur) => {
        if (cur.province in prev) {
          prev[cur.province]++
        } else {
          prev[cur.province] = 1
        }
        return prev
      }, ecs)
      let oss = this.resources.oss.reduce((prev, cur) => {
        if (cur.province in prev) {
          prev[cur.province]++
        } else {
          prev[cur.province] = 1
        }
        return prev
      }, rds)
      let dataPoint = []
      for (let key in oss) {
        dataPoint.push({
          name: key,
          value: oss[key]
        })
      }
      console.log(dataPoint)
      return dataPoint
    },
    addProfile (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          console.log(this.profile)
          user.addProfile(this.profile).then(res => {
            if (res.data.code === 200) {
              this.$notify({
                title: '添加成功',
                message: 'Access Key已添加'
              })
              this.loading = false
              this.showChart = true
              this.showForm = false
              user.info().then(res => {
                if (res.data.code === 200) {
                  let userId = res.data.data.userId
                  if (userId) {
                    sessionStorage.setItem('userId', userId)
                    this.userId = userId
                    this.initChart()
                  }
                }
              })
            } else {
              this.loading = false
              this.$notify({
                title: '添加失败',
                message: res.data.data
              })
            }
          }).catch(err => {
            this.loading = false
            this.$notify({
              title: '添加失败',
              message: err.response.status
            })
            console.log(err.response)
          })
        } else {
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    initChart () {
      common.getResources(this.userId).then(res => {
        if (res.data.code === 200) {
          this.resources = res.data.data
          let dataPoint = this.mapResources()
          this.renderChart(dataPoint)
        } else {
          this.$notify({
            title: '数据获取失败',
            message: res.data.data
          })
        }
      }).catch(err => {
        this.$notify({
          title: '网络连接错误',
          message: err.response.status
        })
        console.log(err.response)
      })
    },
    renderChart (dataPoint) {
      this.map = this.$echarts.init(document.getElementById('mapChart'))
      this.map.setOption({ // 进行相关配置
        backgroundColor: '#0a0c13',
        tooltip: {}, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ['High', 'Low'],
          realtime: true,
          calculable: true
        },
        geo: { // 这个是重点配置区
          map: 'china', // 表示中国地图
          roam: true,
          center: [116.07, 29.71],
          zoom: 2.2,
          label: {
            normal: {
              show: false, // 是否显示对应地名
              textStyle: {
                color: '#029fd4'
              }
            },
            emphasis: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: 'rgba(247,244,255,0.98)'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#029fd4',
              areaColor: '#006fff',
              borderWidth: 0,
              shadowColor: 'rgba(0,54,255, 1)',
              shadowBlur: 100
            },
            emphasis: {
              areaColor: '#261eff',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 200,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [{
          name: '实例数量', // 浮动框的标题
          coordinateSystem: 'geo', // 对应上方配置
          type: 'map',
          geoIndex: 0,
          data: dataPoint
        }]
      })
      this.map.on('click', function (params) {
        alert(params.name)
      })
    }
  }
}
</script>

<style scoped>
  .main-title {
    margin-top: 0;
    color: #3a8ee6;
    text-align: center;
  }
  .card-header>>>.el-card__header {
    background-color: #242327;
    border-width: 0;
  }
  .card-header>>>.el-card__header span {
    color: white;
  }
  .card {
    background-color: #242327;
    border-width: 0;
    font-weight: bold;
  }
  .card-group {
    margin-top: 0;
  }
  .gap {
    height: 10px;
  }
  #mapChart{
    width:100%;
    height:600px;
    /*margin: 150px auto;*/
    border:1px solid #0a0c13;
  }
  .add-title {
    color: #3a8ee6;
    margin-top: 0;
  }
  .reset-button {
    color: #bf2020;
    border-color: #bf2020;
  }
  .reset-button:hover {
    color: #da2525;
    border-color: #da2525;
  }
  .detail>>>.el-collapse-item__header {
    background-color: #242327;
    color: #2d70b2;
    font-weight: bold;
    border-bottom: none;
  }
  .detail>>>.el-collapse-item__content {
    background-color: #242327;
    color: #3a8ee6;
  }
  .detail>>>.el-collapse-item__wrap {
    border-bottom: none;
    color: #3a8ee6;
  }
</style>
