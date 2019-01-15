<template>
  <div class="main">
    <h1>Main</h1>
    <qr-code v-bind:text="qrCodeUrl" :size="180"></qr-code>
  </div>
</template>
<script>
import _ from 'lodash';
import qrCode from 'vue-qrcode-component'
export default {
  components: {
    qrCode
  },
  data () {
    return {
      name: 'name',
      qrCodeUrl:'http://weixin.qq.com/r/dnWbg33EuiDFrTng9yBk'
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
