const router = require("express").Router();
const verify = require("./verifyToken");
const Employ = require("../models/employ");

//add employee
router.post("/addEmploy", verify, async (req, res) => {
  const employee = new Employ({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    address: req.body.address,
    state: req.body.state,
    city: req.body.city,
    date: req.body.date,
    gender: req.body.gender,
    password: req.body.password,
    hobbies: req.body.hobbies,
    com_skill: req.body.com_skill,
  });
  try {
    const employ = await employee.save();
    res.send(employ);
  } catch (err) {
    res.send({ meassage: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const employees = await Employ.find();
    res.send(employees);
  } catch (err) {
    res.send({ message: err });
  }
});

router.get("/:empId", async (req, res) => {
  try {
    const emp = await Employ.findById(req.params.empId);
    res.send(emp);
  } catch (err) {
    res.send({ message: err });
  }
});

router.put("/:empId", verify, async (req, res) => {
  try {
    const updatedEmp = await Employ.updateOne(
      { _id: req.params.empId },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          address: req.body.address,
          state: req.body.state,
          city: req.body.city,
          date: req.body.date,
          gender: req.body.gender,
          password: req.body.password,
          hobbies: req.body.hobbies,
          com_skill: req.body.com_skill,
        },
      }
    );
    res.send(updatedEmp);
  } catch (err) {
    res.send({ meassage: err });
  }
});

router.delete("/:empId", verify, async (req, res) => {
  try {
    const removeEmp = await Employ.deleteOne({ _id: req.params.empId });
    res.send(removeEmp);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
