'use strict'

exports.__esModule = true
exports.isExtractableFile = void 0

var _ReactNativeFile = require('./ReactNativeFile.js')

var isExtractableFile = function isExtractableFile(value) {
  return (
    (typeof File !== 'undefined' && value instanceof File) ||
    value instanceof _ReactNativeFile.ReactNativeFile
  )
}

exports.isExtractableFile = isExtractableFile
