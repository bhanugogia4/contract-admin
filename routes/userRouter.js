const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Create an admin
// Get an admin details
// Edit permissions of an admin
// Delete an admin
// Get details of all the admins

router.route("/").get(userController.findAll).post(userController.create);
router
  .route("/:id")
  .get(userController.findOne)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
