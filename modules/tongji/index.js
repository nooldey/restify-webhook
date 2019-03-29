module.exports = function (req, res, next) {
  /* 访问统计 */
  console.log(req)
  res.writeHead(200)
  res.end('Finished Tongji:' + JSON.stringify(req))
  next()
}