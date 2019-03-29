/*
 * @Author: nooldey <nooldey@gmail.com> 
 * @Date: 2019-03-28 18:06:34 
 * @Last Modified by: nooldey
 * @Last Modified time: 2019-03-29 15:53:16
 * 接收语雀文档更新推送，并触发travis更新，日志记录
 */
const TrickTravis = require('../travis-ci/index');

module.exports = function(req, res, next){
  const agent = req.headers['user-agent'];
  const sofaId = req.headers['sofa-traceid'];
  if (!sofaId || /postman/i.test(agent) || !req.query) {
    res.writeHead(404);
    res.end('0');
    next()
  } else {
    TrickTravis(req, res, next);
    next()
  }
}