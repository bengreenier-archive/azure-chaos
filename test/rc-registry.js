const fs = require('fs')
const assert = require('assert')
const RcRegistry = require('../lib/registries/rc-registry')

describe('rc-registry', () => {
    const testDataPath = './rc-registry.testdata'

    const resetTestData = () => {
        try {
            fs.unlinkSync(testDataPath)
        } catch(e) {
            // swallow
        }
    }

    beforeEach(resetTestData)
    afterEach(resetTestData)

    it('should register to disk', () => {
        const instance = new RcRegistry(testDataPath)

        instance.registerExtension({name: 'test'})

        assert.deepEqual({extensions: [{name: 'test'}]}, JSON.parse(fs.readFileSync(testDataPath)))
    })

    it('should unregister from disk', () => {
        const instance = new RcRegistry(testDataPath)

        fs.writeFileSync(testDataPath, JSON.stringify({extensions: [{name: 'test'}]}))

        instance.unregisterExtension({name: 'test'})

        assert.deepEqual({extensions: []}, JSON.parse(fs.readFileSync(testDataPath)))
    })
})