//const homeController = require('../controllers/home/home');
const {homeIndex, homeIndexGet} = require('../controllers/home/home');
const router                    = express.Router();


//Chain methods
router.route('/home').post(homeIndex).get(homeIndexGet);

//HTTP METHODS
/*
POST
GET
PATCH/PUT
DELETE
OPTIONS
*/
module.exports = {
    router
};
