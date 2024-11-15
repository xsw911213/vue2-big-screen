// import mainView from '@/views/main-view.vue'
// import mainChildren from './main-children'

/**
 *  meta 中参数的含义
 *  @title 程序会根据这个字段会自动改变页面的 title 标签的内容
*/

export default [
  {
    alias: '/',
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: resolve => require(['@/views/pages/login/login.vue'], resolve)
  },
  {
    path: '/list',
    name: 'list',
    meta: {
      title: '大屏列表'
    },
    component: resolve => require(['@/views/pages/list/list.vue'], resolve)
  },
  {
    path: '/desginer/:id',
    name: 'desginer',
    meta: {
      title: '大屏设计器'
    },
    component: resolve => require(['@/views/pages/desginer/desginer.vue'], resolve)
  },
  {
    path: '/viewResult/:id',
    name: 'viewResult',
    meta: {
      title: ''
    },
    component: resolve => require(['@/views/pages/desginer/view-result.vue'], resolve)
  }
]
