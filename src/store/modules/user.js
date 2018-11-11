import { getUserInfo_api } from '_api/login'
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token'),      // token
    roles: [],              // 权限
    userInput: {},          // 登录表单
  },
  mutations: {
    // 设置token
    SET_TOKEN(state, dataStr) {
      state.token = dataStr
    },
    // 设置路由
    SET_ROLES(state, dataArr) {
      state.roles = dataArr
    },
    // 登录表单
    SET_USER_INPUT(state, dataObj) {
      state.userInput = dataObj
    }
  },
  actions: {
    // 登录保存touken
    loginAct({ commit }, token) {
      return new Promise(async resolve => {
        localStorage.setItem('token', token);
        commit('SET_TOKEN', token);
        resolve();
      })
    },
    // 获取用户信息
    getUserInfoAct({ commit }, token) {
      return new Promise(async resolve => {
        let { roles } = await getUserInfo_api(token)
        commit('SET_ROLES', roles);
        resolve(roles);
      })
    },
    // 退出登录
    logoutAct({ commit }) {
      return new Promise(resolve => {
        localStorage.removeItem('token');
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        // 调用其他的模块
        commit('permission/SET_ROUTER', [], { root: true });
        resolve()
      })
    }
  }

}