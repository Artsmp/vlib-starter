import { series, parallel } from 'gulp'
import { buildFull, buildModules, clean, generateTypes } from './task'

export default series([clean, parallel(buildModules, buildFull, generateTypes)])
