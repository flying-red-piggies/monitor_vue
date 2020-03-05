<template>
  <div>
  <el-tabs type="border-card" v-model="activeTab">
    <el-tab-pane label="Bucket列表" name="bucket">
      <div class="search">
        <el-input class="elInput" placeholder="输入Bucket名称进行搜索"/>
        <el-button>搜索</el-button>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="bucketList"
          tooltip-effect="dark"
          style="width: 100%">
<!--          @selection-change="handleSelectionChange"-->
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="Bucket名称"
            width="120">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column
            label="创建时间">
            <template slot-scope="scope">{{ scope.row.creationDate }}</template>
          </el-table-column>
          <el-table-column
            label="所在地域"
            width="120">
            <template slot-scope="scope">{{ scope.row.location }}</template>
          </el-table-column>
          <el-table-column
            label="endpoint"
            width="120">
            <template slot-scope="scope">{{ scope.row.extranetEndpoint }}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-link style="color: blue" @click="showChart(scope.row)">监控图表报警规则</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="报警规则" name="warn" :key="warn">报警规则</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import ossInfo from '../../../api/oss/OssInfo'

export default {
  name: 'ossMain',
  created () {
    ossInfo.getBuckets().then(res => {
      this.bucketList = res.data
      console.log(res.data)
    })
  },
  data () {
    return {
      activeTab: 'bucket',
      bucketList: []
    }
  },
  methods: {
    showChart: function (scopedRow) {
      this.$router.push({name: 'ossMonitor', params: {bucketName: scopedRow.name}})
    }
  }
}
</script>

<style scoped>

</style>
