/**
 * @description 加密
 * @author dudaxia
 */

const crypto = require('crypto')
const { CRYPTO_KEY } = require('../conf/secretKeys')

/**
 * md5 加密
 * @param {string} content 加密明文
 */
function _md5 (content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 加密明文
 */
function doCrpyto(content) {
  const str = `password=${content}&key=${CRYPTO_KEY}`
  return _md5(str)
}

module.exports = {
  doCrpyto
}




