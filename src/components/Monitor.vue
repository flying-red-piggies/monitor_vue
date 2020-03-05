<template>
  <div id="monitor">
    <div class="leftNav">
      <el-menu id="elMenu" :default-active="this.$router.path" router
               class="el-menu-vertical-demo"
               background-color="#0a0c13"
               text-color="#fff"
               active-text-color="#3198a2">
        <!--                  index写设置的路由路径-->
        <el-menu-item index="/generalView">
          <i class="el-icon-s-home"/>
          概览
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-video-camera"/>
            监控数据
          </template>
          <el-menu-item-group>
            <template slot="title">监控</template>
            <el-menu-item index="/ecsMain">ECS监控</el-menu-item>
            <el-menu-item index="/ossMain">OSS监控</el-menu-item>
            <el-menu-item index="/rdsMain">RDS监控</el-menu-item>
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
  name: 'monitor',
  watch: {
    $route (to, from) {
      console.log('routerPath: ' + to.path)
    }
  }
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
  .leftNav #elMenu {
    float: left;
    width:250px;
    position: fixed;
    height: 610px;
    border-right: 0;
    /*overflow: scroll;*/
  }
  .rightContent {
    margin-left: 270px;
    overflow: hidden;
  }
  /* 定义滚动条样式 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(240, 240, 240, 1);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
    border-radius: 10px;
    background-color: rgba(240, 240, 240, .5);
  }
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
    background-color: rgba(240, 240, 240, .5);
  }
</style>
