const axios = require("axios");
require("dotenv").config();
const { Op } = require("sequelize");

const { URL, API_KEY_4 } = process.env;
const { Recipe, Diet } = require("../db");

// "https://api.spoonacular.com/recipes/complexSearch?number=5&apiKey= 8af1f809d79547a3806d69b529361658&addRecipeInformation=true"

const allRecipes = async () => {
  const infoApi = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY_4}&addRecipeInformation=true`
    )
  ).data;

  // const { diets, id, title, image, summary, healthScore, steps } = infoApi;
  const infoDB = await Recipe.findAll({ include: Diet });

  const resDb1 = infoDB.map((d) => {
    const { id, title, image, Diets, health_score } = d;
    const resD = Diets.map((j) => j.name);

    return { id, title, image, diets: resD, healthScore: health_score };
  });

  return [...resDb1.concat(infoApi.results)];
};

//? recipes ID
// https://api.spoonacular.com/recipes/1233/information&apiKey=8af1f809d79547a3806d69b529361658

const recipeDetail = async (id, source) => {
  if (source === "bdd") {
    const resBd = await Recipe.findByPk(id, { include: Diet });

    const { title, image, summary, healthScore, steps, Diets } = resBd;
    const aux = Diets.map((diet) => diet.name);

    let step = [];
    
    if (steps && steps.length > 0) {
      step = steps.map(({ step, ingredients, equipments }) => ({
        step,
        ingredients,
        equipments,
      }));
    }

    return { title, image, summary, healthScore, steps: step, diets: aux };
  } else {
    const resApi = await axios(
      `${URL}/${id}/information?apiKey=${API_KEY_4}&addRecipeInformation=true`
    );
    const { title, image, summary, healthScore, analyzedInstructions, diets } =
      resApi.data;

    let step2 = [];
    if ( analyzedInstructions[0].steps && analyzedInstructions[0].steps.length > 0) {
      step2 = analyzedInstructions[0].steps.map(
        ({ step, ingredients, equipment }) => ({
          step,
          ingredients,
          equipments: equipment,
        })
      );
    }

    return {
      id,
      title,
      image,
      summary,
      healthScore,
      steps: step2 ? step2 : "there are no steps",
      diets,
    };
  }
};


// `https://api.spoonacular.com/recipes/complexSearch?query=berry&apiKey=1731c0e5a2d04fa7a401c8fb75950de7`

const recipeName = async (title) => {
  const dbName = await Recipe.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
    include: Diet,
  });


  const resDb = dbName.map((d) => {
    const { id, title, image, Diets, health_score } = d;
    const resD = Diets.map((j) => j.name);

    return { id, title, image, diets: resD, healthScore: health_score };
  });

  const infoApii = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${title}&apiKey=${API_KEY_4}&addRecipeInformation=true&number=5`
    )
  ).data;

  return resDb.concat(infoApii.results);
};

const recipeCreate = async (
  title,
  image,
  summary,
  health_score,
  steps,
  diets
) => {
  const newRecipe = await Recipe.create({
    title,
    image,
    summary,
    health_score,
    steps,
  });

  if (diets) {
    await newRecipe.addDiet(diets);
  }

  return newRecipe;
};

module.exports = { recipeDetail, recipeName, allRecipes, recipeCreate };
