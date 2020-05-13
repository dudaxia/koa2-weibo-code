/**
 * @description 用户数据模型
 * @author dudaxia
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

// users
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '用户密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '用户昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultVaule: 3,
    comment: '用户性别（1 男，2 女，3 保密）'
  },
  picture: {
    type: STRING,
    comment: '用户头像'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
})

module.exports = {
  User
}
