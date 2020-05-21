/**
 * @description 7牛使用
 * @author dudaxia
 * 七牛SDK: https://developer.qiniu.com/kodo/sdk/3828/node-js-v6
 */

const qiniu = require('qiniu')
const { ACCESS_KEY, SECRET_KEY, BUCKET, EXPIRES, BUCKET_DOMAIN, IS_PRIVATE } = require('../conf/qiniu')

/**
 * 生成上传凭证token
 * @param {string} fileName 
 */
function generationToken(fileName) {
  let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
  let options = {
    scope: `${BUCKET}:${fileName}`,
    expires: EXPIRES,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
  }
  let putPolicy = new qiniu.rs.PutPolicy(options)
  let uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}

/**
 * 上传文件到7牛云（文件上传方式有多种，详见api：https://developer.qiniu.com/kodo/sdk/1289/nodejs）
 * @param {string} token 上传凭证
 * @param {string} localFile 本地文件路径
 * @param {string} fileName 保存文件文件名
 */
function uploadFile(token, localFile, fileName) {
  var config = new qiniu.conf.Config()
  // 空间对应的机房
  config.zone = qiniu.zone.Zone_z0
  // 是否使用https域名
  //config.useHttpsDomain = true
  // 上传是否使用cdn加速
  config.useCdnDomain = true

  let formUploader = new qiniu.form_up.FormUploader(config)
  let putExtra = new qiniu.form_up.PutExtra()
  let fileUrl
  return new Promise((resolve, reject) => {
    formUploader.putFile(token, fileName, localFile, putExtra, function(respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode == 200) {
        let { key } = respBody
        fileUrl = getQiniuDownloadUrl(key)
        resolve({
          url: fileUrl,
          ...respBody
        })
      } else {
        reject({
          errCode: respInfo.statusCode,
          data: respBody
        })
      }
    })
  })
}

/**
 * 获取七牛云存储文件url
 * @param {string} key 文件名
 */
function getQiniuDownloadUrl(key) {
  var mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
  var config = new qiniu.conf.Config()
  var bucketManager = new qiniu.rs.BucketManager(mac, config)
  var downloadUrl

  if( IS_PRIVATE ) { 
    // 私有空间
    var deadline = parseInt(Date.now() / 1000) + 3600 // 1小时过期
    downloadUrl = bucketManager.privateDownloadUrl(BUCKET_DOMAIN, key, deadline)
  } else {
    // 公开
    downloadUrl = bucketManager.publicDownloadUrl(BUCKET_DOMAIN, key)
  }

  return downloadUrl
}

/**
 * 输出文件上传
 * @param {*} filePath 上传文件的本地路径
 * @param {*} fileName 上传文件的文件名
 */
async function uploadFileQiniu(localFile, fileName) {
  const token = generationToken(fileName)
  let fileInfo = await uploadFile(token, localFile, fileName)
  return fileInfo
}

module.exports = {
  generationToken,
  uploadFileQiniu,
}





