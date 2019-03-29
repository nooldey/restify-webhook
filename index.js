/* 
 * @Author: nooldey 
 * @Author-Email: <nooldey@gmail.com>
 * @Date: 2018-05-14 08:54:43 
 * @Last Modified by: nooldey
 * @Last Modified time: 2019-03-29 17:58:10
 * @Description: webhook主文件
 */

const restify = require('restify')
const fs = require('fs')
const PATH = require('path')
const YAML = require('yamljs')
const config = YAML.parse(fs.readFileSync(PATH.resolve(__dirname, './config.yml')).toString())
const Controllers = require('./controllers')
const SwaggerDoc = require('./swagger');

/* custom handlers */
function crossOrigin(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With")
  return next()
}

/* API Main */
(function API() {
  const server = restify.createServer({
    name: config.serverName
  })

  /* handlers */
  server.pre(crossOrigin)

  /* plugins */
  server.use(restify.plugins.acceptParser(server.acceptable))
  server.use(restify.plugins.queryParser())
  server.use(restify.plugins.bodyParser())
  server.use(restify.plugins.gzipResponse())

  /* routers */
  server.post('/webhook/bitbucket', Controllers.bitbucket);

  server.post('/webhook/yuque', Controllers.yuque);

  server.get('/log', Controllers.logger);

  server.get('/tongji.jpg', Controllers.tongji);

  server.get('/', function (req, res, next) {
    res.writeHead(200)
    res.end('OK')
    next();
  });

  /* start server */
  server.listen(config.port || process.env.PORT, config.local, function () {
    console.log('%s listening at %s', server.name, server.url)
    /* 运行swagger文档 */
    SwaggerDoc(server);
  })
})()