const dashdash = require('dashdash')

const options = [
  {
    names: ['help', 'h'],
    type: 'bool',
    help: 'Print this help and exit.'
  },
  {
    names: ['port', 'p'],
    type: 'positiveInteger',
    help: 'port to listen',
    helpArg: 'PORT',
    default: 9999
  },
  {
    names: ['log', 'l'],
    type: 'bool',
    help: 'enable logging',
    default: false
  },
  {
    names: ['bindall'],
    type: 'bool',
    help: 'bind all interfaces (0.0.0.0)',
    default: false
  },
]

const parser = dashdash.createParser({ options: options })
let opts
try {
  opts = parser.parse(process.argv)
} catch (e) {
  console.error('mirror: error: %s', e.message)
  process.exit(1)
}

if (opts.help) {
  const help = parser.help({ includeDefault: true }).trimRight()
  console.log(`usage: mirror [OPTIONS]
options:
${help}`)
  process.exit(0)
}

const mirror = require('./mirror')({ log: opts.log, port: opts.port, bindall: opts.bindall })
mirror.start().then(msg => console.log(msg))