import { ReactNativeFile } from './ReactNativeFile.mjs'
export var isExtractableFile = function isExtractableFile(value) {
  return (
    (typeof File !== 'undefined' && value instanceof File) ||
    value instanceof ReactNativeFile
  )
}
