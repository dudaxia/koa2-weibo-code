/**
 * @description blog首页 api test
 * @author dudaxia
 */

const server = require('../server')

// 直接取已登录用户cookie
const { COOKIE } = require('../testUserInfo')

// 登录
test('创建一条blog，应该成功', async () => {
  const content = '单元测试自动创建的blog' + Date.now()
  const image = 'test.png'

  const res = await server
    .post('/api/blog/create')
    .set('cookie', COOKIE) 
    .send({
      content, 
      image,
    })
  expect(res.body.errno).toBe(0)
})




