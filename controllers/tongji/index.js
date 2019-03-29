module.exports = function (req, res, next) {
  /* 访问统计 */
  const UserAgent = req.headers["user-agent"];
  const query = req.query;
  res.writeHead(200)
  res.end(JSON.stringify({
    "user-agent": UserAgent,
    "request-query": query
  }))
  next()
}