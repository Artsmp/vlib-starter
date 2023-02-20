import { createBEM, createTranslate } from 'vant/es/utils'

export function createNamespace(name: string) {
  const prefixName = `vlib-${name}`
  return [
    prefixName,
    createBEM(prefixName),
    createTranslate(prefixName),
  ] as const
}
