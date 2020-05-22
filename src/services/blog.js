/**
 * @description blog service 层
 * @author dudaxia
 */

const Blog = require('../db/model/Blog')

/**
 * 
 * @param {text} content 内容
 * @param {string} image 图片
 * @param {int} userId 用户ID
 */
async function createBlog(content, image, userId) {
  const result = Blog.create({
    content, 
    image,
    userId
  })
  return result.dataValues
}

module.exports = {
  createBlog
}