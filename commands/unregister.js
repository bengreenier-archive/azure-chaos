const factory = require('../lib/factory')

exports.command = 'unregister <name>'

exports.describe = 'unregister a chaos extension'

exports.builder = {}

exports.handler = (argv) => {
    const registry = factory.ExtensionRegistry.create()
    const logger = factory.Logger.create()
    
    registry
        .unregister({
            extensionName: argv.name
        })
        .then(logger.info.bind(logger), logger.error.bind(logger))
}