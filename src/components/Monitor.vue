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
          <i class="el-icon-s-home"/>
          <span slot="title">概览</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-video-camera"/>
            <span>监控数据</span>
          </template>
          <el-menu-item-group>
            <template slot="title">监控</template>
            <el-menu-item index="/ecsMonitor">ECS监控</el-menu-item>
            <el-menu-item index="/ossMonitor">OSS监控</el-menu-item>
            <el-menu-item index="/rdsMonitor">RDS监控</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="rightContent">
      <router-view/>
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
    /*overflow: scroll;*/
  }
  #monitor {
    margin: 0 auto;
    padding: 20px;
  }
  .leftNav {
    float: left;
    width:250px;
    position: fixed;
  }
  .leftNav #elMenu {
    height: 610px;
  }
  .rightContent {
    margin-left: 270px;
    overflow: hidden;
  }
</style>
