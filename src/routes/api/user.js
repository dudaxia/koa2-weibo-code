/**
 * @description 用户 服务端 API 路由
 * @author dudaxia
 */

const router = require('koa-router')() 
const { isExist } = require('../../controller/user')

router.prefix('/api/user')

// 注册
router.post('/register', async (ctx, next) => {

})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // controller 逻辑层
  ctx.body = await isExist(userName)
})

module.exports = router


