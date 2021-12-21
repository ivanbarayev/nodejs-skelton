//const { Home } = require('/app/models/home/home')
//const app = module.exports = express.Router();

/**
 * @route POST /home
 * @group Home - Operations about Home
 * @produces json
 * @consumes json
 * @param {string} name.required - name - eg: John
 * @param {string} surname.required - Surname - eg: Doe.
 * @returns {object} 200 - An array of Home info
 * @returns {Error}  default - Unexpected error
 */
const homeIndex = (req, res) => {
    const { name, surname, message } = req.body;
    if (!name || !surname || !message) {
        console.log("Fill empty fields");
    }
    res.send([{name:name, surname:surname, message:message},{id:2,Name:'Jay'}])
}

/**
 * @route GET /home
 * @group Home - Operations about Home
 * @param {string} name.query.required - name - eg: John
 * @param {string} surname.query.required - Surname - eg: Doe.
 * @returns {object} 200 - An array of Home info
 * @returns {Error}  default - Unexpected error
 */
const homeIndexGet = (req, res) => {
    const { name, surname, message } = req.body;
    if (!name || !surname || !message) {
        console.log("Fill empty fields");
    }
    res.send([{name:name, surname:surname, message:message},{id:2,Name:'Jay'}])
}

module.exports =  {
    homeIndex,
    homeIndexGet
};
