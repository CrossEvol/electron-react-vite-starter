import * as dotenv from 'dotenv'
import fs from 'node:fs'
import openapiTS, { astToString } from 'openapi-typescript'
import path from 'path'
import ts from 'typescript'
dotenv.config({ path: ['.env'] })

const docUrl = process.env.SCHEMA_OPENAPI3_URL!
const filename = process.env.SCHEMA_OPENAPI3_OUTPUT_FILENAME!
const outputDir = process.env.SCHEMA_OPENAPI3_OUTPUT_DIRECTORY!

const DATE = ts.factory.createTypeReferenceNode(
  ts.factory.createIdentifier('Date')
) // `Date`
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull()) // `null`

const genByOpenapi = async () => {
  const ast = await openapiTS(docUrl, {
    /* @7 */
    transform(schemaObject, _metadata) {
      if (schemaObject.format === 'date-time') {
        return schemaObject.nullable
          ? ts.factory.createUnionTypeNode([DATE, NULL])
          : DATE
      }
    }
  })

  // (optional) write to file
  fs.writeFileSync(path.join(outputDir, filename), astToString(ast))
}

await genByOpenapi()
