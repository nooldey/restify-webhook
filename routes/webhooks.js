const Router = require('restify-router').Router;
const router = new Router();
const { bitbucket, yuque } = require('../controllers')

router.post('/bitbucket', bitbucket);
router.post('/yuque', yuque);

module.exports = router;