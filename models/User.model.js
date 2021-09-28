// Iteration #1
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    lastName: String,
    passwordHash: {
      type: String,
      required: [true, "Ingresar contraseña válida"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    roles: {
      type: [String],
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
