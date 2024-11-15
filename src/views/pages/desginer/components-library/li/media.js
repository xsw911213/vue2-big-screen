
export default {
  key: 'media',
  cateName: '媒体组件',
  cateList: [
    {
      label: '图片',
      name: 'media-image',
      config: {
        // 基础配置
        width: 150,
        height: 150,
        top: 0,
        left: 0,
        // 私有配置
        src: 'http://223.223.176.36:9080/a2021/knows/common/download/3cf232490b2e2bb0a36d3afb5b44243d'
      }
    },
    {
      label: '轮播图',
      name: 'media-swiper',
      config: {
        // 基础配置
        width: 150,
        height: 150,
        top: 0,
        left: 0,
        // 私有配置
        imgList: [
          { url: 'https://img2.baidu.com/it/u=3242327551,3759040397&fm=26&fmt=auto&gp=0.jpg' },
          { url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fd%2F58783881a0556.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624171196&t=b8e1d5e3f9a61634f1af5c5a69eaa4ad' },
          { url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.mumayi.com%2Fforum%2F201401%2F16%2F175225yuunguqo25cgulfu.jpg&refer=http%3A%2F%2Ffile.mumayi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624171196&t=d3688edf7044961ff5744de65ae6120e' }
        ]
      }
    },
    {
      label: 'iframe',
      name: 'media-iframe',
      config: {
        // 基础配置
        width: 150,
        height: 150,
        top: 0,
        left: 0,
        // 私有配置
        src: 'https://www.baidu.com/'
      }
    },
    {
      label: '视频',
      name: 'media-video',
      config: {
        // 基础配置
        width: 150,
        height: 150,
        top: 0,
        left: 0,
        // 私有配置
        src: 'http://223.223.176.36:9080/a2021/knows/common/download/3cf232490b2e2bb0a36d3afb5b44243d'
      }
    }
  ]
}
