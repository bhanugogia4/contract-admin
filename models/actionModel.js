const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActionSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      unique: true,
    },
    description: {
      type: String,
      required: "Description is required",
    },

    // ----- NOT STORING ROLES WHILE CREATING ACTIONS -----

    // roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
  },
  { versionKey: false }
);

const Action = mongoose.model("action", ActionSchema);

module.exports = Action;
