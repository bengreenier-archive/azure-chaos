const findUp = require('find-up')
const fs = require('fs')
const configPath = findUp.sync(['.chaosrc', '.chaosrc.json'])
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {}

const argv = require('yargs')
    .config(config)
    .commandDir('./commands')
    .help()
    .argv