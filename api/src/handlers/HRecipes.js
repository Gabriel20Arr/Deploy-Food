const {
  recipeDetail,
  recipeName,
  allRecipes,
  recipeCreate,
} = require("../controllers/Recipes");

const HrecipeName = async (req, res) => {
  const { title } = req.query;

  try {
    if (title) {
      const searchName = await recipeName(title);

      res.status(200).json(searchName);
    } else {
      const responseAll = await allRecipes();

      res.status(200).json(responseAll);
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const HrecipeDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const source = isNaN(id) ? "bdd" : "api";

    const response = await recipeDetail(id, source);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const HrecipeCreate = async (req, res) => {
  const { title, image, summary, health_score, steps, diets } = req.body;

  const newRecipes = await recipeCreate(
    title,
    image,
    summary,
    health_score,
    steps,
    diets
  );

  try {
    res.status(200).json(newRecipes);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

module.exports = { HrecipeDetail, HrecipeName, HrecipeCreate };
