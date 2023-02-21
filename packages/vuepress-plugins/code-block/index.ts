import { resolve } from 'node:path'
import type { Plugin } from '@vuepress/core'
import { resolveHtmlBlock, resolveScriptSetup } from './node'

export const codeBlockPlugin = (): Plugin => {
  const store = new Map<string, Set<string>>()
  return {
    name: '@art-test/vuepress-plugin-code-block',
    clientConfigFile: resolve(__dirname, './client/client-config.ts'),
    extendsMarkdown(md) {
      resolveHtmlBlock(md, store)
    },
    extendsPage(page) {
      resolveScriptSetup(page, store)
    },
  }
}
