/**
 * @description 用户 服务端 API 路由
 * @author dudaxia
 */

const router = require('koa-router')() 
const { isExist, register, login, logout, del } = require('../../controller/user')
const { userValidate } = require('../../validate/user')
const { genValidator } = require('../../middlewares/validator')

router.prefix('/api/user')

// 注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register(userName, password, gender)
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // controller 逻辑层
  ctx.body = await isExist(userName)
})

// 登录
router.post('/login', genValidator(userValidate), async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 退出登录
router.post('/logout', async (ctx, next) => {
  ctx.body = await logout(ctx)
})

// 删除
router.post('/delete', async (ctx, next) => {
  const { isAdmin = false, userName } = ctx.request.body
  ctx.body = await del(isAdmin, userName)
})

module.exports = router


