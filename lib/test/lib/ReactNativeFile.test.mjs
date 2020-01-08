import { strictEqual } from 'assert'
import { ReactNativeFile } from '../../ReactNativeFile.mjs'
export default (function(tests) {
  tests.add('`ReactNativeFile`.', function() {
    var uri = '<uri>'
    var name = 'a.jpg'
    var type = 'image/jpeg'
    var file = new ReactNativeFile({
      uri: uri,
      name: name,
      type: type
    })
    strictEqual(file.uri, uri)
    strictEqual(file.name, name)
    strictEqual(file.type, type)
  })
})
