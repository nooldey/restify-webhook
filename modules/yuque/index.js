const Record = require('../../actions/record');
const TrickTravis = require('../travis-ci/index');

module.exports = function(req, res, next){
  const agent = req.headers['user-agent'];
  const sofaId = req.headers['sofa-traceid'];
  if (!sofaId || /postman/i.test(agent) || !req.query) {
    res.writeHead(404);
    res.end('0');
    next()
  } else {
    Record(req,res);
    TrickTravis(req, res, next);
  }
}