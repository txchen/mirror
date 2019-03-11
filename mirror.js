// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const urijs = require('uri-js')

const mirror = (opts = { port: 9500, logger: false }) => {
  const fastify = require('fastify')({ logger: opts.logger === true })
  fastify.register(require('fastify-formbody'))

  fastify.all('/*', async (req, _reply) => {
    const raw = req.req
    const urlData = urijs.parse('//' + raw.headers.host + raw.url)
    return {
      method: raw.method,
      query: req.query,
      params: req.params,
      headers: raw.headers,
      body: req.body,
      ip: raw.ip,
      reqId: req.id,
      urlData
    }
  })

  const start = async () => {
    await fastify.listen(9999)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  }
  return Object.freeze({
    start
  })
}

module.exports = mirror