/*
 * @Author: nooldey <nooldey@gmail.com> 
 * @Date: 2019-03-28 18:07:18 
 * @Last Modified by: nooldey
 * @Last Modified time: 2019-03-29 13:58:14
 * 触发Travis 更新
 */

const https = require('https');

module.exports = function(req, res, next){
  const queries = req.query;

  if (!queries instanceof Object) {
    return;
  }

  const { branch, token, repos, message = 'update from yuque' } = queries || {};

  if (!branch || !token || !repos) {
    res.writeHead(400);
    res.end('0');
    next();
    return;
  }

  const payload = JSON.stringify({
    message,
    branch,
  });
  const headers = {
    'Content-Type': 'application/json',
    'Travis-API-Version': '3',
    Authorization: `token ${token}`,
    'Conent-Length': Buffer.byteLength(payload),
  };
  const options = {
    hostname: 'api.travis-ci.org',
    port: 443,
    path: `/repo/${encodeURIComponent(repos)}/requests`,
    method: 'POST',
    headers,
  };

  let result = '';

  const request = https.request(options, function(response){
    response.setEncoding('utf8');
    response.on('data', function(chunk) {
      result += chunk;
    });
    response.on('end', function(){
      res.writeHead(200);
      res.end(result);
      next();
    })
  });

  request.on('error', function(){
    res.writeHead(500);
    res.end('0');
  });

  request.write(payload);
  request.end();
}