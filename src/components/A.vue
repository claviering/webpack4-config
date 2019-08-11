<template>
  <div class="a">
    <h1>A</h1>
    <div id="midLine"></div>
    <h1>第一种思路 补空格</h1>
    <h3 class="demo">Every 20 Minutes&nbsp;&nbsp;&nbsp;&nbsp;</h3>
    <h3 class="demo">&nbsp;Look 20 Feet Away</h3>
    <h3 class="demo">For 20 Seconds</h3>
    <h1>第二种思路 分开两个 div</h1>
    <div class="box">
      <div class="left-text">Every&nbsp;</div>
      <div class="center-text">20 Minutes</div>
    </div>
    <div class="box">
      <div class="left-text">Look&nbsp;</div>
      <div class="center-text">20 Feet Away</div>
    </div>
    <div class="box">
      <div class="left-text">For&nbsp;</div>
      <div class="center-text">20 Seconds</div>
    </div>
    <h1>第三种思路 css shapes</h1>
    <div class="box-polygon">
      <p>Every 20 Minutes</p>
      <p>Look 20 Feet Away</p>
      <p>For 20 Seconds</p>
    </div>
  </div>
</template>
<script>
export default {
  watch: {
    $route (to, from){
      console.log('watch route in A');
    }
  },
}
</script>
<style lang="less">
.a{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#midLine {
  width: 2px;
  height: 100%;
  background: red;
  position: absolute;
  left: 50%;
  top: 20%;
}
h3{
  font-size: 2em;
}
.demo{
  text-align: center;
}
.box{
  display: flex;
  font-size: 2em;
  font-weight: bold;
  padding-top: 12px;
}
.left-text{
  width: 45%;
  text-align: right;
}
.box-polygon{
  &::before{
    content: "";
    float: left;
    shape-outside: polygon(0 0, 0 100%, 100% 100%, 100% 50%, 70% 49%, 70% 35%, 50% 33%, 64% 17%, 26% 16%, 62% 0);
    width: 200px;
    height: 200px;
  }
}
</style>
