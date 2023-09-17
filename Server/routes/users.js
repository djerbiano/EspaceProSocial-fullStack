const express = require("express");
const controller = require("../controllers/usersController");
const virifyToken = require("../middlewares/virifyToken");
const mult = require("../middlewares/multer");
const route = express.Router();

//Get all users
route.get("/", controller.getAll);

//Get one user
route.get("/:id", controller.getOne);

//Update user
route.patch("/:id", virifyToken, mult, controller.updateUser);

//Delete user
route.delete("/:id", virifyToken, controller.deleteUser);

module.exports = route;
