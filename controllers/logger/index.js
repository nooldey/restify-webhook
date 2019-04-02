/** 
 * @swagger 
 * tags: 
 *   - name: status 
 *     description: Is the service in a good state 
 */ 

const fs = require('fs')
const Path = require('path')

module.exports = function(req, res, next){
  fs.readFile(Path.resolve(__dirname, '../../log/req.log'), function (err, data) {
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