const RequestProcessor = require('./request-processor')
const ExtensionRegistry = require('./extension-registry')
const AzureAuthenticator = require('./azure-authenticator')
const Logger = require('./logger')

const instanceGenerator = (type) => {
    let instanceOpts
    return {
        create: () => {
            return new type(instanceOpts)
        },
        configure: (opts) => {
            instanceOpts = opts
        }
    }
}

module.exports = {
    AzureAuthenticator: instanceGenerator(AzureAuthenticator),
    RequestProcessor: instanceGenerator(RequestProcessor),
    ExtensionRegistry: instanceGenerator(ExtensionRegistry),
    Logger: instanceGenerator(Logger)
}