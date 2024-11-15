<style lang="scss">
.media{
  position: absolute;
  width: 100%;
  height: 100%;
  &-image{
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .swiper-slide img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

<template>
  <div class="media">
    <img class="media-image" v-if="item.name == 'media-image'" :src="item.config.src" alt="" srcset="">
    <iframe class="media-image" v-else-if="item.name == 'media-iframe'" :src="item.config.src" frameborder="0" />
    <video class="media-image" v-else-if="item.name == 'media-video'" :src="item.config.src" />
    <div v-else-if="item.name == 'media-swiper'" class="media-image swiper-container">
      <div class="swiper-wrapper">
        <!-- eslint-disable-next-line -->
        <div v-for="item in item.config.imgList" class="swiper-slide">
          <img :src="item.url">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Swiper from 'swiper/swiper-bundle.min.js'
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
  mounted () {
    if (this.item.name === 'media-swiper') {
      setTimeout(() => {
        this.initSwiper()
      }, 100)
    }
  },
  watch: {
    'item.config.width': function () {
      d(this.initSwiper)
    },
    'item.config.height': function () {
      d(this.initSwiper)
    },
    'item.config.imgList': function (v) {
      d(this.initSwiper)
    }
  },
  data () {
    return {
      swiper: null
    }
  },
  methods: {
    initSwiper () {
      if (this.swiper) {
        this.swiper.destroy()
        this.swiper = null
      }
      this.swiper = new Swiper('.swiper-container', {
        autoplay: true,
        loop: true
      })
    }
  }
}
</script>
