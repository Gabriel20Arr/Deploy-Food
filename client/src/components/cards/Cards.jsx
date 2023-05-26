import React from "react";
import Card from "../card/Card";
import style from "./Cards.module.css";

const Cards = ({ allRecipes }) => {
  
  return (
    <div className={style.contt}>
      {allRecipes &&
        allRecipes.map((r, index) => <Card key={index} allRecipes={r} />)}
    </div>
  );
};

export default Cards;
