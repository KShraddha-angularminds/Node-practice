const mongoose = require("mongoose");

const empSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hobbies: [
    {
      type: String,
      required: true,
    },
  ],
  test: {
    t1: {
      type: String,
    },
    t2: [
      {
        type: String,
      },
    ],
  },
});

module.exports = mongoose.model("Employee", empSchema);
