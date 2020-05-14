/**
 * @description user model test
 * @author dudaxia
 */

const { User } = require('../../src/db/model/index')

test('User 模型各个属性，符合预期', () => {
  // build 会构建一个内存 User 实例，但不会提交到数据库
  const user = User.build({
    userName: 'dudaxia',
    password: '123123',
    nickName: '张三',
    gender: 1,
    picture: 'xxx.png',
    city: 'shanghai'
  })
  // 验证各个属性
  expect(user.userName).toBe('dudaxia')
  expect(user.password).toBe('123123')
  expect(user.nickName).toBe('张三')
  expect(user.gender).toBe(1)
  expect(user.picture).toBe('xxx.png')
  expect(user.city).toBe('shanghai')
}) 












