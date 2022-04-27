const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

//register
router.post("/register", async (req, res) => {
  //validate user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check email exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const Saveduser = await user.save();
    res.send(Saveduser);
  } catch (err) {
    console.log(err);
    res.send({ message: err });
  }
});

//login

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //email validation
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is invalid");

  //validate password
  const passExist = await bcrypt.compare(req.body.password, user.password);
  if (!passExist) return res.status(400).send(" password is invalid");

  //generate auth token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token);
  res.send(token);
});

module.exports = router;
