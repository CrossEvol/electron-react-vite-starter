import * as dotenv from 'dotenv'
import fs from 'node:fs'
import readline from 'node:readline'
import openapiTS, { astToString } from 'openapi-typescript'
import path from 'path'
import ts from 'typescript'

dotenv.config({ path: ['.env'] })

const docUrl = process.env.SCHEMA_BETTER_AUTH_URL!
const filename = process.env.SCHEMA_BETTER_AUTH_OUTPUT_FILENAME!
const outputDir = process.env.SCHEMA_BETTER_AUTH_OUTPUT_DIRECTORY!
const fullOutputPath = path.join(outputDir, filename)

const DATE = ts.factory.createTypeReferenceNode(
  ts.factory.createIdentifier('Date')
)
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull())

/**
 * 高效地替换文件的第一行。
 * @param filePath 文件路径
 * @param find 要查找的字符串
 * @param replace 要替换的字符串
 */
const replaceFirstLine = async (
  filePath: string,
  find: string,
  replace: string
) => {
  const tempFilePath = filePath + '.tmp'
  const readStream = fs.createReadStream(filePath)
  const writeStream = fs.createWriteStream(tempFilePath)

  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  })

  let isFirstLine = true

  // 逐行读取
  for await (const line of rl) {
    if (isFirstLine) {
      writeStream.write(line.replace(find, replace) + '\n')
      isFirstLine = false
    } else {
      writeStream.write(line + '\n')
    }
  }

  writeStream.end()

  // 等待写入完成
  await new Promise<void>((resolve, reject) => {
    writeStream.on('finish', resolve)
    writeStream.on('error', reject)
  })

  // 用修改后的临时文件覆盖原文件
  await fs.promises.rename(tempFilePath, filePath)
}

const genByOpenapi = async () => {
  // 1. 检查并创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
    console.log(`✅ Step 1: Output directory created at ${outputDir}`)
  } else {
    console.log(`✅ Step 1: Output directory already exists at ${outputDir}`)
  }

  // 2. 生成原始的 AST
  const ast = await openapiTS(docUrl, {
    transform(schemaObject) {
      if (schemaObject.format === 'date-time') {
        return schemaObject.nullable
          ? ts.factory.createUnionTypeNode([DATE, NULL])
          : DATE
      }
    }
  })

  // 3. 将 AST 写入文件
  fs.writeFileSync(fullOutputPath, astToString(ast))
  console.log(`✅ Step 2: Successfully generated types to ${fullOutputPath}`)

  // 4. 高效地修改第一行的 'paths' 为 'MyApiPaths'
  await replaceFirstLine(fullOutputPath, 'paths', 'BetterAuthPaths')
  console.log(
    `✅ Step 3: Renamed 'paths' to 'BetterAuthPaths' in the first line.`
  )
}

await genByOpenapi()
