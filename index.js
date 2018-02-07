module.exports = {
    AzureAuthenticator: require('./lib/azure-authenticator'),
    ExtensionRegistry: require('./lib/extension-registry'),
    Extension: require('./lib/extension'),
    Logger: require('./lib/logger'),
    RequestProcessor: require('./lib/request-processor'),
    factory: require('./lib/factory'),
    register: require('./commands/register').handler,
    unregister: require('./commands/unregister').handler,
    start: require('./commands/start').handler,
    stop: require('./commands/stop').handler,
    resgen: require('./commands/resgen').handler
}