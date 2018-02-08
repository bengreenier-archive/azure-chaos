const factory = require('../lib/factory')

exports.command = 'token'

exports.describe = 'interactively authentiate the user, and print an accessToken to stdout'

exports.builder = {}

exports.handler = (argv) => {
    const authenticator = factory.AzureAuthenticator.create()
    const logger = factory.Logger.create()
    
    return authenticator
        .interactive()
        .then(logger.info.bind(logger), logger.error.bind(logger))
}