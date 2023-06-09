import axios from "axios";
import {
  GET_RECIPES,
  RECIPE_NAME,
  RECIPE_DETAIL,
  POST_RECIPE,
  GET_DIETS,
  CLEAN_DETAIL,
  FILTER_DIETS,
  FILTER_ORIGEN,
  ORDER_SCORE,
  ORDER_A_Z,
} from "./actionType";

export function getRecipes() {
  return async function (dispatch) {
    try {
      const response = (await axios.get("/recipes")).data;

      dispatch({
        type: GET_RECIPES,
        payload: response,
      });
    } catch (error) {
      console.log(error);
    }
  };
}


export function getRecipesName(name) {
  return async function (dispatch) {
    try {
      const res = (
        await axios.get(`/recipes?title=${name}`)
      ).data;
      
      return dispatch({
        type: RECIPE_NAME,
        payload: res,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecipesDetail(id) {
  return async function (dispatch) {
    try {
      const res = (await axios.get(`/recipes/${id}`)).data;
      return dispatch({
        type: RECIPE_DETAIL,
        payload: res,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanDetail() {
  return {
    type: CLEAN_DETAIL,
  };
}


export function postRecipesForm(newRecipe) {
  return async function (dispatch) {
    try {
      const res = (await axios.post(`/recipes`, newRecipe))
        .data;
        alert('Recipe created successfully!');
      return dispatch({
        type: POST_RECIPE,
        payload: res,
      });
    } catch (error) {
      alert('Error creating recipe. Please try again.');
      console.log(error);
    }
  };
}


export function getDiets() {
  return async function (dispatch) {
    try {
      const res = (await axios(`/diets`)).data;
      
      return dispatch({
        type: GET_DIETS,
        payload: res,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByDiet(payload) {
  return {
    type: FILTER_DIETS,
    payload,
  };
}

export function filterByOrigen(payload) {
  return {
    type: FILTER_ORIGEN,
    payload,
  };
}

export function orders(payload) {
  return {
    type: (payload === "a-z" || payload === "z-a") ? ORDER_A_Z : ORDER_SCORE,
    payload,
  };
}
