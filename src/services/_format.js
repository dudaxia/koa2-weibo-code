/**
 * @description 格式化处理返回数据
 * @author dudaxia
 */

const { DEFAULT_PICTURE } = require('../conf/constant')

/**
 * 用户默认头像
 * @param {Object} obj 
 */
function _formatUserPicture(obj) {
  if(obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list) {
  if(list == null) {
    return list
  }
  // 数组形式
  if(list instanceof Array) {
    return list.map(_formatUserPicture)
  }
  // 单个对象
  return _formatUserPicture(list)
}

module.exports = {
  formatUser
}






