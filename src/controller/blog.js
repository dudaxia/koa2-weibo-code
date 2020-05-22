/**
 * @description blog 首页 controller层
 * @author dudaxia
 */


const { 
  createBlog
} = require('../services/blog')
const xss = require('xss')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')

/**
 * 创建微博
 * @param {text} content 内容
 * @param {string} image 图片
 * @param {int} userId 用户ID
 */
async function create(content, image, userId) {
  if(!content) {
    return new ErrorModel(createBlogFailInfo)
  }
  
  try {
    content = xss(content)
    // 创建
    const blog = await createBlog(content, image, userId)
    return new SuccessModel(blog)
  } catch(e) {
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}