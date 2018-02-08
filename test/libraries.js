const assert = require('assert')
const factory = require('../').factory

describe('azure-chaos', () => {
    describe('AzureAuthenticator', () => {
        it('should parse and format token successfully', (done) => {
            factory.AzureAuthenticator.configure({
                msRestImpl: {
                    interactiveLogin: () => {
                        return Promise.resolve({
                            retrieveTokenFromCache: (cb) => {
                                cb(null, 'testAuthType', 'testAuthValue')
                            }
                        })
                    }
                }
            })

            const instance = factory.AzureAuthenticator.create()

            instance.interactive()
                .then((res) => {
                    assert.equal(res, 'testAuthType testAuthValue')
                })
                .then(done, done)
        })
    })
})