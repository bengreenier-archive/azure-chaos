#!/usr/bin/env node

const factory = require('./lib/factory')

// configure the factory for runtime
// this injects our production dependencies
factory.RequestProcessor.configure({
    requestImpl: require('request')
})
factory.ExtensionRegistry.configure({
    fsImpl: require('fs'),
    fsLocation: process.cwd() + '/.chaos-extensions.json'
})
factory.Logger.configure({
    logImpl: console.log
})

// finally, run the yargs command pipeline or show help
const shellArgs = require('yargs')
    .commandDir('./commands')
    .usage('azchaos [command] [args]')
    .help('--help')
    .argv