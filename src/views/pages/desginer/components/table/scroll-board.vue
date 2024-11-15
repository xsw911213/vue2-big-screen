<style lang="scss">
.scroll-board{
  user-select:none
}
</style>

<template>
  <div class="scroll-board">
    <dv-scroll-board :config="item.config.demoJson.data" :style="{width: `${item.config.width}px`,height: `${item.config.height}px`}"/>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {}
  }
}
</script>
