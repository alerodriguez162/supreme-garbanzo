// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");
const moment = require("moment");
// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);
require("./config/session.config")(app);

// default value for title local

const projectName = "la-casa-del-metronomo";

const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("formatDate", function (dateString) {
  return new hbs.SafeString(moment().startOf(moment(dateString).format("MMMM Do YYYY, h:mm:ss a")).fromNow());
});

app.locals.title = `${capitalized(projectName)}`;

app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;
  next();
});

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const pdp = require("./routes/pdp.routes");
app.use("/pdp", pdp);

const plp = require("./routes/plp.routes");
app.use("/plp", plp);

const auth = require("./routes/auth.routes");
app.use("/auth", auth);

const cart = require("./routes/cart.routes");
app.use("/cart", cart);

const checkout = require("./routes/checkout.routes");
app.use("/checkout", checkout);

const user = require("./routes/user.routes");
app.use("/user", user);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
