const express = require("express");
const router = express.Router();
const db = require("../models");

// Creating New Employee
router.post("/create-emp", async (req, res) => {
  const mailcheck = await db.Employees.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (mailcheck === null) {
    const employees = db.Employees.create({
      empName: req.body.empName,
      designation: req.body.designation,
      email: req.body.email,
      phone: req.body.phone,
      salary: req.body.salary,
    });
    res
      .status(200)
      .json({ success: true, message: "Employee Registered Successfully" });
  } else {
    res
      .status(404)
      .send({ success: false, error: "Email already exists in our Database!" });
  }
});

// For Getting All Employees
router.get("/all-emp", async (req, res) => {
  await db.Employees.findAll().then((emp) => res.send(emp));
});

// For Getting Employee By ID
router.get("/emp-by-id/:id", async (req, res) => {
  const empbyId = await db.Employees.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (empbyId === null) {
    res
      .status(404)
      .send({ success: false, error: "No employee found for the given id!" });
  } else {
    res.json({ success: "true", data: empbyId });
  }
});

// For Deleting Employee
router.delete("/delete-emp/:id", async (req, res) => {
  const DeleteEmployee = await db.Employees.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (DeleteEmployee === 0) {
    res
      .status(404)
      .send({ success: false, error: "No employee found for the given id!" });
  } else {
    res.json({
      success: "true",
      message: "Successfully Deleted!",
      data: DeleteEmployee,
    });
  }
});

// For Editing Specific Employee
router.put("/edit-emp/:id", async (req, res) => {
  const myID = await db.Employees.findOne({
    where: {
      id: req.params.id,
    },
  });

  const mailscheck = await db.Employees.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (myID === null) {
    res
      .status(404)
      .send({ success: false, error: "No employee found for the given id!" });
  } else {
    var EditEmployee = await db.Employees.update(
      {
        empName: req.body.empName,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
     res.jsonp({success: true, message: "Employee Information Updated!", data: EditEmployee})
  }
});

module.exports = router;
