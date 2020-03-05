<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body {
    background-color: #0a0c13;/*242327*/
    margin:0px;
    width:100%;
    height: 100%;
    /*overflow: scroll;*/
  }
  .el-card__header {
    background-color: #09121b;/*#3c3f41;*/
    border-width: 0;
    border-color: #3198a2;
  }
  .chartGroup {
    /*width: 100%;*/
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    background-color: #0a0c13;
    border-width: 2px;
    border-color: #09121b;
  }
  span {
    color: #3198a2;
  }
  .el-tabs {
    border-width: 0;
  }
  .el-tabs__active-bar.is-top {
    background-color: #0a0c13;
    width: -moz-calc(100% - 4px) !important;
    width: -webkit-calc(100% - 4px) !important;
    width: calc(100% - 4px) !important;
    border-style: solid;
    border-left-width: 2px;
    border-right-width: 2px;
    border-color: #3a8ee6;
    border-top: none;
    border-bottom: none;
  }
  .el-tabs__item {
    color: #3a8ee6;
    padding: 0 0;
  }
  .el-tabs__item.is-top {
    width: 100%;
    text-align: center;
  }
  .el-tabs__item.is-active {
    width: 100%;
    height: 100%;
    background: linear-gradient(to left, #3a8ee6, #3a8ee6) left top no-repeat,
                linear-gradient(to bottom, #3a8ee6, #3a8ee6) left top no-repeat,
                linear-gradient(to left, #3a8ee6, #3a8ee6) right top no-repeat,
                linear-gradient(to bottom, #3a8ee6, #3a8ee6) right top no-repeat,
                linear-gradient(to left, #3a8ee6, #3a8ee6) left bottom no-repeat,
                linear-gradient(to bottom, #3a8ee6, #3a8ee6) left bottom no-repeat,
                linear-gradient(to left, #3a8ee6, #3a8ee6) right bottom no-repeat,
                linear-gradient(to left, #3a8ee6, #3a8ee6) right bottom no-repeat;
    background-size: 2px 20px, 20px 2px, 2px 20px, 20px 2px;
  }
  .el-tabs__item::after {
    color: #3a8ee6;
    border-color: #0a0c13;
  }
  .el-tabs>.el-tabs__header {
    background-color: #0a0c13;
    border-color: #3a8ee6;
  }
  .el-tabs__nav-wrap::after {
    background-color: #3a8ee6;
  }
  .el-tabs__nav-wrap::before {
    background-color: #3a8ee6;
  }
  .el-tabs__nav.is-top {
    border-color: #3a8ee6;
  }
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
