/**
 * @description 检查登录状态中间件
 * @author dudaxia
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * api 登录校验
 * @param {object} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx, next) {
  if(ctx.session.userInfo) {
    // 一登录
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录校验
 * @param {object} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx, next) {
  if(ctx.session.userInfo) {
    // 一登录
    await next()
    return
  }
  // 未登录
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect
}

