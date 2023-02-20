import { defineUserConfig, viteBundler, defaultTheme } from 'vuepress'
import { codeBlockPlugin } from '@artsmp/vuepress-plugins'
import { zh } from './configs/navbar'
import { zh as sidebarZh } from './configs/sidebar'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import vueDefineOptions from 'unplugin-vue-define-options/vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
  base: '/vlib-starter/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'vlib-starter',
      description: 'Vue3 组件库开发模板 & Vue3 组件库实践指南',
    },
  },
  bundler: viteBundler({
    viteOptions: {
      plugins: [vueDefineOptions()],
    },
    vuePluginOptions: {},
  }),
  theme: defaultTheme({
    locales: {
      '/': {
        navbar: zh,
        sidebar: sidebarZh,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
      },
    },
  }),
  pagePatterns: [
    '**/*.md',
    '!.vuepress',
    '!node_modules',
    // 查找组件的文件
    '../packages/vlib-ui/**/*.md',
    '!../packages/**/node_modules',
  ],
  plugins: [codeBlockPlugin()],
})
