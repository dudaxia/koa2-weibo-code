/**
 * @description json test
 * @author dudaxia
 */

const server = require('./server')

// get 类型
test('json 接口返回格式正确', async () => {
  const res = await server.get('/json')
  // 断言：判断对象是否一致
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
  expect(res.body.title).toBe('koa2 json')
})

// post 类型
// test('login 接口返回格式正确', async () => {
//   const res = await server.post('/login').send({
//     userName: 'dudaxia123',
//     password: '123456'
//   })
//   // 断言：判断对象是否一致
//   expect(res.body).toEqual({
//     errorCode: 0,
//     data: {
//       userId: 1,
//       userName: 'dudaxia',
//       nickName: '杜大侠',
//       gender: '男',
//     },
//     errorMessage: '登陆成功'
//   })
// })
