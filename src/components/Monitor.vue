<template>
  <div id="monitor">
    <div class="leftNav">
      <el-menu id="elMenu" :default-active="this.$router.path" router
               class="el-menu-vertical-demo"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b">
        <!--                  index写设置的路由路径-->
        <el-menu-item index="/generalView">
          <i class="el-icon-s-home"></i>
          <span slot="title">概览</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-video-camera"></i>
            <span>监控数据</span>
          </template>
          <el-menu-item-group>
            <template slot="title">监控</template>
            <el-menu-item index="/ecsMonitor">ecs监控</el-menu-item>
            <el-menu-item index="/ossMonitor">oss监控</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="rightContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'monitor'
}
</script>

<style scoped>
  body {
    margin:0px;
    width:100%;
    height: 100%;
    overflow: scroll;
    background-color:#F0F0F0
  }
  .leftNav {
    float: left;
    width:250px;
    padding: 10px;
    padding-top: 0;
    position: fixed;
  }
  .rightContent {
    margin-left: 280px;
    overflow: hidden;
  }
</style>
