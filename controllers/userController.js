const mongoose = require("mongoose");
const Action = require("../models/actionModel");
const User = require("../models/userModel");

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.create = catchAsync(async (req, res, next) => {
  await User.create(req.body).then((doc) => {
    res.status(201).json({
      status: "success",
      user: doc,
    });
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  if (req.query.action) {
    findUserByAction(req, res, next);
  } else {
    await User.find()
      .then((doc) => {
        res.send({ users: doc });
      })
      .catch((err) => {
        res.status(500).send({
          status: "error",
          message: "Some error occurred while retrieving users.",
        });
      });
  }
});

exports.findOne = catchAsync(async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  await User.findById(id).then((doc) => {
    if (!doc) res.status(404).send({ message: "Not found User with id " + id });
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

  await User.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + id,
        });
      } else {
        if (req.body.createdAt) {
          return res.status(400).send({
            message: "Creation Date cannot be updated!",
          });
        }
        res.send({ message: "User was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating User with id=${id}`,
      });
    });
});

exports.delete = catchAsync(async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + id,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
});

exports.findByRole = catchAsync(async (req, res, next) => {
  const role = req.params.role;

  await User.findOne({ "roles.role": { $elemMatch: { name: role } } }).then(
    (doc) => {
      if (!doc)
        res.status(404).send({ message: "Not found User with role " + role });
      else res.send(doc);
    }
  );
});

const findUserByAction = catchAsync(async (req, res, next) => {
  const action = req.query.action;

  let actionDoc;
  let roles = [];
  let users = [];
  await Action.findOne({ name: action }).then((doc) => {
    if (!doc)
      res.status(404).send({ message: "Not found action with this name!" });
    else {
      actionDoc = doc;
      roles = actionDoc.roles;
    }
  });
  await User.find({
    roles: { $in: roles },
  }).then((doc) => {
    if (doc) users.push(doc);
  });

  res.send(users);
});
