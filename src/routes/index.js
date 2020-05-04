const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    list : [
      {name:"111"},
      {name:"222"},
      {name:"333"},
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: 'koa2 profile',
    userName
  }
})

// post 请求如何获取参数
router.post('/login', async ( ctx, next ) => {
  const { userName, password } = ctx.request.body

  // 返回值
  // ctx.body = {
  //   userName,
  //   password
  // }
  ctx.body = {
    errorCode: 0,
    errorMessage: "登陆成功"
  }
  console.log("login:",userName,password)
})

module.exports = router
