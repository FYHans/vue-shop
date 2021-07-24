<template>
  <div id="app">
    <!-- <router-view v-if="window.sessionStorage.username"></router-view>
    <Login v-else></Login> -->
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  html,
  body,
  #app {
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
  }

  .el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  }
</style>

<script>
// import Login from '@/views/login/Login';
// export default {
//   components: { Login }
// }
</script>