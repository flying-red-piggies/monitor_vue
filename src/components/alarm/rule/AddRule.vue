<template>
  <div>
    <el-row>
      <el-col :span="24"><el-page-header @back="goBack" :content="'创建报警规则'"/></el-col>
    </el-row>
    <el-form ref="form" :model="form" label-width="80px" status-icon :rules="checkRules"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-form-item label="监控类型" prop="namespace">
        <el-select v-model="form.namespace" clearable placeholder="请选择产品类型" @change="selectNamespace">
          <el-option label="云服务器ECS" value="ECS"/>
          <el-option label="云数据库RDS" value="RDS"/>
          <el-option label="对象存储OSS" value="OSS"/>
        </el-select>
      </el-form-item>
      <el-form-item label="实例" v-if="isId" prop="resources.instanceId">
        <el-select v-model="form.resources.instanceId" clearable placeholder="请选择实例">
          <el-option v-for="item in instanceIds" :label="item" :key="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Bucket" v-if="isName" prop="resources.bucketName">
        <el-select v-model="form.resources.bucketName" clearable placeholder="请选择Bucket">
          <el-option v-for="item in bucketNames" :label="item" :key="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="规则名称" prop="ruleName">
            <el-input v-model="form.ruleName" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规则ID" prop="ruleId">
            <el-input v-model="form.ruleId" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="规则描述" prop="metricName">
            <el-select v-model="form.metricName" clearable placeholder="请选择监控项" @change="metricChange">
              <el-option v-for="item in metricNames" :label="item" :key="item" :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="1px" prop="period">
            <el-select v-model="form.period" clearable placeholder="请选择周期长度">
              <el-option v-for="item in periods" :label="item.label" :key="item.period" :value="item.period"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="1px" prop="times">
            <el-select v-model="form.times" clearable placeholder="请选择持续周期">
              <el-option v-for="item in timesList" :label="item.label" :key="item.times" :value="item.times"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="1px" prop="statistics">
            <el-select v-model="form.statistics" clearable placeholder="请选择监控值">
              <el-option v-for="item in statistics" :label="item" :key="item" :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label-width="1px" prop="comparisonOperator">
            <el-select v-model="form.comparisonOperator" clearable placeholder="比较符">
              <el-option v-for="item in operators" :label="item.op" :key="item.name" :value="item.name"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label-width="1px" prop="threshold">
            <el-input v-model.number="form.threshold" clearable placeholder="阈值"/>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-tag class="tags">%</el-tag>
        </el-col>
      </el-row>
      <el-form-item label="报警对象" prop="contactGroups">
        <el-select v-model="form.contactGroups" clearable placeholder="报警联系人组">
          <el-option v-for="item in contactGroups" :label="item.name" :key="item.name" :value="item.name"/>
        </el-select>
      </el-form-item>
      <el-form-item label="报警级别" prop="warn">
        <el-radio-group v-model="form.warn">
          <el-radio :label="false">邮件+钉钉机器人(Info)</el-radio>
          <el-radio :label="true">短信+邮件+钉钉机器人(Warning)</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirmAdd( 'form' )">立即创建</el-button>
        <el-button @click="resetForm( 'form' )" class="reset-button">清空</el-button>
        <el-button @click="goBack" class="cancel-button">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import rule from '../../../api/alarm/rule'
import group from '../../../api/alarm/group'
import ecsInfo from '../../../api/ecs/EcsInfo'
import rdsInfo from '../../../api/rds/RdsInfo'
import ossInfo from '../../../api/oss/OssInfo'
import common from '../../../api/common'

export default {
  name: 'addRule',
  created () {
    this.form.userId = this.$route.params.userId
    common.getOperators().then(res => {
      this.operators = res.data
      console.log(res.data)
      console.log(this.operators)
    })
    group.getGroupList(this.form.userId).then(res => {
      this.contactGroups = res.data
    })
  },
  data () {
    let validateRuleName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入规则名称'))
      }
      setTimeout(() => {
        if (value.trim().length === 0) {
          callback(new Error('规则名称不能为空'))
        } else {
          callback()
        }
      }, 500)
    }
    let validateRuleId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入规则ID'))
      }
      setTimeout(() => {
        if (value.trim().length === 0) {
          callback(new Error('规则ID不能为空'))
        } else {
          callback()
        }
      }, 500)
    }
    let validateThreshold = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入阈值'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入整数值'))
        } else {
          if (value < 1 || value > 100) {
            callback(new Error('阈值范围在1~100'))
          } else {
            callback()
          }
        }
      }, 500)
    }
    return {
      loading: false,
      form: {
        userId: '',
        ruleId: '',
        ruleName: '',
        resources: {
          instanceId: null,
          bucketName: null
        },
        namespace: '',
        metricName: '',
        period: '',
        times: '',
        statistics: '',
        comparisonOperator: '',
        threshold: '',
        contactGroups: '',
        warn: false,
        webhook: null
      },
      instanceIds: [],
      bucketNames: [],
      isName: false,
      isId: false,
      metricNames: [],
      periods: [
        {
          label: '1分钟周期',
          period: 60
        },
        {
          label: '5分钟周期',
          period: 300
        },
        {
          label: '15分钟周期',
          period: 900
        },
        {
          label: '30分钟周期',
          period: 1800
        },
        {
          label: '60分钟周期',
          period: 3600
        }
      ],
      timesList: [
        {
          label: '持续1个周期',
          times: 1
        },
        {
          label: '持续3个周期',
          times: 3
        },
        {
          label: '持续5个周期',
          times: 5
        },
        {
          label: '持续10个周期',
          times: 10
        },
        {
          label: '持续15个周期',
          times: 15
        },
        {
          label: '持续30个周期',
          times: 30
        },
        {
          label: '持续60个周期',
          times: 60
        },
        {
          label: '持续90个周期',
          times: 90
        },
        {
          label: '持续120个周期',
          times: 120
        },
        {
          label: '持续180个周期',
          times: 180
        }
      ],
      statistics: [],
      operators: [],
      contactGroups: [],
      checkRules: {
        namespace: [
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        ruleName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: validateRuleName, trigger: 'blur' }
        ],
        ruleId: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: validateRuleId, trigger: 'blur' }
        ],
        metricName: [
          { required: true, message: '请选择监控项', trigger: 'blur' }
        ],
        period: [
          { required: true, message: '请选择周期长度', trigger: 'blur' }
        ],
        times: [
          { required: true, message: '请选择持续周期', trigger: 'blur' }
        ],
        statistics: [
          { required: true, message: '请选择监控值', trigger: 'blur' }
        ],
        comparisonOperator: [
          { required: true, message: '请选择比较符', trigger: 'blur' }
        ],
        threshold: [
          { required: true, message: '请输入阈值', trigger: 'blur' },
          { validator: validateThreshold, trigger: 'blur' }
        ],
        contactGroups: [
          { required: true, message: '请选择联系人组', trigger: 'blur' }
        ],
        warn: [
          { required: true, message: '请选择报警级别', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    selectNamespace (value) {
      this.instanceIds.splice(0, this.instanceIds.length)
      common.getMetricNames(value).then(res => {
        this.metricNames = res.data
        console.log(this.metricNames)
      })
      if (value === 'ECS') {
        ecsInfo.getIds(this.form.userId).then(res => {
          this.instanceIds = res.data
          this.isId = true
          this.isName = false
        })
      } else if (value === 'RDS') {
        rdsInfo.getIds(this.form.userId).then(res => {
          this.instanceIds = res.data
          this.isId = true
          this.isName = false
        })
      } else if (value === 'OSS') {
        ossInfo.getNames(this.form.userId).then(res => {
          this.bucketNames = res.data
          this.isId = false
          this.isName = true
        })
      } else {
      }
    },
    metricChange (metricName) {
      common.getStatistics(metricName).then(res => {
        this.statistics = res.data
      })
    },
    confirmAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          console.log(this.form)
          rule.addRule(this.form).then(res => {
            if (res.data.code === 400) {
              this.loading = false
              this.$notify({
                title: res.data.message,
                message: res.data.data
              })
            } else {
              this.$notify({
                title: '添加成功',
                message: '成功添加报警规则'
              })
              this.loading = false
              this.$router.push({
                name: 'ruleMain',
                params: {
                  ruleList: res.data.data
                }
              })
            }
          }).catch(err => {
            this.loading = false
            this.$notify({
              title: '失败',
              message: err.response.status
            })
            console.log(err.response.data)
          })
        } else {
          console.log(this.form)
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .tags {
    background-color: #0a0c13;
    border: none;
    font-size: medium;
    padding-top: 12%;
  }
  .reset-button {
    color: #bf2020;
    border-color: #bf2020;
  }
  .reset-button:hover {
    color: #da2525;
    border-color: #da2525;
  }
  .cancel-button {
    color: #72767b;
  }
  .cancel-button:hover {
    color: #a4acb1;
  }
</style>
