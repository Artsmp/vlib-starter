import { resolve } from 'path'
import {
  compRoot,
  generateExternal,
  output,
  PKG_CAMELCASE_NAME,
  target,
} from '../utils'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vueDefineOptions from 'unplugin-vue-define-options/rollup'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { nodeResolve } from '@rollup/plugin-node-resolve'
const build = async (minify: boolean) => {
  const input = [resolve(compRoot, 'index.ts')]

  const bundle = await rollup({
    input,
    plugins: [
      vue(),
      vueJsx(),
      vueDefineOptions(),
      nodeResolve(),
      esbuild({
        target,
        sourceMap: minify,
        treeShaking: true,
      }),
      minify
        ? minifyPlugin({
            target,
            sourceMap: minify,
          })
        : null,
    ],
    treeshake: true,
    external: generateExternal({ full: false }),
  })

  await Promise.all([
    bundle.write({
      format: 'esm',
      file: resolve(output, `index${minify ? '.min' : ''}.mjs`),
      exports: undefined,
      sourcemap: minify,
    }),
    bundle.write({
      format: 'umd',
      file: resolve(output, `index${minify ? '.min' : ''}.js`),
      exports: 'named',
      sourcemap: minify,
      name: PKG_CAMELCASE_NAME,
      globals: {
        vue: 'Vue',
        vant: 'vant',
      },
    }),
  ])
}

// 合并为一个主任务
export const buildFull = async () => {
  await Promise.all([build(false), build(true)])
}
