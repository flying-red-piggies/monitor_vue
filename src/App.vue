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
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
