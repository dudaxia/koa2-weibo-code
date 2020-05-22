/**
 * @description blog model test
 * @author dudaxia
 */

const { Blog } = require('../../src/db/model/index')

test('Blog 模型各个属性，符合预期', () => {
  // build 会构建一个内存 Blog 实例，但不会提交到数据库
  const blog = Blog.build({
    userId: 1,
    content: 'contentcontent',
    image: 'test.png',
  })
  // 验证各个属性
  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('contentcontent')
  expect(blog.image).toBe('test.png')
 
}) 












