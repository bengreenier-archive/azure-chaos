const fs = require('fs')
const equal = require('deep-equal')
const RegistryBase = require('./registry-base')

module.exports = class RcRegistry extends RegistryBase {
    constructor(rcLocation) {
        super()
        this._rcLocation = rcLocation
    }

    _inflate() {
        try {
            return JSON.parse(fs.readFileSync(this._rcLocation))
        } catch (e) {
            return {}
        }
    }

    _deflate(obj) {
        fs.writeFileSync(this._rcLocation, JSON.stringify(obj, 4))
    }

    registerExtension(extension) {
        let obj = this._inflate()

        if (!obj.extensions) {
            obj.extensions = [extension]
        } else {
            obj.extensions.push(extension)
        }

        this._deflate(obj)
    }

    unregisterExtension(extension) {
        let obj = this._inflate()
        obj.extensions = (obj.extensions || []).filter(e => !equal(e, extension))

        this._deflate(obj)
    }
}