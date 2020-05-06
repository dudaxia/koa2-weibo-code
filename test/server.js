/**
 * @description jest server
 * @author dudaxia
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
