const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      unique: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
  },
  { versionKey: false }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
