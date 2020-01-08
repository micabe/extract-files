'use strict'

exports.__esModule = true
exports.default = void 0

var _assert = require('assert')

var _ReactNativeFile = require('../../ReactNativeFile.js')

var _isExtractableFile = require('../../isExtractableFile.js')

var _default = function _default(tests) {
  tests.add('`isExtractableFile` with a `File` instance.', function() {
    var original = global.File

    global.File = function File() {}

    ;(0,
    _assert.strictEqual)((0, _isExtractableFile.isExtractableFile)(new File()), true)
    global.File = original
  })
  tests.add('`isExtractableFile` with a `Blob` instance.', function() {
    var original = global.Blob

    global.Blob = function Blob() {}

    ;(0,
    _assert.strictEqual)((0, _isExtractableFile.isExtractableFile)(new Blob()), true)
    global.Blob = original
  })
  tests.add(
    '`isExtractableFile` with a `ReactNativeFile` instance.',
    function() {
      ;(0, _assert.strictEqual)(
        (0, _isExtractableFile.isExtractableFile)(
          new _ReactNativeFile.ReactNativeFile({
            uri: '',
            name: '',
            type: ''
          })
        ),
        true
      )
    }
  )
  tests.add('`isExtractableFile` with a non-file.', function() {
    ;(0,
    _assert.strictEqual)((0, _isExtractableFile.isExtractableFile)({}), false)
  })
}

exports.default = _default
