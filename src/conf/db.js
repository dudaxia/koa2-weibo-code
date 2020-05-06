
const { isProd } = require('../utils/env')

// 本地redis配置
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

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
  
  // 生产环境redis配置
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}



module.exports = {
  MYSQL_CONFIG,
  REDIS_CONF
}

