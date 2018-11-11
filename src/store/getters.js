export default {
  globalLoading: state => state.app.globalLoading,
  loadingMessage: state => state.app.loadingMessage,
  sideStatus: state => state.app.sideStatus,

  token: state => state.user.token,
  roles: state => state.user.roles,

  permissionRouter: state => state.permission.permissionRouter,

  tagsList: state => state.tagsNav.tagsList,
  cachedRoutes: state => state.tagsNav.cachedRoutes,
}