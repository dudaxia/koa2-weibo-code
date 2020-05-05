
const { isProd } = require('../utils/env')

// 本地环境mysql配置
let MYSQL_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'ZBR5886771dzf!',
  port: '3306',
  database: 'mysql',
}

if( isProd ) {
  // 生产环境mysql配置
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'ZBR5886771dzf!',
    port: '3306',
    database: 'mysql',
  }
}



module.exports = {
  MYSQL_CONFIG
}

