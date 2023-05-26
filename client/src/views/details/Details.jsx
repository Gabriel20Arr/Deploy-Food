import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getRecipesDetail, cleanDetail } from "../../redux/action";
import style from "./detail.module.css";

const Details = () => {
  const dispatch = useDispatch();
  const DetailRecipes = useSelector((state) => state.DetailRecipes);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipesDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [id]);
  const { title, image, summary, healthScore, steps, diets } = DetailRecipes;
  return (
    <div className={style.cont}>
      <div className={style.bCount}>
        <Link to={'/home'} style={{textDecoration: 'none'}}>
          <button className={style.b}>
            Back
          </button>
        </Link>
      </div>
      <div className={style.cont2}>

      <div className={style.titleC}>
        <h2 className={style.title}>{title}</h2>
      </div>
        
      <div className={style.imageC}>
        <img src={image} alt="" className={style.image} />
      </div>
        
        <h3 className={style.summary}>
        <h2 className={style.summary1}>Summary</h2>
          {" "}
          <span dangerouslySetInnerHTML={{ __html: summary }} />{" "}
        </h3>

        <h3 className={style.score}> HealthScore: {healthScore}</h3>

        <div className={style.steps}>
        <h2 className={style.stepsTitle}>Steps</h2>
          {steps ? (
            <div>
              {steps.map((step, index) => (
                <div key={index}>
                  <h3 className={style.titleSteps}>Step {index + 1}</h3>
                  <p>{step.step}</p>

                  <h3 className={style.titleSteps}>Ingredient</h3>
                  <ul className={style.conutSteps}>
                    {step.ingredients.map((ingredient, ingredientIndex) => (
                      <li key={ingredientIndex}>
                        {ingredient.name ? ingredient.name : ingredient}
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className={style.titleSteps}>Equipment</h3>
                  <ul className={style.conutSteps}>
                    {step.equipments.map((equipment, equipmentIndex) => (
                      <li key={equipmentIndex}>
                        {equipment.name ? equipment.name : equipment}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className={style.diets}>
          <h3 className={style.dietsTypes} >Types Of Diets</h3>
            <h4 >
              <ol>{diets && diets.join(' - ')}</ol>
            </h4>
        </div>

      </div>
    </div>
  );
};

export default Details;
