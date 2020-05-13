/**
 * @description user controller层
 * @author dudaxia
 */

const { 
  getUserInfo, 
  createUser 
} = require('../services/user')

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { doCrpyto } = require('../utils/crpy')

const { 
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo
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


module.exports = {
  isExist,
  register
}







