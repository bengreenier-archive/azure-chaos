const RequestProcessor = require('./request-processor')
const ExtensionRegistry = require('./extension-registry')
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
    RequestProcessor: instanceGenerator(RequestProcessor),
    ExtensionRegistry: instanceGenerator(ExtensionRegistry),
    Logger: instanceGenerator(Logger)
}