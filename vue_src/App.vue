<template>
  <div class="app">
      <router-link to="/body">Go to Body</router-link>
      <router-link to="/main">Go to Main</router-link>
      <router-view></router-view>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      name: 'name',
      showMain: false
    }
  },
  mounted () {
    let name = {
      name: 'name'
    }
    let gender = {
      gender: '1'
    }
    console.log('_.assign(name, gender)', _.assign(name, gender));
  },
  methods: {
    doMore () {
      console.log('doMore')
      this.$router.push('/MyMain')
    }
  }
}
</script>
<style lang="less" scoped>
.app{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    width: 200px;
    height: 200px;
  }
  h1{
    background-color: #000;
    color: #FFF;
    border-radius: 10px;
    text-align: center;
  }
}
</style>
