<template>
  <div id="monitor">
    <div class="leftNav">
      <el-menu :default-active="this.$router.path" router
               class="el-menu-vertical-demo">
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
<!--    <el-row class="tac">-->
<!--      &lt;!&ndash;          侧栏&ndash;&gt;-->
<!--      <el-col :md="4" :xs="12">-->
<!--        <div>-->
<!--          <el-menu :default-active="this.$router.path" router-->
<!--                   class="el-menu-vertical-demo">-->
<!--            &lt;!&ndash;                  index写设置的路由路径&ndash;&gt;-->
<!--            <el-menu-item index="/generalView">-->
<!--              <i class="el-icon-s-home"></i>-->
<!--              <span slot="title">概览</span>-->
<!--            </el-menu-item>-->
<!--            <el-submenu index="2">-->
<!--              <template slot="title">-->
<!--                <i class="el-icon-video-camera"></i>-->
<!--                <span>监控数据</span>-->
<!--              </template>-->
<!--              <el-menu-item-group>-->
<!--                <template slot="title">监控</template>-->
<!--                <el-menu-item index="/ecsMonitor">ecs监控</el-menu-item>-->
<!--                <el-menu-item index="/ossMonitor">oss监控</el-menu-item>-->
<!--              </el-menu-item-group>-->
<!--            </el-submenu>-->
<!--          </el-menu>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      &lt;!&ndash;          右边内容区域&ndash;&gt;-->
<!--      <el-col :md="8" :xs="12" id="showContent">-->
<!--        <div>-->
<!--          <router-view></router-view>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->
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
  #monitor {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .leftNav {
    width: 250px;
    margin-right: 20px;
  }
  .rightContent {
    display: flex;
    justify-content: center;
    align-items: center;
    /*width: 100%;*/
  }
  #showContent {
    margin-left: 20px;
    margin-top: 20px;
  }
</style>
