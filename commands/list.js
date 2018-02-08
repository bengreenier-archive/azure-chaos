const factory = require('../lib/factory')
const table = require('table')

exports.command = 'list [search]'

exports.describe = 'lists registered extensions'

exports.builder = {
    search: {
        description: 'a term to search for'
    }
}

exports.handler = (argv) => {
    const registry = factory.ExtensionRegistry.create()
    const logger = factory.Logger.create()
    
    const term = (argv.search || '').toString()

    return registry
        .getAll()
        .then((exts) => {
            if (argv.search) {
                return exts.filter(e => {
                    return e.name.indexOf(term) !== -1 &&
                        e.desc.indexOf(term) !== -1 &&
                        e.uri.indexOf(term) !== -1
                    })
            } else {
                return exts
            }
        })
        .then((exts) => {
            return exts.map(e => [e.name, e.uri, e.desc])
        })
        .then((data) => {
            data.unshift(['Name', 'Uri', 'Description'])
            return table.table(data, {
                drawHorizontalLine(index, size) {
                    return index === 1
                }
            })
        })
        .then(logger.raw.bind(logger), logger.error.bind(logger))
}