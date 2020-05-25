/**
 * @description 广场页 controller
 * @author dudaxia
 */

const { getBlogListByUser } = require('../services/blog')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCatchList } = require('../cache/blog')
/**
 * 按用户获取blog列表
 * @param {number} pageIndex 
 */
async function getSquareBlogList(pageIndex = 0, pageSize = 10) {
  // 尝试读取缓存
  let result = await getSquareCatchList(pageIndex, pageSize)
  
  let blogList = result.blogList
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
  getSquareBlogList
}







