const writeFile = require('fs').writeFile
const dotenv = require('dotenv')

dotenv.config()

const targetPath = './src/environments/environment.prod.ts'

const envConfigFile = `export const environment = {
   production: true,
   baseUrl:  '${process.env.BASE_URL}'
}
`

writeFile(targetPath, envConfigFile, 'utf8', (err: unknown) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.log(err)
  }
})