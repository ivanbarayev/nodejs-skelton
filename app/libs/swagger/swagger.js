const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node.js Express API with Swagger",
            version: "0.0.1",
            description:
                "Inavitas Örnek Proje",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            }
        },
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./app/routes/routes.js"],
};

const specs = swaggerJsdoc(options);

exports.Swag_serve = swaggerUi.serve
exports.Swag_setup = swaggerUi.setup(specs)
