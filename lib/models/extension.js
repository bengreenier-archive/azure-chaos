module.exports = class Extension {
    get apiVersion() { return this._apiVersion }
    set apiVersion(val) { this._apiVersion = val }

    get apiEndpoint() { return this._apiEndpoint }
    set apiEndpoint(val) { this._apiEndpoint = val }

    get resourceTypes() { return this._resourceTypes }
    set resourceTypes(val) { this._resourceTypes = val }

    
}