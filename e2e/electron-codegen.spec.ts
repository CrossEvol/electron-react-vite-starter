// tests/electron-codegen.spec.ts

import { _electron as electron, test } from '@playwright/test'
import { findLatestBuild, parseElectronApp } from 'electron-playwright-helpers'
import pkg from '../package.json'

// 假设你的 Electron 应用打包后在 'dist' 目录下
// findLatestBuild 会找到最新的打包文件
const latestBuild = findLatestBuild(`./release/${pkg.version}`)
// parseElectronApp 会解析应用信息
const appInfo = parseElectronApp(latestBuild)

test('Launch Electron app for Codegen', async () => {
  // 启动 Electron 应用
  // electron.launch() 接受一个包含主入口文件路径的对象
  // 或者直接传递可执行文件的路径
  const electronApp = await electron.launch({
    args: [appInfo.main], // appInfo.main 是你 Electron app 的主入口JS文件
    executablePath: appInfo.executable // appInfo.executable 是 Electron 的可执行文件路径
  })

  // 获取第一个窗口，这是必须的
  const window = await electronApp.firstWindow()

  // 关键步骤：这行代码会暂停测试执行，并打开 Playwright Inspector
  // 允许你开始录制
  await window.pause()

  // ... 录制结束后，你可以把生成的代码粘贴到这里 ...

  // 关闭应用
  await electronApp.close()
})
