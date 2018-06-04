const exec = require('child_process').exec;

module.exports = (req, res, next) => {
    if (req.headers['x-event-key'] == 'repo:push') {
        /* 执行自动构建 */
        let commands = [
            'cd /home/nooldey/blog/',
            'git pull',
            'npm i hexo-cli -g',
            'npm i gulp -g',
            'npm i',
            'hexo clean',
            'hexo generate',
            'gulp',
            'rm -rf /usr/share/nginx/html/blog/*',
            'cp -rf /home/nooldey/blog/public/* /usr/share/nginx/html/blog/',
            // 'hexo deploy'
        ].join(' && ');
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