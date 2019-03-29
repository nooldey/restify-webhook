const bitbucket = require('./bitbucket/index');
const yuque = require('./yuque/index');
const travis = require('./travis-ci/index');

const logs = require('./log/index');
const tongji = require('./tongji/index');
module.exports = {
    bitbucket,
    yuque,
    travis,
    logs,
    tongji,
}