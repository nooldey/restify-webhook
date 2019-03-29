const fs = require('fs')
const PATH = require('path')

module.exports = function(req, res, next){
  fs.readFile(PATH.resolve(__dirname + '/log/req.log'), function (err, data) {
    if (err) {
      res.writeHead(500);
      res.end(JSON.stringify(err));
      next();
      return;
    } else {
      res.writeHead(200);
      res.end(data);
      next();
    }
  });
}