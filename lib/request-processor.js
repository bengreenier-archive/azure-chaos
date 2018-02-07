const request = require('request')
const url = require('url')

module.exports = class RequestProcessor {
    constructor({requestImpl}) {
        this._request = requestImpl || request
    }

    start({extensionUri, accessToken, resources, authKey}) {
        const uri = url.resolve(extensionUri, '/start', (authKey ? `?code=${authKey}` : ''))
        
        return this._issueAsync({uri, method: 'post', body: {
            accessToken,
            resources
        }})
    }

    stop({extensionUri, accessToken, resources, authKey}) {
        const uri = url.resolve(extensionUri, '/stop', (authKey ? `?code=${authKey}` : ''))
        
        return this._issueAsync({uri, method: 'post', body: {
            accessToken,
            resources
        }})
    }

    _issueAsync({method, uri, body}) {
        return new Promise((resolve, reject) => {
            this._request[method](uri, {
                body: body,
                json: true
            }, (err, res) => {
                if (err) return reject(err)
                else return resolve(res)
            })
        })
    }
}