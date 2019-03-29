const bitbucket = require('./bitbucket/index');
const yuque = require('./yuque/index');
const travis = require('./travis-ci/index');
const tongji = require('./tongji/index');
const logger = require('./logger/index');
module.exports = {
    bitbucket,
    yuque,
    travis,
    tongji,
    logger,
}