const router = require('koa-router')()
const { loginRedirect, loginCheck } = require('../middlewares/loginChecks')

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', loginCheck, async (ctx, next) => {
  let session = ctx.session
  let viewNum = session.viewNum
  if(session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++ 

  ctx.body = {
    title2: 'koa2 json',
    title: 'koa2 json',
    viewNum: session.viewNum
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: 'koa2 profile',
    userName
  }
})

module.exports = router
