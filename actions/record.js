/*
 * @Author: nooldey <nooldey@gmail.com> 
 * @Date: 2019-03-18 17:29:46 
 * @Last Modified by: nooldey
 * @Last Modified time: 2019-03-20 16:21:49
 * 记录请求，写入到日志文件
 */
module.exports = function (req, res) {
  const split = '   ///////////////////////   ';
  const splitBlock = '\n' + split + 'request' + new Date() + split + '\n';
  console.log(splitBlock);
  console.log('headers: ');
  console.log(req.headers);
  console.log(splitBlock);
  console.log('body: ');
  console.log(req.body);
  console.log(splitBlock);
  console.log('query: ');
  console.log(req.query);

  // console.log(splitBlock);
  // console.log(res);
}