// Iteration #1
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    passwordHash: {
      type: String,
      required: [true, "Ingresar contraseña válida"],
    },
    email: {
      type: String,
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
