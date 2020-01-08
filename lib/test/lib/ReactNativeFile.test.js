'use strict'

exports.__esModule = true
exports.default = void 0

var _assert = require('assert')

var _ReactNativeFile = require('../../ReactNativeFile.js')

var _default = function _default(tests) {
  tests.add('`ReactNativeFile`.', function() {
    var uri = '<uri>'
    var name = 'a.jpg'
    var type = 'image/jpeg'
    var file = new _ReactNativeFile.ReactNativeFile({
      uri: uri,
      name: name,
      type: type
    })
    ;(0, _assert.strictEqual)(file.uri, uri)
    ;(0, _assert.strictEqual)(file.name, name)
    ;(0, _assert.strictEqual)(file.type, type)
  })
}

exports.default = _default
