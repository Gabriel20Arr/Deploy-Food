import {
  GET_RECIPES,
  RECIPE_NAME,
  RECIPE_DETAIL,
  POST_RECIPE,
  GET_DIETS,
  CLEAN_DETAIL,
  FILTER_DIETS,
  FILTER_ORIGEN,
  ORDER_A_Z,
  ORDER_SCORE,
} from "./actionType";

let initialState = {
  allRecipes: [],
  copyAllRecipes: [],
  nameRecipes: [],
  DetailRecipes: {},
  getDiet: [],
  copyName: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        copyAllRecipes: action.payload,
        copyName: action.payload,
      };

    case RECIPE_NAME:
      return {
        ...state,
        allRecipes: action.payload,
        copyName: action.payload,
      };

    case RECIPE_DETAIL:
      return {
        ...state,
        DetailRecipes: action.payload,
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        DetailRecipes: {},
      };

    case POST_RECIPE:
      // retorna una copia del estado
      return {
        ...state,
      };

    case GET_DIETS:
      //? retorna una copia del estado
      return {
        ...state,
        getDiet: action.payload,
      };

    case FILTER_DIETS:
      const Alldiets = state.copyName;
      
      const filtersDiets =
        action.payload === "All"
          ? Alldiets
          : Alldiets.filter((el) => el.diets.includes(action.payload));
          
      return {
        ...state,
        allRecipes: filtersDiets,
      };

    case FILTER_ORIGEN:
      const origen = state.copyName;
      const origenBd = origen.filter((el) => isNaN(el.id));
      const origenApi = origen.filter((el) => Number(el.id));

      if (action.payload === "All") {
        return { ...state, allRecipes: origen };
      }

      return {
        ...state,
        allRecipes: action.payload === "api" ? origenApi : origenBd,
      };

    case ORDER_A_Z:
      const ascendente = [...state.allRecipes];
      ascendente.sort((a, b) => a.title.localeCompare(b.title));

      const descendente = [...state.allRecipes];
      descendente.sort((a, b) => b.title.localeCompare(a.title));
      return {
        ...state,
        allRecipes: action.payload === "a-z" ? ascendente : descendente,
      };

    case ORDER_SCORE:
      const sortedRecipes = [...state.allRecipes];

      if (action.payload === "healthier2") {
        sortedRecipes.sort((a, b) => b.healthScore - a.healthScore);
      } else {
        sortedRecipes.sort((a, b) => a.healthScore - b.healthScore);
      }

      return {
        ...state,
        allRecipes: sortedRecipes,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
