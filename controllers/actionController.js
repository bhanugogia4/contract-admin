const mongoose = require("mongoose");
const User = require("../models/actionModel");

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.findAll = catchAsync(async (req, res, next) => {
  await User.find()
    .then((doc) => {
      res.send({ actions: doc });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: "Some error occurred while retrieving actions.",
      });
    });
});
