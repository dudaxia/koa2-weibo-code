/**
 * @description sequelize 同步数据库
 * @author dudaxia
 */

const seq = require('./seq')

// require('./module')

// 测试连接
seq.authenticate().then(()=>{
  console.log('atuh success')
}).catch((e)=>{
  console.log('auth error',e)
})

// 执行同步
seq.sync({
  // force: true  // 如果数据库中已存在，则强制删除重新创建
}).then(()=>{
  console.log('sync ok')
  process.exit(1)
})

