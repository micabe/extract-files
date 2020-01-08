import { deepStrictEqual, strictEqual } from 'assert'
import { ReactNativeFile } from '../../ReactNativeFile.mjs'
import { extractFiles } from '../../extractFiles.mjs'
export default (function(tests) {
  var _loop = function _loop() {
    var _arr$_i = _arr[_i],
      name = _arr$_i[0],
      value = _arr$_i[1]
    tests.add('`extractFiles` with ' + name + '.', function() {
      deepStrictEqual(extractFiles(value), {
        clone: value,
        files: new Map()
      })
      deepStrictEqual(
        extractFiles({
          a: value
        }),
        {
          clone: {
            a: value
          },
          files: new Map()
        }
      )
      deepStrictEqual(extractFiles([value]), {
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
    deepStrictEqual(extractFiles(fileList), {
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
    deepStrictEqual(extractFiles(file), {
      clone: null,
      files: new Map([[file, ['']]])
    })
    global.File = original
  })
  tests.add('`extractFiles` with a `Blob` instance.', function() {
    var original = global.Blob

    global.Blob = function Blob() {}

    var file = new Blob()
    deepStrictEqual(extractFiles(file), {
      clone: null,
      files: new Map([[file, ['']]])
    })
    global.Blob = original
  })
  tests.add('`extractFiles` with a `ReactNativeFile` instance.', function() {
    var file = new ReactNativeFile({
      uri: '',
      name: '',
      type: ''
    })
    deepStrictEqual(extractFiles(file), {
      clone: null,
      files: new Map([[file, ['']]])
    })
  })
  tests.add(
    '`extractFiles` with an object containing multiple references of a file.',
    function() {
      var file = new ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var input = {
        a: file,
        b: file
      }
      deepStrictEqual(extractFiles(input), {
        clone: {
          a: null,
          b: null
        },
        files: new Map([[file, ['a', 'b']]])
      })
      strictEqual(input.a, file)
      strictEqual(input.b, file)
    }
  )
  tests.add(
    '`extractFiles` with an object containing multiple files.',
    function() {
      var fileA = new ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var fileB = new ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var input = {
        a: fileA,
        b: fileB
      }
      deepStrictEqual(extractFiles(input), {
        clone: {
          a: null,
          b: null
        },
        files: new Map([
          [fileA, ['a']],
          [fileB, ['b']]
        ])
      })
      strictEqual(input.a, fileA)
      strictEqual(input.b, fileB)
    }
  )
  tests.add(
    '`extractFiles` with a nested object containing a file.',
    function() {
      var file = new ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var input = {
        a: {
          a: file
        }
      }
      deepStrictEqual(extractFiles(input), {
        clone: {
          a: {
            a: null
          }
        },
        files: new Map([[file, ['a.a']]])
      })
      strictEqual(input.a.a, file)
    }
  )
  tests.add(
    '`extractFiles` with an array containing multiple references of a file.',
    function() {
      var file = new ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var input = [file, file]
      deepStrictEqual(extractFiles(input), {
        clone: [null, null],
        files: new Map([[file, ['0', '1']]])
      })
      strictEqual(input[0], file)
      strictEqual(input[0], file)
    }
  )
  tests.add(
    '`extractFiles` with an array containing multiple files.',
    function() {
      var file0 = new ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var file1 = new ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var input = [file0, file1]
      deepStrictEqual(extractFiles(input), {
        clone: [null, null],
        files: new Map([
          [file0, ['0']],
          [file1, ['1']]
        ])
      })
      strictEqual(input[0], file0)
      strictEqual(input[1], file1)
    }
  )
  tests.add(
    '`extractFiles` with a nested array containing a file.',
    function() {
      var file = new ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      var input = [[file]]
      deepStrictEqual(extractFiles(input), {
        clone: [[null]],
        files: new Map([[file, ['0.0']]])
      })
      strictEqual(input[0][0], file)
    }
  )
  tests.add('`extractFiles` with a second `path` parameter, file.', function() {
    var file = new ReactNativeFile({
      uri: '',
      name: '',
      type: ''
    })
    deepStrictEqual(extractFiles(file, 'prefix'), {
      clone: null,
      files: new Map([[file, ['prefix']]])
    })
  })
  tests.add(
    '`extractFiles` with a second `path` parameter, file nested in an object and array.',
    function() {
      var file = new ReactNativeFile({
        uri: '',
        name: '',
        type: ''
      })
      deepStrictEqual(
        extractFiles(
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
      deepStrictEqual(
        extractFiles(file, '', function(value) {
          return value instanceof CustomFile
        }),
        {
          clone: null,
          files: new Map([[file, ['']]])
        }
      )
    }
  )
})
