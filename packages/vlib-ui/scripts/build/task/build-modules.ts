import { resolve } from 'path'
import {
  compRoot,
  generateExternal,
  generatePaths,
  outputCjs,
  outputEsm,
  target,
} from '../utils'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vueDefineOptions from 'unplugin-vue-define-options/rollup'
import esbuild from 'rollup-plugin-esbuild'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export const buildModules = async () => {
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
        sourceMap: true,
      }),
    ],
    treeshake: false,
    external: generateExternal({ full: true }),
  })

  await Promise.all([
    bundle.write({
      format: 'esm',
      dir: outputEsm,
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: `[name].mjs`,
    }),
    bundle.write({
      format: 'cjs',
      dir: outputCjs,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: `[name].js`,
      paths: generatePaths(),
    }),
  ])
}
