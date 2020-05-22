/**
 * @description blog service 层
 * @author dudaxia
 */

const { Blog, User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 
 * @param {text} content 内容
 * @param {string} image 图片
 * @param {int} userId 用户ID
 */
async function createBlog(content, image, userId) {
  const result = Blog.create({
    content, 
    image,
    userId
  })
  return result.dataValues
}

/**
 * 根据用户获取blog列表
 * @param {*} param0 查询参数：{userName, pageIndex = 0, pageSize = 10}
 */
async function getBlogListByUser({userName, pageIndex = 0, pageSize = 10}) {
  // 拼接查询条件
  const userWhereOpts = {}
  if(userName) {
    userWhereOpts.userName = userName
  }
  // 连表查询
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })

  // result.count 总数 与分页无关
  // result.rows []
  let blogList = result.rows.map(val => val.dataValues)

  // 格式化
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    let user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }

}

module.exports = {
  createBlog,
  getBlogListByUser
}