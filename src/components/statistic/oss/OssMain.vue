<template>
  <div>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Bucket列表" name="bucket" @click="tabChange('bucket')">
          <div class="search">
            <el-input class="elInput" v-model="bucketName" placeholder="输入Bucket名称进行搜索"/>
          </div>
          <div>
            <el-table
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
          <rule-table v-if="isReady" :rule-list="ruleList"/>
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
    ossInfo.getBuckets(this.userId).then(res => {
      this.bucketList = res.data
      this.bucketList.forEach(function (item) {
        item['creationDate'] = moment(item['creationDate']).format('YYYY/MM/DD HH:mm')
      })
    })
    rule.getOssRuleList(this.userId).then(res => {
      this.ruleList = res.data
      this.isReady = true
    })
  },
  data () {
    return {
      userId: '1072760173225591',
      bucketName: '',
      activeTab: 'bucket',
      bucketList: [],
      ruleList: [],
      isReady: false
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
    }
  }
}
</script>

<style scoped>
  .search {
    display: flex;
  }
</style>
