const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const Types = mongoose.Schema.Types;

// Define user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: Types.String,
      required: true,
    },
    lastName: {
      type: Types.String,
      required: true,
    },
    email: {
      type: Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Types.String,
      required: true,
    },
    createdAt: {
      type: Types.Date,
      default: null,
    },
    updatedAt: {
      type: Types.Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("user", userSchema);
