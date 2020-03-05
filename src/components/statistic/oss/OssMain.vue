<template>
  <div>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Bucket列表" name="bucket" @click="tabChange('bucket')">
          <div class="search">
            <el-input class="elInput" v-model="bucketName" placeholder="输入Bucket名称进行搜索"/>
            <el-button class="searchBtn">搜索</el-button>
          </div>
          <div>
            <el-table
              ref="multipleTable"
              :data="bucketList"
              tooltip-effect="dark"
              style="width: 100%;">
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
                  <el-link @click="showChart(scope.row)">监控图表</el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="报警规则" name="warn" @click="tabChange('warn')">报警规则</el-tab-pane>
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
      bucketName: '',
      activeTab: 'bucket',
      bucketList: []
    }
  },
  methods: {
    tabChange (activeName) {
      this.activeTab = activeName
    },
    showChart: function (scopedRow) {
      this.$router.push({name: 'ossMonitor', params: {bucketName: scopedRow.name}})
    }
  }
}
</script>

<style>
  .search {
    display: flex;
  }
  .search .elInput {
    width: 400px;
    height: 40px;
    margin: 0 20px 20px 0;
  }
  .search .searchBtn {
    height: 40px;
    background: #0a0c13;
    border: 1px solid #122f5c;
  }
  .search .searchBtn:hover {
    height: 40px;
    background: #1a2032;
    border: 1px solid #122f5c;
  }
  .el-input > input {
    background-color: rgb(18, 47, 92);
    border-style: none;
  }
  .el-table {
    border-style: solid;
    border-color: rgb(18, 47, 92);
    border-width: 1px;
  }
  /*表头样式*/
  .el-table .el-table__header-wrapper tr th{
    background-color: rgb(18, 47, 92)!important;
    color: rgb(255, 255, 255);
  }
  /*每行样式*/
  .el-table .el-table__row{
    background-color: rgb(18, 47, 92);
    color: rgb(255, 255, 255);
  }
  /*hover每行的样式*/
  .el-table .el-table__body tr.current-row > td {
    background-color: #0D1F34 !important;
  }
  .el-table .el-table__body tr:hover > td {
    background-color: #0D1F34 !important;
  }
  /*每行边框的样式*/
  .el-table td,
  .el-table th.is-leaf{
    border-bottom: 1px solid #3a8ee6;
    border-right:1px solid #3a8ee6;
  }
  .el-table::before {
    background-color: #0a0c13;
  }
  .el-table__empty-block {
    background-color: #0D1F34;
  }
</style>
