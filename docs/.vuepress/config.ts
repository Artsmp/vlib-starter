import { defineUserConfig, defaultTheme, viteBundler } from 'vuepress'
import { codeBlockPlugin } from '@artsmp/vuepress-plugins'

export default defineUserConfig({
  base: '/vlib-starter/',

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'vlib-starter',
      description: 'Vue3 组件库开发模板 & Vue3 组件库实践指南',
    },
  },

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  theme: defaultTheme({
    locales: {
      '/': {
        navbar: [],
        sidebar: {},
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
