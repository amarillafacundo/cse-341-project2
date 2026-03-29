const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FitStart API",
      version: "1.0.0",
      description: "API for workouts and habits"
    },
    servers: [
      {
        url: "https://cse-341-project2-feeo.onrender.com"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
