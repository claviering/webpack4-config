<template>
  <div class="app">
    <h1>Hello World yes!</h1>
    <h1>{{ name }}</h1>
    <img src="./1.jpeg" alt="">
    <el-row>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  data () {
    return {
      name: 'name'
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
    console.log(_.assign(name, gender));
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
