<style lang="scss">
.text{
  position: absolute;
  width: 100%;
  height: 100%;
  &-text{
    display: flex;
    height: 100%;
    justify-content:center;
    align-items: center;
    color:#bcc8d4;
  }
  &-marquee{
    position: relative;
    font-size: 32px;
    display: flex;
    height: 100%;
    justify-content:center;
    align-items: center;
    color:#bcc8d4;
  }
}
</style>

<template>
  <div class="text">
    <p class="text-text" v-if="item.name == 'text-text'">{{item.config.text}}</p>
    <marquee class="text-marquee" v-else-if="item.name == 'text-marquee'">{{item.config.text}}</marquee>
    <a class="text-text" target="_blank" v-else-if="item.name == 'text-href'" :href="item.config.href">{{item.config.text}}</a>
    <p class="text-text" v-else-if="item.name == 'text-time'">{{time}}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  mounted () {
    if (this.item.name === 'text-time') {
      this.getTime()
    }
  },
  data () {
    return {
      time: ''
    }
  },
  methods: {
    getTime () {
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hh = date.getHours()
      let mf = date.getMinutes()
      let ss = date.getSeconds()

      month = month < 10 ? `0${month}` : month
      day = day < 10 ? `0${day}` : day
      hh = hh < 10 ? `0${hh}` : hh
      mf = mf < 10 ? `0${mf}` : mf
      ss = ss < 10 ? `0${ss}` : ss

      this.time = `${year}-${month}-${day} ${hh}:${mf}:${ss}`

      setTimeout(this.getTime, 1000)
    }
  }
}
</script>
