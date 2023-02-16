require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRouter = require("./routes/userRouter.js");
const actionRouter = require("./routes/actionRouter.js");
const roleRouter = require("./routes/roleRouter.js");

// Get all users based on an action

const app = express();
app.use(cors());
app.use(morgan("tiny"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the Database successfully");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/action", actionRouter);
app.use("/api/role", roleRouter);

app.all("*", (req, res, next) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server!`);
  next(err);
});

app.use((err, req, res, next) => {
  let message = err.message;
  let statusCode = 500;

  if (err.name === "ValidationError") {
    statusCode = 400;
  }

  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    message = `Duplicate value`;
    statusCode = 400;
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
});

app.listen(8080, () => {
  console.log("Server listening to the requests");
});
