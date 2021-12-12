const fs = require('fs')

// Transpile all ESM modules from @fullcalendar/*.
const packages = fs.readdirSync('./node_modules/@fullcalendar').map(folder => `@fullcalendar/${folder}`)
const withTM = require('next-transpile-modules')(packages)

module.exports = withTM({
  reactStrictMode: true,
})
