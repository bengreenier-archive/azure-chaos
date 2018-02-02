const registry = require('../registry')

exports.command = 'ondemand <chaos> <target> [length]'
exports.describe = 'initiate some chaos immediately'
exports.builder = {
    
}

exports.handler = function (argv) {
  console.log(argv)
}