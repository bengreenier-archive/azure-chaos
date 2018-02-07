const msRest = require('ms-rest-azure')

module.exports = class AzureAuthenticator {
    constructor({msRestImpl}) {
        this._msRestImpl = msRestImpl || msRest
    }

    interactive() {
        return this._msRestImpl.interactiveLogin()
            .then((authObj) => {
                return new Promise((resolve, reject) => {
                    authObj.retrieveTokenFromCache((err, type, value) => {
                        if (err) return reject(err)
                        resolve(`${type} ${value}`)
                    })
                })
            })
    }
}