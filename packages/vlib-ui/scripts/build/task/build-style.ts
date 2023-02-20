import { dest, src } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { resolve } from 'node:path'

import { compRoot, generatePaths, output, outputCjs, outputEsm } from '../utils'
import { rollup } from 'rollup'

export const buildStyle = async () => {
  await Promise.all([
    buildScssCopy(),
    buildScssModules(),
    buildScssFull(),
    buildStyleModules(),
  ])
}

/** 复制scss文件 */
const buildScssCopy = async () => {
  await new Promise((resolve) => {
    src(`${compRoot}/**/*.scss`)
      .pipe(dest(outputEsm))
      .pipe(dest(outputCjs))
      .on('end', resolve)
  })
}

const buildScssModules = async () => {
  const sass = gulpSass(dartSass)
  await new Promise((resolve) => {
    src(`${compRoot}/**/*.scss`)
      .pipe(sass.sync())
      .pipe(autoprefixer({ cascade: false }))
      .pipe(dest(outputEsm))
      .pipe(dest(outputCjs))
      .on('end', resolve)
  })
}

const buildScssFull = async () => {
  const sass = gulpSass(dartSass)
  await new Promise((resolve) => {
    src(`${compRoot}/*.scss`)
      .pipe(sass.sync()) // 编译
      .pipe(autoprefixer({ cascade: false })) // 兼容
      .pipe(cleanCSS()) // 压缩
      .pipe(dest(output)) // dist
      .on('end', resolve) // 监听流完成
  })
}

/**
 * [src/**\/style/*.ts] to [es/**\/style/*.js, lib/**\/style/*.js]
 */
const buildStyleModules = async () => {
  const input = [
    // style
    ...(await glob(`${compRoot}/**/style/*.ts`)),
    resolve(compRoot, 'resolver.ts'),
  ]

  console.log('input: ', input)
  const bundle = await rollup({
    input,
    plugins: [
      esbuild({
        sourceMap: true,
      }),
    ],
    external: [/./],
    treeshake: false,
  })

  await Promise.all([
    bundle.write({
      format: 'esm',
      dir: outputEsm,
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: (info) => {
        return `${info.facadeModuleId
          ?.split('src')[1]
          .split(info.name)[0]
          .slice(1)}${info.name}.mjs`
      },
    }),
    bundle.write({
      format: 'cjs',
      dir: outputCjs,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      // TODO 不知道为啥 name 不包含相对路径
      entryFileNames: (info) => {
        return `${info.facadeModuleId
          ?.split('src')[1]
          .split(info.name)[0]
          .slice(1)}${info.name}.js`
      },
      paths: generatePaths(),
    }),
  ])
}
