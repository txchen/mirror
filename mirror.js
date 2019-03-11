const urijs = require('uri-js')

const mirror = (opts = { log: false, port: 9999, bindall: false }) => {
  const fastify = require('fastify')({ logger: opts.log === true })
  fastify.register(require('fastify-formbody'))

  fastify.all('/*', async (req, reply) => {
    const raw = req.req
    const urlData = urijs.parse('//' + raw.headers.host + raw.url)
    const resp = {
      method: raw.method,
      // query: req.query,
      // params: req.params,
      headers: raw.headers,
      body: req.body,
      ip: raw.ip,
      reqId: req.id,
      urlData
    }
    if (req.headers['accept'].includes('text/html')) {
      return JSON.stringify(resp, null, 2)
    }
    return resp
  })

  const start = async () => {
    await fastify.listen(opts.port, opts.bindall ? '0.0.0.0' : undefined)
    return `mirror is listening on ${fastify.server.address().address}:${fastify.server.address().port}`
  }

  return Object.freeze({
    start
  })
}

module.exports = mirror