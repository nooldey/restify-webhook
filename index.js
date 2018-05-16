
/* 
 * @Author: nooldey 
 * @Author-Email: <nooldey@gmail.com>
 * @Date: 2018-05-14 08:54:43 
 * @Last Modified by: nooldey
 * @Last Modified time: 2018-05-16 09:31:48
 * @Description: webhook主文件
 */

const restify = require('restify')
const fs = require('fs')
const YAML = require('yamljs')
const PATH = require('path')
const config = YAML.parse(fs.readFileSync(PATH.resolve(__dirname, './config.yml')).toString())
const Modules = require('./modules')

/* custom handlers */
function crossOrigin(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With")
    return next()
}

/* API Main */
const API = () => {
    const server = restify.createServer({
        name: config.serverName
    })

    /* handlers */
    server.pre(crossOrigin)

    /* plugins */
    server.use(restify.plugins.acceptParser(server.acceptable))
    server.use(restify.plugins.queryParser())
    server.use(restify.plugins.bodyParser())
    // server.use(restify.plugins.gzipResponse())

    /* routers */
    server.post('/webhook/', (req, res, next) => {
        const agent = req.headers['user-agent'];
        if (/bitbucket/i.test(agent)) {
            /* 来自bitbucket */
            Modules.bitbucket(req, next)
        }
        res.send({
            code: 1000,
            data: ok
        })
    })

    /* start server */
    server.listen(config.port, config.local, () => {
        console.log('%s listening at %s', server.name, server.url)
    })
}

API()