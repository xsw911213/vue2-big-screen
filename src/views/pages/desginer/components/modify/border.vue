<style lang="scss">
.border{
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="border">
    <dv-border-box-1 ref="border" v-if="item.config.style == 1"></dv-border-box-1>
    <dv-border-box-2 ref="border" v-else-if="item.config.style == 2"></dv-border-box-2>
    <dv-border-box-3 ref="border" v-else-if="item.config.style == 3"></dv-border-box-3>
    <dv-border-box-4 ref="border" v-else-if="item.config.style == 4"></dv-border-box-4>
    <dv-border-box-5 ref="border" v-else-if="item.config.style == 5"></dv-border-box-5>
    <dv-border-box-6 ref="border" v-else-if="item.config.style == 6"></dv-border-box-6>
    <dv-border-box-7 ref="border" v-else-if="item.config.style == 7"></dv-border-box-7>
    <dv-border-box-8 ref="border" v-else-if="item.config.style == 8"></dv-border-box-8>
    <dv-border-box-9 ref="border" v-else-if="item.config.style == 9"></dv-border-box-9>
    <dv-border-box-10 ref="border" v-else-if="item.config.style == 10"></dv-border-box-10>
    <dv-border-box-11 ref="border" v-else-if="item.config.style == 11"></dv-border-box-11>
    <dv-border-box-12 ref="border" v-else-if="item.config.style == 12"></dv-border-box-12>
    <dv-border-box-13 ref="border" v-else-if="item.config.style == 13"></dv-border-box-13>
  </div>
</template>

<script>
let timer = null
function d (cb) {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    cb()
  }, 500)
}
export default {
  props: {
    item: Object
  },
  watch: {
    'item.config.width': function () {
      d(this.$refs.border.initWH)
    },
    'item.config.height': function () {
      d(this.$refs.border.initWH)
    }
  },
  mounted () {
  },
  data () {
    return {

    }
  }
}
</script>
