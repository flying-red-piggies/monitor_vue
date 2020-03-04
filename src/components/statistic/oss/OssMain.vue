<template>
  <el-tabs type="border-card" v-model="activeTab">
    <el-tab-pane label="Bucket列表" name="instance" :key="instance">
      <div class="search">
        <el-input class="elInput" placeholder="输入Bucket名称进行搜索"/>
        <el-button>搜索</el-button>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="bucketList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
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
            <router-link slot-scope="scope" style="color: blue" :to="{name:'ossMonitor', query:{bucketName: scope.row.name}}">监控图表报警规则</router-link>
          </el-table-column>
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane label="报警规则" name="warn" :key="warn">报警规则</el-tab-pane>
  </el-tabs>
  <router-view/>
</template>

<script>
import ossInfo from '@/api/oss/ossInfo'

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
      activeTab: 'instance',
      bucketList: []
    }
  }
}
</script>

<style scoped>

</style>
