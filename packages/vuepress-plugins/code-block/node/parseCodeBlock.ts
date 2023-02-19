import type { Store } from '.'
import { resolve, dirname } from 'node:path'
import { type Node, parser } from 'posthtml-parser'
import { readSource } from '.'
import { render } from 'posthtml-render'

export const parseCodeBlock = (
  store: Store,
  content: string,
  pagePath: string
) => {
  const html: Node[] = parser(content)
  let i = -1
  for (const node of html) {
    i++
    if (typeof node !== 'object') {
      continue
    }
    if (node.tag !== 'demo') continue
    if (typeof node.attrs?.src !== 'string') continue
    const dirPath = dirname(pagePath)
    console.log('dirPath: ', dirPath)
    const compPath = resolve(dirPath, node.attrs.src)
    console.log('compPath: ', compPath)
    if (!store.has(pagePath)) {
      store.set(pagePath, new Set())
    }
    store.get(pagePath)?.add(compPath)
    const source = readSource(compPath)
    html[i] = {
      tag: 'Demo',
      attrs: {
        name: source.name,
        rawCode: source.rawCode,
        highlightCode: source.highlightCode,
      },
      content: [
        {
          tag: `Demo${store.get(pagePath)?.size}`,
        },
      ],
    }
  }
  return render(html)
}
