import React from "react";
import { useDispatch } from "react-redux";
import { filterByDiet, filterByOrigen, orders } from "../../redux/action";

const FiltroDiets = ({filterD}) => {
  const dispatch = useDispatch();

  const filterDiet = (e) => {
    dispatch(filterByDiet(e.target.value));
    filterD()
  };

  const filterOrigen = (e) => {
    dispatch(filterByOrigen(e.target.value));
  };

  const order = (e) => {
    dispatch(orders(e.target.value));
  };


  return (
    <div>
      <label>Filter Diets</label>
      <select defaultValue="" onChange={(e) => filterDiet(e)}>
        <option disabled value="" hidden></option>
        <option value="All">All</option>
        <option value="gluten free">gluten free</option>
        <option value="dairy free">dairy free</option>
        <option value="lacto ovo vegetarian">vegetarian</option>
        <option value="vegan">vegan</option>
        <option value="paleolithic">paleolithic</option>
        <option value="primal">primal</option>
        <option value="whole 30">whole 30</option>
        <option value="pescatarian">pescatarian</option>
        <option value="ketogenic">ketogenic</option>
        <option value="fodmap friendly">fodmap friendly</option>
      </select>

      <label style={{ margin: "0px 10px" }}>Filter Origen</label>
      <select defaultValue="" onChange={(e) => filterOrigen(e)}>
        <option disabled hidden value=""></option>
        <option value="All">All</option>
        <option value="bdd">Data Base</option>
        <option value="api">Api</option>
      </select>

      <label style={{ margin: "0px 10px" }}>Order</label>
      <select defaultValue="" onChange={(e) => order(e)}>
        <option disabled hidden value=""></option>
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="healthier2">healthier</option>
        <option value="Less_healthy">Less healthy</option>
      </select>
    </div>
  );
};

export default FiltroDiets;
