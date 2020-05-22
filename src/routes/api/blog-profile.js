/**
 * weibo 个人主页 api
 * @description blog API 路由
 * @author dudaxia
 */

const router = require('koa-router')() 
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/blog')

// blog列表加载更多
router.post('/loadMore', loginCheck, async (ctx, next) => {
  const { userName, pageIndex, pageSize } = ctx.request.body
  let result = await getProfileBlogList(userName, pageIndex, pageSize)

  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router


