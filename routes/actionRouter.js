const express = require("express");
const actionController = require("../controllers/actionController");

const router = express.Router();

router.route("/").get(actionController.findAll);

module.exports = router;
