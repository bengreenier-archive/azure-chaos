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
    required: false,
    type: 'string'
  }
}

exports.handler = (argv) => {
    const authenticator = factory.AzureAuthenticator.create()
    const registry = factory.ExtensionRegistry.create()
    const rp = factory.RequestProcessor.create()
    const logger = factory.Logger.create()

    const asyncAuthProvider = argv.accessToken ? Promise.resolve(argv.accessToken) : authenticator.interactive()

    registry
        .get({extensionName: argv.extension})
        .then((ext) => {
            return asyncAuthProvider
                .then((accessToken) => {
                    return rp.start({
                        extensionUri: ext.uri,
                        authKey: argv.key,
                        resources: argv.resources,
                        accessToken: accessToken
                    })
                })
        })
        .then((res) => {
            if (res.statusCode !== 200) {
                throw new Error(`Invalid Status ${res.statusCode}`)
            }
        })
        .then(logger.info.bind(logger), logger.error.bind(logger))
}