<template>
  <div>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Bucket列表" name="bucket" @click="tabChange('bucket')">
          <div class="search">
            <el-input class="elInput" v-model="bucketName" placeholder="输入Bucket名称进行搜索"/>
            <el-button @click="refreshOss" class="refresh-button">刷新</el-button>
          </div>
          <div>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              ref="multipleTable"
              :data="search(bucketList, bucketName)"
              tooltip-effect="dark"
              style="width: 100%;">
              <!--          @selection-change="handleSelectionChange"-->
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="Bucket名称"
                width="150">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column
                label="创建时间"
                width="150">
                <template slot-scope="scope">{{ scope.row.creationDate }}</template>
              </el-table-column>
              <el-table-column
                label="所在地域">
                <template slot-scope="scope">{{ scope.row.location }}</template>
              </el-table-column>
              <el-table-column
                label="endpoint">
                <template slot-scope="scope">{{ scope.row.extranetEndpoint }}</template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="80">
                <template slot-scope="scope">
                  <el-link @click="showChart(scope.row)">监控图表</el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="报警规则" name="warn" @click="tabChange('warn')">
          <rule-table v-if="isReady" :rule-list="ruleList" :loading="ruleLoading" @refreshRules="refreshRules"/>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import ossInfo from '../../../api/oss/OssInfo'
import rule from '../../../api/alarm/rule'
import moment from 'moment'
import tableSearch from '../../../common/table/tableSearch'

import ruleTable from '../../../common/table/ruleTable'

export default {
  name: 'ossMain',
  components: {
    ruleTable
  },
  created () {
    this.loading = this.ruleLoading = true
    ossInfo.getBuckets(this.userId).then(res => {
      this.bucketList = res.data
      this.bucketList.forEach(function (item) {
        item['creationDate'] = moment(item['creationDate']).format('YYYY/MM/DD HH:mm')
      })
      this.loading = false
    })
    rule.getOssRuleList(this.userId).then(res => {
      this.ruleList = res.data
      this.isReady = true
      this.ruleLoading = false
    })
  },
  data () {
    return {
      userId: '1072760173225591',
      bucketName: '',
      activeTab: 'bucket',
      bucketList: [],
      ruleList: [],
      isReady: false,
      loading: false,
      ruleLoading: false
    }
  },
  methods: {
    search (tableData, key) {
      return tableSearch.filter(tableData, key)
    },
    tabChange (activeName) {
      this.activeTab = activeName
    },
    showChart: function (scopedRow) {
      this.$router.push({
        name: 'ossMonitor',
        params: {
          userId: this.userId,
          bucketName: scopedRow.name
        }
      })
    },
    refreshOss () {
      this.loading = true
      ossInfo.refreshBuckets(this.userId).then(res => {
        if (res.data.code === 400) {
          this.loading = false
          this.$message(res.data.message)
        } else {
          this.bucketList = res.data
          this.bucketList.forEach(function (item) {
            item['creationDate'] = moment(item['creationDate']).format('YYYY/MM/DD HH:mm')
          })
          this.loading = false
          this.$message('刷新成功')
        }
      }).catch(err => {
        this.loading = false
        this.$notify({
          title: '失败',
          message: err.response.status
        })
        console.log(err.response.data)
      })
    },
    refreshRules () {
      this.ruleLoading = true
      rule.refreshRules(this.userId, 'OSS').then(res => {
        if (res.data.code === 400) {
          this.ruleLoading = false
          this.$message(res.data.message)
        } else {
          this.ruleList = res.data
          this.ruleLoading = false
          this.$message('刷新成功')
        }
      }).catch(err => {
        this.ruleLoading = false
        this.$notify({
          title: '失败',
          message: err.response.status
        })
        console.log(err.response.data)
      })
    }
  }
}
</script>

<style scoped>
  .refresh-button {
    float: right;
    background-color: #337eca;
    border: 1px solid #337eca;
    color: #000000;
    font-weight: bold;
  }
  .refresh-button:hover {
    background-color: #0a0c13;
    border: 1px  solid #337eca;
    color: #337eca;
  }
</style>
