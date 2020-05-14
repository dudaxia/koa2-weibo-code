/**
 * @description json schema 校验
 * @author dudaxia
 */

const Ajv = require('ajv')
const ajv = new Ajv({
  // allErrors: true // 输出所有的错误（比较慢）
})

/**
 * json schema 校验
 * @param {json} schema json schema 校验规则
 * @param {json} data 待校验数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if(!valid) {
    return ajv.errors[0]
  }
}

module.exports = {
  validate
}



