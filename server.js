const express = require("express");
const { initDb } = require("./db/connect");
require("dotenv").config();

const workoutsRoutes = require("./routes/workouts");
const habitsRoutes = require("./routes/habits");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// routes
app.use("/workouts", workoutsRoutes);
app.use("/habits", habitsRoutes);

const port = process.env.PORT || 3000;

initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
