<template>
  <div class="main">
    <h1>Main</h1>
    <span class="icon-data-guide"></span>
    <span class="icon-guide"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
    <span class="icon-store"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span></span>
    <input type="text" placeholder="placeholder"/>
  </div>
</template>
<script>
import {cube, square} from '@/utils/math' // tree shaking test
export default {
  components: {
  },
  data () {
    return {
      name: 'name',
    }
  },
  mounted () {
    // tree shaking square 没有引入或者函数引入没使用，都会被 shaking
    console.log(cube(2))
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
</script>
<style lang="less" scoped>
.main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: grid;
  transition: all .5s;
  user-select: none;
  input{
    &::placeholder {
      color: red;
    }
  }
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
