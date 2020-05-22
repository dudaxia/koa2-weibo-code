/**
 * @description 数据模型入口文件
 * @author dudaxia
 */

const User = require('./User')
const Blog = require('./Blog')

// 外键
Blog.belongsTo(User, {
  foreignKey: 'userId'
})
// User.hasMany(Blog)

module.exports = {
  User,
  Blog
}