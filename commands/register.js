const factory = require('../lib/factory')

exports.command = 'register <name> <uri> [desc]'

exports.describe = 'register a chaos extension'

exports.builder = {}

exports.handler = (argv) => {
    const registry = factory.ExtensionRegistry.create()

    registry.register({
        extensionName: argv.name,
        extensionUri: argv.uri,
        extensionDesc: argv.desc
    })
}