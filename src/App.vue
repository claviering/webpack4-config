<template>
  <div class="app">
    <h1>app app</h1>
    <input v-model="msg">
    <p>prop: {{propMessage}}</p>
    <p>msg: {{msg}}</p>
    <p>computed msg: {{computedMsg}}</p>
    <button @click="greet">Greet</button>
    <router-link to="/">
      <h1>main</h1>
    </router-link>
    <router-link to="/body">
      <h1>body</h1>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    propMessage: String
  }
})
export default class App extends Vue {
  // initial data
  msg: number = 123

  // use prop values for initial data

  // lifecycle hook
  mounted () {
    this.greet()
  }

  // computed
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // method
  greet () {
    console.log('greeting: ' + this.msg);
  }
}
</script>

<style lang="less" scoped>

</style>
