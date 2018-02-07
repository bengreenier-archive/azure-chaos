#!/usr/bin/env node

const yargs = require('yargs')
const factory = require('../lib/factory')
const pkgJson = require('../package.json')

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
factory.AzureAuthenticator.configure({
    msRestImpl: require('ms-rest-azure')
})

// finally, run the yargs command pipeline or show help
const shellArgs = yargs
    .commandDir('../commands')
    .usage('azchaos [command] [args]')
    .version(pkgJson.version)
    .wrap(yargs.terminalWidth())
    .epilog('Learn more @ https://github.com/bengreenier/azure-chaos')
    .alias('h', 'help')
    .help('h')
    .demandCommand()
    .recommendCommands()
    .argv