'use strict'

var fs      = require('fs')
var resolve = require('path').resolve
var join    = require('path').join
var cp      = require('child_process')

// Get /modules and /node_modules path
var modules = resolve(__dirname, '../modules/')
var nm      = resolve(__dirname, '../node_modules/')

// Setup symlinc in /node_modules to /modules if it's doesn't exist
cp.exec('ln -s ../modules _', {
  cwd: nm
})

fs.readdirSync(modules)
  .forEach(function(module) {
    let modPath = join(modules, module)

    // Ensure path has package.json
    if (!fs.existsSync(join(modPath, 'package.json'))) return

    // Install dependencies
    cp.spawn('npm', ['i'], { env: process.env, cwd: modPath, stdio: 'inherit' })
  })
