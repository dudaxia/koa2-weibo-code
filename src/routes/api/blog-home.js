/**
 * weibo 首页 api
 * @description blog API 路由
 * @author dudaxia
 */

const router = require('koa-router')() 
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog')
const { genValidator } = require('../../middlewares/validator')
const { blogValidate } = require('../../validate/blog-create')

router.prefix('/api/blog')

// 新增博客
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create(content, image, userId)
})

module.exports = router


