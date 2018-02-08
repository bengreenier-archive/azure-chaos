const factory = require('../lib/factory')

exports.command = 'resgen <subId> [resGroup] [resName]'

exports.describe = 'create a properly formatted resource identifier'

exports.builder = {
    subId: {
        desc: 'the azure subscription id'
    },
    resGroup: {
        desc: 'the azure resource group name'
    },
    resName: {
        desc: 'the azure resource name'
    }
}

exports.handler = (argv) => {
    const logger = factory.Logger.create()
    
    const parts = [
        argv.subId,
        argv.resGroup,
        argv.resName
    ]

    return logger.raw(parts.filter(p => p).join('/'))
}