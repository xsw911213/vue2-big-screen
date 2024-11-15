// http://boot.jeecg.com/
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import * as echarts from 'echarts'
import dataV from '@jiaminghi/data-view'
import config from './config'

import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
Vue.prototype.$config = config

Vue.use(Antd)
// http://datav.jiaminghi.com/guide/
Vue.use(dataV)

let changeTitle = (title) => {
  document.querySelector('title').innerText = title
}

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(to => {
  changeTitle(to.meta.title)
  window.scrollTo(0, 0)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
