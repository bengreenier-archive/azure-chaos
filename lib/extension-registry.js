const fs = require('fs')
const Extension = require('./extension')

module.exports = class ExtensionRegistry {
    constructor({fsLocation, fsImpl}) {
        this._fsLocation = fsLocation
        this._fs = fsImpl || fs
    }

    get({extensionName}) {
        return this._inflateRegistryAsync()
            .then((registry) => {
                const match = (registry.extensions || [])
                    .filter(e => e.name === extensionName)
                    .map(e => new Extension(e))[0]

                if (!match) {
                    throw new Error('No such extension')
                }

                return match
            })
    }

    getAll() {
        return this._inflateRegistryAsync()
            .then((registry) => {
                return (registry.extensions || [])
                    .map(e => new Extension(e))
            })
    }

    register({extensionName, extensionUri, extensionDesc}) {
        const ext = new Extension({
            name: extensionName,
            uri: extensionUri,
            desc: extensionDesc
        })

        return this._inflateRegistryAsync()
            .then((registry) => {
                if (!registry.extensions) {
                    registry.extensions = []
                }

                return registry
            })
            .then((registry) => {
                if (registry.extensions.find(e => e.name == extensionName)) {
                    throw new Error(`Extension named '${extensionName}' already exists`)
                }

                return registry
            })
            .then((registry) => {
                registry.extensions.push(ext)

                return registry
            })
            .then(this._deflateRegistryAsync.bind(this))
    }

    unregister({extensionName}) {
        return this._inflateRegistryAsync()
            .then((registry) => {
                if (!registry.extensions) {
                    registry.extensions = []
                }

                return registry
            })
            .then((registry) => {
                if (!registry.extensions.find(e => e.name == extensionName)) {
                    throw new Error(`Extension named '${extensionName}' does not exist`)
                }

                return registry
            }).then((registry) => {

                registry.extensions = registry.extensions.filter(e => e.name !== extensionName)

                return registry
            })
            .then(this._deflateRegistryAsync.bind(this))
    }

    _inflateRegistryAsync() {
        return new Promise((resolve, reject) => {
            
            // no object, resolve to empty object
            if (!this._fs.existsSync(this._fsLocation)) {
                return resolve({})
            }

            // read the actual file, it exists
            this._fs.readFile(this._fsLocation, (err, data) => {
                if (err) return reject(err)
            
                try {
                    resolve(JSON.parse(data.toString()))
                } catch (ex) {
                    reject(ex)
                }
            })
        })
    }

    _deflateRegistryAsync(registryObj) {
        return new Promise((resolve, reject) => {
            this._fs.writeFile(this._fsLocation, JSON.stringify(registryObj, null, 4), (err) => {
                if (err) return reject(err)
                else return resolve()
            })
        })
    }
}