import Vue from 'vue'
import Router from 'vue-router'
import constantRouterMap from './constantRouterMap'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'


Vue.use(Router)

const router = new Router({
  routes: constantRouterMap
})


router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const token = store.getters.token
  const roles = store.getters.roles
  if (token) {
    if (to.name === 'login') {
      // router在hash模式下 手动改变hash 重定向回来不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
      NProgress.done()

      return next('/')
    }
    if (roles.length) {
      console.log('有')
      next();
    } else {
      console.log('没有');
      // 根据用户信息获取用户权限
      try {
        // 生成可访问的路由
        let roles = await store.dispatch('user/getUserInfoAct', token);
        let newRouter = await store.dispatch('permission/generateRouter', roles);
        // 把可访问的路由添加进路由表
        router.addRoutes(newRouter);
        next({ ...to, replace: true });
      } catch (error) {
        Message.error('路由请求失败')
        next('/login')
      }
    }
  } else {
    if (to.name === 'login') {
      next()
    } else {
      NProgress.done()
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
export default router;