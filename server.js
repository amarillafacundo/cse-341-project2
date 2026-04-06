const express = require("express");
const { initDb } = require("./db/connect");
require("dotenv").config();
const session = require("express-session");
const cors = require("cors");
 


const workoutsRoutes = require("./routes/workouts");
const habitsRoutes = require("./routes/habits");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const passport = require("passport");
require("./config/passport");


const app = express();
app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());



// routes
app.use("/workouts", workoutsRoutes);
app.use("/habits", habitsRoutes);
app.use("/auth", require("./routes/auth"));

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
