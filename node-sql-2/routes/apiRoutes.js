const express = require("express");
const router = express.Router();
const db = require("../models");
const verifyToken = require("../middleware/Authmiddleware");
const jwt = require('jsonwebtoken');

// For Getting all todo values
router.get("/alltodo", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_SECRET_KEY, (err) => {
    if(err)
    {
      res.status(403).send({message: "Invalid Token!"})
    }
    else
    {
      db.Todo.findAll().then((todos) => res.send(todos));
    }
  })

});

// Creating New Todo
router.post("/newtodo", (req, res) => {
  db.Todo.create({
    text: req.body.text,
  }).then((submitdata) => res.send(submitdata));
});

// Getting Todos By ID
router.get("/todobyid/:id", (req, res) => {
  db.Todo.findAll({
    where: {
      id: req.params.id,
    },
  }).then((todofound) => res.send(todofound));
});

// Delete Todo by ID
router.delete("/delete/:id", (req, res) => {
  db.Todo.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.send("Deleted Successfully!"));
});

// Edit Todo by ID
router.put("/editTodo", (req, res) => {
  db.Todo.update(
    { text: req.body.text },
    {
      where: {
        id: req.body.id,
      },
    }
  ).then(() => res.send("Edited Successfully!"));
});
module.exports = router;
