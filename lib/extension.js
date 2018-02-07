module.exports = class Extension {
    constructor({name, uri, desc}) {
        this._name = name
        this._uri = uri
        this._desc = desc
    }

    get name() {
        return this._name
    }

    set name(val) {
        this._name = val
    }

    get uri() {
        return this._uri
    }

    set uri(val) {
        this._uri = val
    }

    get desc() {
        return this._desc
    }

    set desc(val) {
        this._val = val
    }

    toJSON() {
        return {
            name: this.name,
            uri: this.uri,
            desc: this.desc
        }
    }
}