<style lang="scss">
.view-reslult{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(16, 12, 42, 1);
  background-size: cover;
  .vdr.active:before{
    outline: none;
  }
  .full-screen-btn{
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
}
</style>

<template>
  <div class="view-reslult" :style="{width:`${baseConfig.width}px`,height:`${baseConfig.height}px`, backgroundImage:`linear-gradient(rgba(16, 12, 42, ${1 - baseConfig.backgroundImageOpacity}), rgba(16, 12, 42, ${1 - baseConfig.backgroundImageOpacity})),url(${baseConfig.backgroundImage})`}">
    <canvasItem v-for="item in canvasList" :key="item.id" :item="item" :edit="false" />
  </div>
</template>

<script>
import canvasItem from './public-components/canvas-item'
export default {
  components: {
    canvasItem
  },
  data () {
    return {
      baseConfig: {
        width: 0,
        height: 0
      },
      canvasList: []
    }
  },
  methods: {
    init () {
      const { id } = this.$route.params
      let data = null
      // eslint-disable-next-line
      if (id == 0) {
        data = JSON.parse(window.sessionStorage.getItem('previewData'))
      }
      this.baseConfig = data.baseConfig
      this.canvasList = data.canvasList

      this.$message.info('点击 “回车” 进入全屏模式', 1.5)
      const _this = this
      // 监听键盘按键事件
      this.$nextTick(function () {
        document.addEventListener('keyup', _this.pressEnter, false)
      })
    },
    pressEnter (e) {
      if (e.code === 'Enter') {
        this.fullScreen()
      }
    },
    fullScreen () {
      const element = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    }
  },
  mounted () {
    this.init()
  },
  destroyed () {
    const _this = this
    document.removeEventListener('keyup', _this.pressEnter, false)
  }
}
</script>
