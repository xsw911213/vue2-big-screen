// cdn预加载使用
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'axios': 'axios'
}

const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: [
      // '//cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
      // '//cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
      // '//cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
      // '//api.map.baidu.com/api?ak=F2i6AaneF9MV6YKd6TQK2a9wk43Euay6&v=2.0'
    ]
  },
  // 生产环境
  build: {
    css: [],
    js: [
      '//cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
      '//cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
      '//cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js'
      // '//api.map.baidu.com/api?ak=F2i6AaneF9MV6YKd6TQK2a9wk43Euay6&v=3.0'
    ]
  }
}

module.exports = {
  publicPath: '/',
  // configureWebpack: config => {
  //   vuxLoader.merge(config, {
  //     plugins: ['vux-ui', 'duplicate-style']
  //   })
  // },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      // 包含开发和测试环境
      if (process.env.NODE_ENV !== 'development') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })
  },
  configureWebpack: config => {
    const myConfig = {}
    // myConfig.externals = externals
    if (process.env.NODE_ENV !== 'development') {
      // 非开发环境环境npm包转CDN
      myConfig.externals = externals
    }
    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true
      }
    }

    return myConfig
  },
  productionSourceMap: false
}
