import asyncRouterMap from '@/router/asyncRouterMap'
import constantRouterMap from '@/router/constantRouterMap'



/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles 	当前用户的权限 ['admin', 'editor']
 * @param route		一条路由对象
 */
function hasPermission(roles, route) {
  // 判断 meta 里面有没有配置 roles 这个数组
  if (route.meta && route.meta.roles) {
    // 路由有配置权限
    // 只返回满足条件的路由
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 没有配置说明谁都可以访问
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap	需要异步挂载的路由
 * @param roles	当前用户的权限 ['admin', 'editor']
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      // 如果当前路由的权限满足条件则继续判断子组件
      // 如果有子组件则递归调用
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  // 返回筛选之后的路由
  // console.log(res);
  return res
}

const permission = {
  namespaced: true,
  state: {
    // 全部的路由
    permissionRouter: constantRouterMap,
    // 筛选出来的路由
    addRouter: []
  },
  mutations: {
    SET_ROUTER: (state, router) => {
      state.permissionRouter = constantRouterMap.concat(router)
      state.addRouter = router
    }
  },
  actions: {
		/*
		一、三种路由
			1. 无配置路由，
			2. admin 路由
			3. editor 路由
	
		二、两种情况
			1. 权限是admin则全部挂载路由

			2. 权限不是admin则有三种情况
				如果当前路由没有配置则挂载
				如果当前路由的配置包含用户的身份则挂载
				如果当前路由的配置不包含用户身份则不挂载
		*/
    generateRouter({ commit }, roles) {
      return new Promise(resolve => {
        let filterRouter
        if (roles.includes('admin')) {
          // 权限是admin直接全部挂载
          filterRouter = asyncRouterMap
        } else {
          // 不是admin则筛选把合适的路由筛选出来
          filterRouter = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTER', filterRouter)
        resolve(filterRouter)
      })
    }
  }
}

export default permission
