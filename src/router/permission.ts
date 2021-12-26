/** @format */

const routerEach = (router, website) => {
  router.beforeEach(async (to, from, next) => {
    next()
  })
  router.afterEach(to => {
    document.title = to.meta.title || website.title // 动态设置浏览器标题
  })
  router.onError(error => {
    console.log(error)
  })
}
export default routerEach
