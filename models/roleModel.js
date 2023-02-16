const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      unique: true,
    },
    actions: [{ type: Schema.Types.ObjectId, ref: "Action" }],
  },
  { versionKey: false }
);

const Role = mongoose.model("role", RoleSchema);

module.exports = Role;
