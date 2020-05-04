/**
 * @description 实例化sequelize
 * @author dudaxia
 */
const { isProd, isTest } = require("../utils/env")

const { MYSQL_CONFIG } = require('../conf/db') 

const Sequelize = require('sequelize')

const { host, user, password, database } = MYSQL_CONFIG;

const conf = {
  host,
  dialect: 'mysql'
}

// test环境不需要打印sql语句
if( isTest ) {
  conf.logging = () => {}
}

// 线上环境，使用连接池
if( isProd ) {
  conf.pool = {
    max: 5, // 连接池中最大的连接数量
    min: 0,
    idle: 10000, // 如果一个连接池 10000ms 内没有被使用，则释放
  }
}

const seq = new Sequelize(database,user,password,conf);

// 测试连接
// seq.authenticate().then(()=>{
//   console.log("success")
// }).catch((e)=>{
//   console.log("error",e)
// })

module.exports = seq;





