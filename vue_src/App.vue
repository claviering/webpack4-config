<template>
  <div>
    <h1>Hello World!</h1>
    <h1>{{ name }}</h1>
    <img src="./1.jpeg" alt="">
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 'name'
    }
  }
}
</script>
<style lang="less" scoped>
h1{
  background-color: #000;
  color: #FFF;
  border-radius: 10px;
}
</style>
