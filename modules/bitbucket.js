const fs = require('fs')
const PATH = require('path')
const YAML = require('yamljs')
const COMMANDS = YAML.parse(fs.readFileSync(PATH.resolve(__dirname, '../commands/bitbucket.yml')).toString())
const exec = require('child_process').exec;

module.exports = (req, res, next) => {
    /* 判断是否需要运行仓库对应的指令 */
    const isPush = req.headers['x-event-key'] == 'repo:push';
    const repo = req.body.repository.name;
    const command = COMMANDS[repo];
    if (isPush && repo && command) {
        /* 执行自动构建 */
        let commands = command.join(' && ');
        /* 验证是否已经更新抓取过最新的仓库了 */
        exec(commands, (err, out, code) => {
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