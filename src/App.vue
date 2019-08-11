<template>
  <div class="app">
    <h1>app app</h1>
    <h1>app</h1>
    <router-link to="/">
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
  data () {
    return {
      number: 10
    }
  },
  watch: {
    $route (to, from){
        console.log('watch route in App');
    }
  },
}
</script>
<style lang="less" scoped>
</style>
