import Layout from '_views/Layout/Layout.vue'
// hideInMenu: true,        // 不显示在左侧菜单栏
// alwaysShow: true,        // 只有一个子组件时是否显示根组件
// noCache: true,           // 表示不会被缓存,需要写在 meta 里面
export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('_views/Login/Login.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        alwaysShow: true,

        meta: {
          homePage: true,   // 表示这是首页，必须有
          title: '首页面板',
          icon: 'printer',
        },
        component: () => import('_views/Dashboard/Dashboard.vue')
      }
    ]
  }, {
    path: '/form',
    name: 'form',
    redirect: '/form/form1',
    component: Layout,
    // alwaysShow: true,   // 只有一个子元素时是否需要展开，需要展开的话必须要加 meta 信息
    meta: {
      title: '表单',
      icon: 'printer',
    },
    children: [
      {
        path: 'form1',
        name: 'form1',
        meta: {
          title: '表单一',
          icon: 'printer',
          noCache: true,
        },
        component: () => import('_views/Form/Form1.vue')
      }
      , {
        path: 'form2',
        name: 'form2',
        meta: {
          title: '表单二',
          icon: 'printer',
        },
        component: () => import('_views/Form/Form2.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    component: () => import('_views/ErrorPage/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    component: () => import('_views/ErrorPage/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import('_views/ErrorPage/404.vue')
  }
]