<template>
  <div class="app">
    <h1>Body</h1>
  </div>
</template>
<script>
import _ from 'lodash';
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
    Object.assign
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
    background-color: yellow;
    color: #FFF;
    border-radius: 10px;
    text-align: center;
  }
}
</style>
