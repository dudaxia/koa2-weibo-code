/**
 * @description 微博缓存层
 * @author dudaxia
 */


const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表的缓存
 * @param {number} pageIndex 
 * @param {number} pageSize 
 */
async function getSquareCatchList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
  // 尝试获取缓存
  const catchResult = await get(key)
  if(catchResult != null) {
    // 获取缓存成功
    return catchResult
  }

  // 没有缓存，读取数据库
  const result = await getBlogListByUser({pageIndex, pageSize})

  // 设置缓存，过期时间 1min
  set(key, result, 60)

  return result
}

module.exports = {
  getSquareCatchList
}

