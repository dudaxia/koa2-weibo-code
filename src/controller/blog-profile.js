/**
 * @description 个人主页 controller
 * @author dudaxia
 */

const { getBlogListByUser } = require('../services/blog')
const { SuccessModel } = require('../model/ResModel')
/**
 * 按用户获取blog列表
 * @param {string} userName 
 * @param {number} pageIndex 
 */
async function getProfileBlogList(userName, pageIndex = 0, pageSize = 10) {
  // 
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize
  })
  const blogList = result.blogList
  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getProfileBlogList
}







