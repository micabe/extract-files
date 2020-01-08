'use strict'

exports.__esModule = true
exports.default = void 0

var _assert = require('assert')

var _ReactNativeFile = require('../../ReactNativeFile.js')

var _extractFiles = require('../../extractFiles.js')

var _default = function _default(tests) {
  var _loop = function _loop() {
    var _arr$_i = _arr[_i],
      name = _arr$_i[0],
      value = _arr$_i[1]
    tests.add('`extractFiles` with ' + name + '.', function() {
      ;(0, _assert.deepStrictEqual)((0, _extractFiles.extractFiles)(value), {
        clone: value,
        files: new Map()
      })
      ;(0, _assert.deepStrictEqual)(
        (0, _extractFiles.extractFiles)({
          a: value
        }),
        {
          clone: {
            a: value
          },
          files: new Map()
        }
      )
      ;(0, _assert.deepStrictEqual)((0, _extractFiles.extractFiles)([value]), {
        clone: [value],
        files: new Map()
      })
    })
  }

  for (
    var _i = 0,
      _arr = [
        ['undefined', null],
        ['null', null],
        ['false', false],
        ['true', true],
        ['a falsy string', ''],
        ['a truthy string', 'a'],
        ['a falsy number', 0],
        ['a truthy number', 1],
        ['an empty object', {}],
        ['an empty array', []],
        ['a function', function() {}],
        ['an `Object` instance', new Object()],
        ['a `Number` instance', new Number(1)],
        ['a `Date` instance', new Date(2019, 0, 20)]
      ];
    _i < _arr.length;
    _i++
  ) {
    _loop()
  }

  tests.add('`extractFiles` with a `FileList` instance.', function() {
    var originalFile = global.File
    var originalFileList = global.FileList

    global.File = function File() {}

    global.FileList = function FileList(files) {
      var _this = this

      files.forEach(function(file, i) {
        _this[i] = file
      })
      this.length = files.length
    }

    var file0 = new File()
    var file1 = new File()
    var fileList = new FileList([file0, file1])
    ;(0, _assert.deepStrictEqual)((0, _extractFiles.extractFiles)(fileList), {
      clone: [null, null],
      files: new Map([
        [file0, ['0']],
        [file1, ['1']]
      ])
    })
    global.File = originalFile
    global.FileList = originalFileList
  })
  tests.add('`extractFiles` with a `File` instance.', function() {
    var original = global.File

    global.File = function File() {}

    var file = new File()
    ;(0, _assert.deepStrictEqual)((0, _extractFiles.extractFiles)(file), {
      clone: null,
      files: new Map([[file, ['']]])
    })
    global.File = original
  })
  tests.add('`extractFiles` with a `Blob` instance.', function() {
    var original = global.Blob

    global.Blob = function Blob() {}

    var file = new Blob()
    ;(0, _assert.deepStrictEqual)((0, _extractFiles.extractFiles)(file), {
      clone: null,
      files: new Map([[file, ['']]])
    })
    global.Blob = original
  })
  tests.add('`extractFiles` with a `ReactNativeFile` instance.', function() {
    var file = new _ReactNativeFile.ReactNativeFile({
      uri: '',
      name: '',
      type: ''
    })
    ;(0, _assert.deepStrictEqual)((0, _extractFiles.extractFiles)(file), {
      clone: null,
      files: new Map([[file, ['']]])
    })
  })
  tests.add(
    '`extractFiles` with an object containing multiple references of a file.',
    function() {
      var file = new _ReactNativeFile.ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var input = {
        a: file,
        b: file
      }
      ;(0, _assert.deepStrictEqual)((0, _extractFiles.extractFiles)(input), {
        clone: {
          a: null,
          b: null
        },
        files: new Map([[file, ['a', 'b']]])
      })
      ;(0, _assert.strictEqual)(input.a, file)
      ;(0, _assert.strictEqual)(input.b, file)
    }
  )
  tests.add(
    '`extractFiles` with an object containing multiple files.',
    function() {
      var fileA = new _ReactNativeFile.ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var fileB = new _ReactNativeFile.ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var input = {
        a: fileA,
        b: fileB
      }
      ;(0, _assert.deepStrictEqual)((0, _extractFiles.extractFiles)(input), {
        clone: {
          a: null,
          b: null
        },
        files: new Map([
          [fileA, ['a']],
          [fileB, ['b']]
        ])
      })
      ;(0, _assert.strictEqual)(input.a, fileA)
      ;(0, _assert.strictEqual)(input.b, fileB)
    }
  )
  tests.add(
    '`extractFiles` with a nested object containing a file.',
    function() {
      var file = new _ReactNativeFile.ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var input = {
        a: {
          a: file
        }
      }
      ;(0, _assert.deepStrictEqual)((0, _extractFiles.extractFiles)(input), {
        clone: {
          a: {
            a: null
          }
        },
        files: new Map([[file, ['a.a']]])
      })
      ;(0, _assert.strictEqual)(input.a.a, file)
    }
  )
  tests.add(
    '`extractFiles` with an array containing multiple references of a file.',
    function() {
      var file = new _ReactNativeFile.ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var input = [file, file]
      ;(0, _assert.deepStrictEqual)((0, _extractFiles.extractFiles)(input), {
        clone: [null, null],
        files: new Map([[file, ['0', '1']]])
      })
      ;(0, _assert.strictEqual)(input[0], file)
      ;(0, _assert.strictEqual)(input[0], file)
    }
  )
  tests.add(
    '`extractFiles` with an array containing multiple files.',
    function() {
      var file0 = new _ReactNativeFile.ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var file1 = new _ReactNativeFile.ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var input = [file0, file1]
      ;(0, _assert.deepStrictEqual)((0, _extractFiles.extractFiles)(input), {
        clone: [null, null],
        files: new Map([
          [file0, ['0']],
          [file1, ['1']]
        ])
      })
      ;(0, _assert.strictEqual)(input[0], file0)
      ;(0, _assert.strictEqual)(input[1], file1)
    }
  )
  tests.add(
    '`extractFiles` with a nested array containing a file.',
    function() {
      var file = new _ReactNativeFile.ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var input = [[file]]
      ;(0, _assert.deepStrictEqual)((0, _extractFiles.extractFiles)(input), {
        clone: [[null]],
        files: new Map([[file, ['0.0']]])
      })
      ;(0, _assert.strictEqual)(input[0][0], file)
    }
  )
  tests.add('`extractFiles` with a second `path` parameter, file.', function() {
    var file = new _ReactNativeFile.ReactNativeFile({
      uri: '',
      name: '',
      type: ''
    })
    ;(0,
    _assert.deepStrictEqual)((0, _extractFiles.extractFiles)(file, 'prefix'), {
      clone: null,
      files: new Map([[file, ['prefix']]])
    })
  })
  tests.add(
    '`extractFiles` with a second `path` parameter, file nested in an object and array.',
    function() {
      var file = new _ReactNativeFile.ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      ;(0, _assert.deepStrictEqual)(
        (0, _extractFiles.extractFiles)(
          {
            a: [file]
          },
          'prefix'
        ),
        {
          clone: {
            a: [null]
          },
          files: new Map([[file, ['prefix.a.0']]])
        }
      )
    }
  )
  tests.add(
    '`extractFiles` with a third `isExtractableFile` parameter.',
    function() {
      var CustomFile = function CustomFile() {}

      var file = new CustomFile()
      ;(0, _assert.deepStrictEqual)(
        (0, _extractFiles.extractFiles)(file, '', function(value) {
          return value instanceof CustomFile
        }),
        {
          clone: null,
          files: new Map([[file, ['']]])
        }
      )
    }
  )
}

exports.default = _default
