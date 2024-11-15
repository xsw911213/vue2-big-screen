// dynamicCapability 是否具备动态获取数据的能力
// useApi 是否使用Api

export default {
  key: 'table',
  cateName: '表格组件',
  cateList: [
    {
      label: '轮播表格',
      name: 'table-scroll-board',
      config: {
        // 基础配置
        width: 500,
        height: 220,
        top: 0,
        left: 0,
        // 私有配置
        dynamicCapability: true,
        useApi: true,
        api: '',
        demoJson: {
          status: 1,
          msg: 'success',
          data: {
            data: [
              ['行1列1', '行1列2', '行1列3'],
              ['行2列1', '行2列2', '行2列3'],
              ['行3列1', '行3列2', '行3列3'],
              ['行4列1', '行4列2', '行4列3'],
              ['行5列1', '行5列2', '行5列3'],
              ['行6列1', '行6列2', '行6列3'],
              ['行7列1', '行7列2', '行7列3'],
              ['行8列1', '行8列2', '行8列3'],
              ['行9列1', '行9列2', '行9列3'],
              ['行10列1', '行10列2', '行10列3']
            ]
          }
        }
      }
    }
  ]
}
