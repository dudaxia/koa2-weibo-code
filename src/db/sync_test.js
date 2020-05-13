/**
 * @description 测试连接数据库
 * @author dudaxia
 */

const seq = require('./seq')

// 测试连接
seq.authenticate().then(()=>{
  console.log('atuh success')
}).catch((e)=>{
  console.log('auth error',e)
})


