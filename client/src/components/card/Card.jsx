import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ allRecipes }) => {
  const { id, title, image, diets, healthScore } = allRecipes;

  return (
    <div className={style.cont}>
      <Link to={`/detail/${id}`} style={{color: 'inherit',
    textDecoration: 'none'}}>
        <div>
          <h2 className={style.name}>{title}</h2>
        </div>
      </Link>
      <div>
        <img src={image} alt={title} className={style.img} />
      </div>
      <div className={style.score} >
        <h3> healthScore: {healthScore}</h3>
      </div>
        <h4>
          <ol className={style.diet}>
          {diets.join(' - ')}
          </ol>
        </h4>
    </div>
  );
};

export default Card;
