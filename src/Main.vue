<template>
  <div class="main">
    <h1>Main</h1>
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
  }
}
</script>
<style lang="less" scoped>
.main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    width: 200px;
    height: 200px;
  }
  h1{
    background-color: pink;
    color: #FFF;
    border-radius: 10px;
    text-align: center;
  }
}
</style>
