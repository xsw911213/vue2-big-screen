
export default {
  key: 'text',
  cateName: '文字组件',
  cateList: [
    {
      label: '文字',
      name: 'text-text',
      config: {
        // 基础配置
        width: 150,
        height: 50,
        top: 0,
        left: 0,
        // 私有配置
        text: '这是一段文字'
      }
    },
    {
      label: '跑马灯',
      name: 'text-marquee',
      config: {
        // 基础配置
        width: 250,
        height: 50,
        top: 0,
        left: 0,
        // 私有配置
        text: '这是一段跑马灯文字'
      }
    },
    {
      label: '超链接',
      name: 'text-href',
      config: {
        // 基础配置
        width: 150,
        height: 50,
        top: 0,
        left: 0,
        // 私有配置
        text: '百度',
        href: 'https://www.baidu.com/'
      }
    },
    {
      label: '当前时间',
      name: 'text-time',
      config: {
        // 基础配置
        width: 250,
        height: 50,
        top: 0,
        left: 0
        // 私有配置
      }
    }
  ]
}
