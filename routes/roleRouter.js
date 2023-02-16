const express = require("express");
const roleController = require("../controllers/roleController");

const router = express.Router();

// Create a role
// Get all roles
// Get a role by type
// Get a role by id
// Update a role
// Delete a role

router.route("/").get(roleController.findAll).post(roleController.create);
router
  .route("/:id")
  .get(roleController.findOne)
  .put(roleController.update)
  .delete(roleController.delete);

module.exports = router;
