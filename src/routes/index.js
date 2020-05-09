const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    list : [
      {name:'111'},
      {name:'222'},
      {name:'333'},
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  let session = ctx.session
  console.log('session',session)
  let viewNum = session.viewNum
  if(session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++ 

  ctx.body = {
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

// post 请求如何获取参数
router.post('/login', async ( ctx, next ) => {
  const { userName, password } = ctx.request.body

  let userInfo = null
  if(userName == 'dudaxia' && password == '123456') {
    userInfo = {
      userId: 1,
      userName: 'dudaxia',
      nickName: '杜大侠',
      gender: '男',
    }
  }

  // 加密userInfo
  // let token = null
  // if( userInfo ) {
  //   token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
  // }

  if(userInfo == null ) {
    ctx.body = {
      errorCode: -1,
      errorMessage: '登陆失败'
    }
    return
  }

  // 返回值
  // ctx.body = {
  //   userName,
  //   password
  // }
  ctx.body = {
    errorCode: 0,
    data: userInfo,
    errorMessage: '登陆成功'
  }
  console.log('login:',userName,password)
})

// router.get('/getUserInfo', async ( ctx, next ) => {
//   const token = ctx.header.Authorization
//   try {
//     const payload = await verify(token.split(' ')[1], SECRET)
//     ctx.body = {
//       errorCode: 0,
//       data: payload,
//       errorMessage: '成功'
//     }
//   } catch(e){

//   }
//   console.log('login:',userName,password)
// })

module.exports = router
