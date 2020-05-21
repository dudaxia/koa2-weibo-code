/**
 * @description utils controller
 * @author dudaxia
 */

const path = require('path')
const fs = require('fs')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')
const { uploadFileQiniu } = require('../utils/qiniu')

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if(!exist) {
    // 不存在，则新建目录
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保存文件
 * @param {string} name 文件名 
 * @param {string} type 文件类型 
 * @param {number} size 文件体积大小 
 * @param {string} filePath 文件路径 
 */
async function saveFile({name, type, size, filePath}) {
  if(size > MAX_SIZE) {
    // 超过文件最大尺寸
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  // 移动文件
  const fileName = Date.now() + '.' + name // 防止重名
  const disFilePath = path.join(DIST_FOLDER_PATH, fileName) // 上传文件夹 + fileName
  
  // 存储到本地文件夹
  await fse.move(filePath, disFilePath)

  // 将本地文件上传到7牛云
  let fileInfo = await uploadFileQiniu(disFilePath, name)

  // 将本地文件删除
  fs.unlink(disFilePath, res => {
    console.log('本地文件删除成功')
  })
  
  // 返回信息
  return new SuccessModel({
    url: fileInfo.url
  })
}

module.exports = {
  saveFile
}