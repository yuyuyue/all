// 单入口
const Hapi = require('hapi')
const routesHelloapi = require('./routes/hello')
const routesShopsapi = require('./routes/shops')
const routesOodersapi = require('./routes/orders')
const pluginHapiSwagger = require('./plugins/hapi-swagger')
const config = require('./config')

const server = new Hapi.Server()

server.connection({
  port: config.port,
  host: config.host
})

const init = async () => {
  await server.register([
    ...pluginHapiSwagger
  ])

  server.route([
    ...routesHelloapi,
    ...routesShopsapi,
    ...routesOodersapi
  ])
  await server.start()
  console.log(`sever start at ${server.info.uri}`)
}
init()