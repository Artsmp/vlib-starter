import type { Markdown, MarkdownEnv } from '@vuepress/markdown'
import { parseCodeBlock } from '.'

export type Store = Map<string, Set<string>>

export const resolveHtmlBlock = (md: Markdown, store: Store) => {
  const rawRule = md.renderer.rules.html_block!

  md.renderer.rules.html_block = (
    tokens,
    idx,
    options,
    env: MarkdownEnv,
    self
  ) => {
    const content = tokens[idx].content
    if (content.startsWith('<demo')) {
      tokens[idx].content = parseCodeBlock(store, content, env.filePath!)
    }
    return rawRule(tokens, idx, options, env, self)
  }
}
