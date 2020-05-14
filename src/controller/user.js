/**
 * @description user controller层
 * @author dudaxia
 */

const { 
  getUserInfo, 
  createUser,
  deleteUser
} = require('../services/user')

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { doCrpyto } = require('../utils/crpy')
const { isDev, isTest } = require('../utils/env')

const { 
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo
} = require('../model/ErrorInfo')

/**
 * 用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
  // 业务逻辑处理
  // 调用 services 获取数据
  const userInfo = await getUserInfo(userName)
  if(userInfo) {
    // 已存在
    return new SuccessModel(userInfo)
  }else {
    // 不存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }
  // 统一返回格式
}

/**
 * 用户注册
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender (1 男， 2 女， 3 保密)
 */
async function register (userName, password, gender) {
  // 调用 services 获取数据
  const userInfo = await getUserInfo(userName)
  if(userInfo) {
    // 用户已存在
    return new ErrorModel(registerUserNameExistInfo)
  }
  // services 注册
  try {
    password = doCrpyto(password)
    await createUser(userName, password, gender)
    return new SuccessModel()
  } catch(e) {
    console.error('注册失败-->',e)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 用户登录
 * @param {string} ctx koa2 ctx
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx, userName, password) {
  // 登陆成功后 ctx.session.userInfo = xxx

  // 获取用户信息
  password = doCrpyto(password)
  const userInfo = await getUserInfo(userName, password)
  if(!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }
  // 登录成功
  if(ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 退出登录
 * @param {object} ctx 
 */
async function logout(ctx) {
  ctx.session.userInfo = null
  return new SuccessModel()
}

/**
 * 删除用户
 * @param {boolean} isAdmin 是否为炒鸡管理员
 * @param {string} username 删除用户名
 */
async function del(isAdmin, userName) {
  const userInfo = await getUserInfo(userName)
  if(!userInfo) {
    // 用户不存在，删除失败
    return new ErrorModel(deleteUserFailInfo)
  }

  try {
    // 测试环境下，测试账号登录之后，删除自己
    if(isTest || isAdmin) {
      await deleteUser(userName)
      return new SuccessModel()
    } else {
      return new ErrorModel(deleteUserFailInfo)
    }
  }catch(e) {
    console.error('user del failed -->',e)
    return new ErrorModel(deleteUserFailInfo)
  }
}

module.exports = {
  isExist,
  register,
  login,
  logout,
  del
}







