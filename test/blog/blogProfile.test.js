/**
 * @description blog个人主页 api test
 * @author dudaxia
 */

const server = require('../server')

// 直接取已登录用户cookie
const { COOKIE } = require('../testUserInfo')

// 登录
test('根据用户查询列表，应该成功', async () => {
  const userName = 'dudaxia123'
  const pageSize = 5
  const pageIndex = 1

  const res = await server
    .post('/api/blog/loadMore')
    .set('cookie', COOKIE) 
    .send({
      userName, 
      pageSize,
      pageIndex,
    })
  expect(res.body.errno).toBe(0)
})




