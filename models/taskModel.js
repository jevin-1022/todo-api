const mongoose = require("mongoose");

const Types = mongoose.Schema.Types;

// Define user schema
const userSchema = new mongoose.Schema(
  {
    title: {
      type: Types.String,
      required: true,
    },
    description: {
      type: Types.String,
      default: null,
    },
    dueDate: {
      type: Types.Date,
      required: true,
    },
    status: {
      type: Types.String,
      enum: ["pending", "completed"],
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: 'users',
      required: true
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
    versionKey: false
  }
);

module.exports = mongoose.model("task", userSchema);
