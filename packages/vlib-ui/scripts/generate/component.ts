import path from 'path'
import prompts from 'prompts'
import fs from 'fs-extra'
import { template, camelCase, upperFirst } from 'lodash-es'

function checkComponentName(name: string) {
  return !/^[a-z][a-z|-]*[a-z]$/.test(name)
}

function checkComponentExist(name: string) {
  return fs.existsSync(path.resolve(process.cwd(), `src/${name}`))
}

async function init() {
  const result = await prompts([
    {
      type: 'text',
      name: 'name',
      message: '请输入组件名称：',
      validate(name) {
        if (checkComponentName(name)) {
          return '组件名称请使用kebab-case的命名方式！'
        }
        if (checkComponentExist(name)) {
          return `已存在名为『${name}』的组件！`
        }
        return true
      },
    },
    {
      type: 'select',
      name: 'type',
      message: '请选择组件模板：',
      choices: [
        { title: 'sfc', value: 'sfc' },
        { title: 'tsx', value: 'tsx' },
      ],
    },
  ])
  console.log('result', result)
  if (!result.name) {
    return
  }
  await addComponent(result.name, result.type)
}

init()

function getCreatedFiles(name: string, type?: string) {
  return [
    {
      file: 'index.ts',
      template: 'index.ts.tpl',
    },
    {
      file: 'README.md',
      template: 'README.md.tpl',
    },
    {
      file: 'src/props.ts',
      template: 'src.props.ts.tpl',
    },
    {
      file: '__demos__/basic.vue',
      template: '__demos__.basic.vue.tpl',
    },
    {
      file: `__tests__/${name}.test.tsx`,
      template: '__tests__.component.test.tsx.tpl',
    },
    type === 'sfc'
      ? {
          file: `src/${name}.vue`,
          template: 'src.component.vue.tpl',
        }
      : {
          file: `src/${name}.tsx`,
          template: 'src.component.tsx.tpl',
        },
  ]
}

function addComponent(name: string, type?: string) {
  getCreatedFiles(name, type).forEach(async (item) => {
    const tplPath = path.resolve(__dirname, './template/' + item.template)
    let data = await fs.readFile(tplPath, 'utf-8')

    const compiled = template(data)
    data = compiled({
      name,
      type,
      camelCaseName: camelCase(name),
      pascalCaseName: upperFirst(camelCase(name)),
    })

    // 输入到文件
    const outputPath = path.resolve(process.cwd(), `src/${name}/${item.file}`)
    await fs.outputFile(outputPath, data)
    console.log(`已创建：${outputPath}`)
  })
}
