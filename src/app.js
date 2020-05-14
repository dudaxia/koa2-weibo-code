const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')
 
const { isProd } = require('./utils/env')
const { SESSION_KEY } = require('./conf/secretKeys')

// 路由
const index = require('./routes/index')
const users = require('./routes/view/users')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
if( isProd ) {
  onerrorConf = {
    redirect: '/error'
  }
} 
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 `koa.sid`
  prefix: 'weibo:sess', // redis key 的前缀，默认是 `koa:sess`
  cookie: {
    path: '/', // 路径
    httpOnly: true, // 只允许服务端修改
    maxAge: 24 * 60 * 60 * 1000, // 过期时间 单位:ms
  },
  // ttl: 24 * 60 * 60 * 1000, // redis过期 不配则和maxAge相同
  store: redisStore({ // 存储在redis
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes 路由注册
app.use(index.routes(), index.allowedMethods())

app.use(users.routes(), users.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())

app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
