/**
 * @description 创建blog 数据格式验证
 * @author dudaxia
 */

const { validate } = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    image: {
      type: 'string',
      maxLength: 255
    },
  }
}

/**
 * 执行校验创建微博数据
 * @param {*} data 创建微博数据
 */
function blogValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = {
  blogValidate
}




