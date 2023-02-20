import fs from 'fs-extra'
import { output, outputCjs, outputEsm } from '../utils'

export const clean = async () => {
  await Promise.all([
    fs.remove(output),
    fs.remove(outputEsm),
    fs.remove(outputCjs),
  ])
}
