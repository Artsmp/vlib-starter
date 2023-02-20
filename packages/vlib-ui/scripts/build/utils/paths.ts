import { resolve } from 'node:path'

export const root = resolve(__dirname, '..', '..', '..')
export const compRoot = resolve(root, 'src')

export const output = resolve(root, 'dist')
export const outputEsm = resolve(root, 'es')
export const outputCjs = resolve(root, 'lib')

export const compPackage = resolve(root, 'package.json')
