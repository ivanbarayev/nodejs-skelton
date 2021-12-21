//const homeController = require('../controllers/home/home');
const {homeIndex, homeIndexGet} = require('../controllers/home/home');
const router                    = express.Router();


router.route('/home')
    .post(homeIndex)
    .get(homeIndexGet);

module.exports = {
    router
};
