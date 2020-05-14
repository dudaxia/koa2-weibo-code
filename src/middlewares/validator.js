/**
 * @description json schema 验证中间件
 * @author dudaxia
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 生成 json schema 验证函数
 * @param {function} validatorFn 验证函数
 */
function genValidator(validatorFn) {
  // 定义中间件函数
  async function validator(ctx, next) {
    // 校验
    const data = ctx.request.body
    const error = validatorFn(data)
    if(error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    // 验证成功，走下一个流程
    await next()
  }
  // 返回中间件
  return validator
}

module.exports = {
  genValidator
}





