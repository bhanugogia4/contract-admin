const express = require("express");
const actionController = require("../controllers/actionController");
const { route } = require("./roleRouter");

const router = express.Router();

router.route("/").get(actionController.findAll);

module.exports = router;
