const { Router } = require('express');

const getDiet = require("../controllers/Diets");

const dietsRouter = Router();

dietsRouter.get("/", getDiet)


module.exports = dietsRouter;
