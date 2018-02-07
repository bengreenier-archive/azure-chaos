const factory = require('../lib/factory')

exports.command = 'unregister <name>'

exports.describe = 'unregister a chaos extension'

exports.builder = {}

exports.handler = (argv) => {
    const registry = factory.ExtensionRegistry.create()

    registry.unregister({
        extensionName: argv.name
    })
}