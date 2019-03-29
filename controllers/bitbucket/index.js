/*
 * @Author: nooldey <nooldey@gmail.com> 
 * @Date: 2019-03-28 17:32:17 
 * @Last Modified by: nooldey
 * @Last Modified time: 2019-03-29 14:19:17
 * @description: 接受bitbucket推送并拉去bitbucket代码进行指定命令构建
 */

const fs = require('fs')
const PATH = require('path')
const YAML = require('yamljs')
const COMMANDS = YAML.parse(fs.readFileSync(PATH.resolve(__dirname, './bitbucket.yml')).toString())
const exec = require('child_process').exec;

module.exports = function (req, res, next) {
  const agent = req.headers['user-agent'];
  if (!/bitbucket\-webhooks/i.test(agent)) {
    res.writeHead(404);
    res.end('Not Found');
    next();
    return;
  }
  /* 判断是否需要运行仓库对应的指令 */
  const isPush = req.headers['x-event-key'] == 'repo:push';
  const repo = req.body.repository.name;
  const command = COMMANDS[repo];
  if (isPush && repo && command) {
    /* 执行自动构建 */
    let commands = command.join(' && ');
    /* 验证是否已经更新抓取过最新的仓库了 */
    exec(commands, function (err, out, code) {
      if (err instanceof Error) {
        res.writeHead(500)
        res.end('Server Internal Error')
        throw err
      }
      process.stderr.write(err)
      process.stdout.write(out)
      res.writeHead(200)
      res.end('Deploy Done')
    })
    /* 自动构建end */
    next()
  } else {
    res.writeHead(200)
    res.end('Other action')
  }
}