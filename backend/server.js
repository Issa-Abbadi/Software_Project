let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let dbConfig = require("./database/db");

// Express Route
const accountRoute = require("./routes/account.route");
const productRoute = require("./routes/product.route");
const createAccountRoute = require("./routes/create.account.route");
const submitOTPRoute = require("./routes/submit.otp.route");
const sendOTPRoute = require("./routes/send.otp.route");
const addProductRoute = require("./routes/create.product.route");

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db).then(
  () => {
    console.log("Database successfully connected!");
  },
  (error) => {
    console.log("Could not connect to database : " + error);
  }
);

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/login", accountRoute);
app.use("/Products", productRoute);
app.use("/addProduct", addProductRoute);
app.use("/signup", createAccountRoute);
app.use("/submit-otp", submitOTPRoute);
app.use("/send-otp", sendOTPRoute);

// PORT
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
  res.status(404).send("Error 404!");
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
