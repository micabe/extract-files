import { strictEqual } from 'assert'
import { ReactNativeFile } from '../../ReactNativeFile.mjs'
import { isExtractableFile } from '../../isExtractableFile.mjs'
export default (function(tests) {
  tests.add('`isExtractableFile` with a `File` instance.', function() {
    var original = global.File

    global.File = function File() {}

    strictEqual(isExtractableFile(new File()), true)
    global.File = original
  })
  tests.add('`isExtractableFile` with a `Blob` instance.', function() {
    var original = global.Blob

    global.Blob = function Blob() {}

    strictEqual(isExtractableFile(new Blob()), true)
    global.Blob = original
  })
  tests.add(
    '`isExtractableFile` with a `ReactNativeFile` instance.',
    function() {
      strictEqual(
        isExtractableFile(
          new ReactNativeFile({
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
    strictEqual(isExtractableFile({}), false)
  })
})
