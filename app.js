require('dotenv').config({ path: __dirname+'/.env' });
global.express = require("express");
global.app = express();
const {rd_client} = require('./app/adapters/database/redis');
//const {pg_client} = require('./app/adapters/database/postgresql');
const {mongo_client} = require('./app/adapters/database/mongodb');
const kafcli = require('./app/adapters/queue/kafka');
const { router } = require('./app/routes/routes');
const swagger = require('./app/libs/swagger/autogen');
const expressSwagger = require('express-swagger-generator')(app);

const jwt = require('jsonwebtoken');


//Global Variable
global.userIN = null;

app.use(express.json())
//app.set('view engine', 'ejs'); //FOR views Template engine

app.use(router);

app.get('/db', async (req, res) => {
    const redisData = await rd_client.get('latestposts')
    if (redisData) {
        return res.json({source: 'redis', data: JSON.parse(redisData), leo: req.body})
    }
    const data = await pg_client.query('select * from posts')
    await rd_client.set('latestposts', JSON.stringify(data.rows), {EX: 100,NX: true})
    res.json({source: 'pg', data: data.rows, leo: req.body});
});

app.post('/ll', async (req, res) => {
    let parseddata = jwtparser(req.header.AUTH);
    //const data = await pg_client.query("SELECT id,user_title,user_name,email,phone FROM users WHERE user_name='leo' AND user_pass='123'")
    const data = await pg_client.query("INSERT INTO (school_name,created_by) VALUES ('ted koleji', "+parseddata.user_id+")")

    let jwtdata = {
        user_id : 5,
        user_title : "Leon Romano",
        user_name : "leon",
        email : "leonromano@hotmail.com",
        phone: "4473508546246"
    }

    // PARSE -> parcalama

    const token = jwt.sign(jwtdata, process.env.SECRET_KEY)
    //const token = jwt.sign(data.rows, process.env.SECRET_KEY)
    //const token = jwt.sign({names:'leo'}, process.env.SECRET_KEY)
    res.json({source: 'pg', data: "no data", leo: "no req body", token: token});
});


//app.use("/docs", swagger.Swag_serve, swagger.Swag_setup);


let options = {
    swaggerDefinition: {
        info: {
            description: "Node.js Express API with Swagger",
            title: "Inavitas Örnek Proje",
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            Bearer: {
                description: 'Example value:- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        },
        security: [{Bearer: []}],
        defaultSecurity: 'Bearer'
    },
    basedir: __dirname, //app absolute path
    files: ['./app/controllers/**/*.js'] //Path to the API handle folder
};


module.exports = expressSwagger(options)
app.listen(process.env.APP_PORT, process.env.APP_HOST, () => console.log(`Server listening on http://${process.env.APP_HOST}:${process.env.APP_PORT}`));

