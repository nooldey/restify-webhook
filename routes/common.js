const Router = require('restify-router').Router;
const router = new Router();
const { logger, tongji } = require('../controllers')

router.get('/log', logger);
router.get('/tongji.jpg', tongji);

module.exports = router;