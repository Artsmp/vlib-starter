import { series, parallel } from 'gulp'
import {
  buildFull,
  buildModules,
  buildStyle,
  clean,
  generateTypes,
} from './task'

export default series([
  clean,
  parallel(buildModules, buildFull, generateTypes, buildStyle),
])
