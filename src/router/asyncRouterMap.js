import Layout from '_views/Layout/Layout.vue'
export default [
  {
    path: '/table',
    name: 'table',
    redirect: '/table/table1',
    component: Layout,
    meta: {
      title: '表格',
      icon: 'printer',
    },
    children: [
      {
        path: 'table1',
        name: 'table1',
        meta: {
          title: '表格一',
          icon: 'printer',
          noCache: true,
        },
        component: () => import('_views/Table/Table1.vue')
      }, {
        path: 'table2',
        name: 'table2',
        meta: {
          title: '表格二',
          icon: 'printer',
        },
        component: () => import('_views/Table/Table2.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    redirect: '/multilevel/level1',
    component: Layout,
    meta: {
      title: '多级',
      icon: 'printer',
    },
    children: [
      {
        path: 'level1',
        name: 'level1',
        meta: {
          title: 'level1',
          icon: 'printer',
        },
        component: () => import('_views/Multilevel/Level1.vue')
      }, {
        path: 'level2',
        name: 'level2',
        meta: {
          title: 'level2',
          icon: 'printer',
        },
        component: () => import('_views/Multilevel/Level2/Level2.vue'),
        children: [
          {
            path: 'level2-1',
            name: 'level2-1',
            meta: {
              title: 'level2-1',
              icon: 'printer',
            },
            component: () => import('_views/Multilevel/Level2/Level2-1.vue')
          }, {
            path: 'level2-2',
            name: 'level2-2',
            meta: {
              title: 'level2-2',
              icon: 'printer',
            },
            component: () => import('_views/Multilevel/Level2/Level2-2.vue')
          }
        ]
      }
    ]
  },
]