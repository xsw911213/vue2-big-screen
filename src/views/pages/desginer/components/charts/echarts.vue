<style lang="scss">
.echart-container{
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="echart-container" :id="item.id"></div>
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
  data () {
    return {
      mycharts: null
    }
  },
  // components: {},
  props: {
    item: Object
  },
  watch: {
    'item.config.width': function () {
      d(this.init)
    },
    'item.config.height': function () {
      d(this.init)
    },
    'item.config.api': function () {
      d(this.getOptions)
    },
    'item.config.demoJson': {
      handler () {
        d(this.getOptions)
      },
      deep: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      if (this.mycharts) {
        this.mycharts.dispose()
      }
      const dom = document.getElementById(this.item.id)
      this.mycharts = this.$echarts.init(dom, 'dark')
      this.getOptions()
    },
    async getOptions () {
      const { api, demoJson } = this.item.config
      let options = demoJson.data
      if (api) {
        // 获取数据之后修改 options
        console.log(api)
      }
      this.mycharts.setOption(options)
    }
  }
}
</script>
