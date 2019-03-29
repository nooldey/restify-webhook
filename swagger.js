const restifySwaggerJsdoc = require('restify-swagger-jsdoc')

module.exports = function (server) {
  /* Swagger Jsdoc */
  restifySwaggerJsdoc.createSwaggerPage({
    title: server.name + ' documentation',
    version: '1.0.0',
    server: server,
    path: '/docs',
    description: server.name + '接口文档',
    tags: [],
    host: server.url,
    schemes: [],
    apis: ['./controllers/*/**.js'],
    definitions: {},
    routePrefix: '',
    forceSecure: false
  })
}