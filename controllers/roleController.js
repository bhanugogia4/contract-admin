const mongoose = require("mongoose");
const Role = require("../models/roleModel");
const Utils = require("../utils/controllerUtils");
const catchAsync = Utils.catchAsync;

// ----- ROLE NAME INSTEAD OF TYPE -----

const findByRoleName = catchAsync(async (req, res, next) => {
  const roleName = req.query.name;

  await Role.findOne({ name: roleName }).then((doc) => {
    if (!doc)
      res
        .status(404)
        .send({ message: "Not found Role with name: " + roleName });
    else res.send(doc);
  });
});

exports.create = catchAsync(async (req, res, next) => {
  await Role.create(req.body).then((doc) => {
    res.status(201).json({
      status: "success",
      role: doc,
    });
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  // ----- ROLE NAME INSTEAD OF TYPE -----

  if (req.query.name) {
    findByRoleName(req, res, next);
  } else {
    await Role.find()
      .then((doc) => {
        res.send({ roles: doc });
      })
      .catch((err) => {
        res.status(500).send({
          status: "error",
          message: "Some error occurred while retrieving roles.",
        });
      });
  }
});

exports.findOne = catchAsync(async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  await Role.findById(id).then((doc) => {
    if (!doc) res.status(404).send({ message: "Not found Role with id " + id });
    else res.send(doc);
  });
});

exports.update = catchAsync(async (req, res, next) => {
  console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const id = mongoose.Types.ObjectId(req.params.id);

  // ----- REFLECT UPDATE IN API RESPONSE -----

  await Role.findByIdAndUpdate(id, req.body, { returnDocument: "after" })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found Role with id " + id,
        });
      } else {
        res.send({ message: "Role was updated successfully.", role: data });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Role with id=${id}`,
      });
    });
});

exports.delete = catchAsync(async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  Role.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found Role with id " + id,
        });
      } else {
        res.send({
          message: "Role was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Role with id=" + id,
      });
    });
});
