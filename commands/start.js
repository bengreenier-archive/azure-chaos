const factory = require('../lib/factory')

exports.command = 'start <extension> [key]'

exports.describe = 'starts some chaos'

exports.builder = {
  key: {
      description: `optional extension authorization key\n
        https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook#api-key-authorization`,
      required: false,
      type: 'string'
  },
  resources: {
      description: `target resource ids in the form of subscription/resourceGroup/resourceId`,
      required: true,
      type: 'array'
  },
  accessToken: {
    description: `short-lived access token to pass to the chaos event`,
    required: true,
    type: 'string'
  }
}

exports.handler = (argv) => {
    const registry = factory.ExtensionRegistry.create()
    const rp = factory.RequestProcessor.create()
    const logger = factory.Logger.create()

    registry
        .get({extensionName: argv.extension})
        .then((ext) => {
            return rp.start({
                extensionUri: ext.uri,
                authKey: argv.key,
                resources: argv.resources,
                accessToken: argv.accessToken
            })
        })
        .then((res) => {
            if (res.statusCode !== 200) {
                throw new Error(`Invalid Status ${res.statusCode}`)
            }
        })
        .then(logger.info.bind(logger), logger.error.bind(logger))
}