/**
 * @description utils api 路由
 * @author dudaxia
 */

const router = require('koa-router')() 
const { loginCheck } = require('../../middlewares/loginChecks')
const koaForm = require('formidable-upload-koa')
const { saveFile, qiniuaToken } = require('../../controller/utils')

router.prefix('/api/utils')

// 上传图片
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file'] // ['file'] 与 ajax中 new FormData().append('file',file) 相对应
  const { size, path, name, type } = file
  // controllers
  ctx.body = await saveFile({
    name,
    type,
    size,
    filePath: path
  })
})

// 获取7牛token
router.post('/qiniutoken', loginCheck, async (ctx, next) => {
  ctx.body = qiniuaToken()
})


module.exports = router