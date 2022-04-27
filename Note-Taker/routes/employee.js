const router = require("express").Router();
const employee = require("../models/employee");
const Employee = require("../models/employee");

//add employee
router.post("/addEmployee", async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    hobbies: req.body.hobbies,
    test: req.body.test,
  });
  try {
    const empl = await employee.save();
    res.send(empl);
  } catch (err) {
    res.send({ meassage: err });
  }
});

//get all employee
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (err) {
    res.send({ message: err });
  }
});

//get a partiular employee
router.get("/:empId", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.empId);
    res.send(emp);
  } catch (err) {
    res.send({ message: err });
  }
});

//update employee
router.patch("/:empId", async (req, res) => {
  try {
    const updatedEmp = await Employee.findByIdAndUpdate(
      { _id: req.params.empId },
      {
        $set: {
          "test.t1": req.body.t1,
        },
      }
    );
    res.send(updatedEmp);
  } catch (err) {
    res.send({ meassage: err });
  }
});

//delete aparticular employee
router.delete("/:empId", async (req, res) => {
  try {
    const removeEmp = await Employee.remove({ _id: req.params.empId });
    res.json(removeEmp);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
