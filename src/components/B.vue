<template>
  <div class="b">
    <h1>B</h1>
    <h1 v-if="defer(200)">延迟加载</h1>
  </div>
</template>
<script>
import Defer from '@/mixins/Defer'
export default {
  mixins: [
    Defer(300), // 最多延迟 3s
  ],
  watch: {
    $route (to, from){
      console.log('watch route in B');
    }
  },
}
</script>
