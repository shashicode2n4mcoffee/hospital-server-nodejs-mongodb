const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const dbConnect = require("./config/db");

const { userRouter, authRouter } = require("./routes");
const {
  globalErrorHandler,
} = require("./config/errorHandlers/globalErrorHandler");

// dotenv config
dotEnv.config();

const app = express();

//Connenction to the Database
dbConnect();

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

// Base test api
app.get("/home", (req, res) => {
  res.status(200).send({ messgae: "Welcome to our first application" });
});

// Global error handling
app.use((error, req, res, next) => globalErrorHandler(error, req, res, next));

// App server listener
app.listen(8080, () => {
  console.log(`Server is up and running on the port : ${8080}`);
});
