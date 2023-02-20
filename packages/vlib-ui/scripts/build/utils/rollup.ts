import { compPackage } from '.'

export const target = 'esnext'

export const getCompPackages = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version, peerDependencies, dependencies } = require(compPackage)

  return {
    version,
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export const generateExternal = (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getCompPackages()
  const packages: string[] = peerDependencies
  if (options.full) {
    packages.push(...dependencies)
  }
  return (id: string) => {
    return packages.some(
      (pkg) => id === pkg || (options.full && id.startsWith(`${pkg}/`))
    )
  }
}

/** 替换路径 es -> cjs */
export const generatePaths = () => {
  const paths = [
    ['lodash-es', 'lodash'],
    ['vant/es', 'vant/lib'],
  ]

  return (id: string) => {
    for (const [oldPath, newPath] of paths) {
      if (id.startsWith(oldPath)) {
        return id.replace(oldPath, newPath)
      }
    }

    return ''
  }
}
