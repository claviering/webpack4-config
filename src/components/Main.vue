<template>
  <div class="main">
    <h1>Main</h1>
    <input type="text" placeholder="placeholder"/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {cube, square} from '@/utils/math' // tree shaking test

@Component({})
export default class App extends Vue {
  // initial data
  msg: number = 123

  // lifecycle hook
  mounted () {
    console.log(cube(2))
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
</script>

<style lang="less" scoped>
</style>
