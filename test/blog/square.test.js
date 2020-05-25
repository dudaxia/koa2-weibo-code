/**
 * @description 广场页测试
 * @author dudaxia
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')

// 加载第一页数据
test('广场，加载第一页数据', async () => {
  const res = await server
    .get(`/api/square/loadMore/0`)
    .set('cookie', COOKIE)

  expect(res.body.errno).toBe(0)
  const data = res.body.data
  expect(data).toHavePerporty('isEmpty')
  expect(data).toHavePerporty('blogList')
  expect(data).toHavePerporty('pageSize')
  expect(data).toHavePerporty('pageIndex')
  expect(data).toHavePerporty('count')
})






