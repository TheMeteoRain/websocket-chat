// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { GeneratePackageJsonExecutorSchema } from './schema'
import { createPackageJson, createLockFile, getLockFileName } from '@nx/js'
import { writeFileSync, existsSync } from 'fs'
import {
  detectPackageManager,
  ExecutorContext,
  writeJsonFile,
  logger,
} from '@nx/devkit'

export default async function buildExecutor(
  options: GeneratePackageJsonExecutorSchema,
  context: ExecutorContext
) {
  const packageManager = detectPackageManager()
  const packageJsonOutputPath = `${options.outputPath}/package.json`

  const packageJson = createPackageJson(
    context.projectName,
    context.projectGraph,
    {
      root: context.root,
      isProduction: true,
    }
  )

  // // do any additional manipulations to "package.json" here

  const lockFile = createLockFile(
    packageJson,
    context.projectGraph,
    packageManager
  )
  const lockFileName = getLockFileName(packageManager)
  const lockFileOutputPath = `${options.outputPath}/${lockFileName}`
  writeJsonFile(packageJsonOutputPath, packageJson)

  writeFileSync(`${options.outputPath}/${lockFileName}`, lockFile, {
    encoding: 'utf-8',
  })

  if (!existsSync(packageJsonOutputPath)) {
    logger.error(`Expected file was not created: ${packageJsonOutputPath}`)
    return { success: false }
  }

  if (!existsSync(lockFileOutputPath)) {
    logger.error(`Expected file was not created: ${lockFileOutputPath}`)
    return { success: false }
  }

  return { success: true }
}
