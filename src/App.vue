<template>
  <div class="app">
    <h1>app app</h1>
    <h1>app</h1>
    <router-link to="/main">
      <h1>main</h1>
    </router-link>
    <router-link to="/body">
      <h1>body</h1>
    </router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
h1{
  box-shadow: 0 2px 3px rgba(0,0,0,1);
}
</style>
