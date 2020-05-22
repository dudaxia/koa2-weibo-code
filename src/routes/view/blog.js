/**
 * @description 首页博客路由
 * @author dudaxia
 */
const router = require('koa-router')()
const { loginRedirect, loginCheck } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next) => {

  await ctx.render('index', {
    
  })
})

module.exports = router