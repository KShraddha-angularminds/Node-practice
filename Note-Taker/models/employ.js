const mongoose = require("mongoose");

const employSchema = mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  address: String,
  state: String,
  city: String,
  date: String,
  gender: String,
  password: String,
  hobbies: [
    {
      type: String,
    },
  ],
  com_skill: String,
});

module.exports = mongoose.model("Employ", employSchema);
