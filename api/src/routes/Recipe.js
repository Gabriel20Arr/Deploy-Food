const { Router } = require("express");

const {
  HrecipeDetail,
  HrecipeName,
  HrecipeCreate,
} = require("../handlers/HRecipes");

const recipesRouter = Router();

recipesRouter.get("/:id", HrecipeDetail);

recipesRouter.get("/", HrecipeName);

recipesRouter.post("/", HrecipeCreate);

module.exports = recipesRouter;
