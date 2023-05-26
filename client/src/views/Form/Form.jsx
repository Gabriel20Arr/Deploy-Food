import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { postRecipesForm, getDiets } from "../../redux/action";
import Step from "./Step/Step";
import { validate } from "../../hooks/validation/validate.js";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const getDiet = useSelector((state) => state.getDiet);
  const copy = useSelector((state) => state.copyAllRecipes);

  const [input, setInput] = useState({
    title: "",
    image: "",
    summary: "",
    health_score: '',
    steps: [],
    diets: [],
    numSteps: 1,
  });

  const [error, setError] = useState({
    title: "requerido",
    summary: "requerido",
    image: "requerido",
    health_score: "requerido",
    steps: "",
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  // seteamos el estado
  function handlerChange(e) {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
    setError(validate({ ...input, [name]: value }, copy));
  }

  // recibos las diets
  function handlerDiets(e) {
    const { value, checked } = e.target;

    if (!checked) {
      setInput({
        ...input,
        diets: input.diets.filter((diet) => diet !== Number(value)),
      });
    } else if (input.diets.length >= 4) {
      alert("Select a maximum of 4 diets");
    } else {
      setInput({
        ...input,
        diets: [...input.diets, +value],
      });
    }
  }

  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(postRecipesForm(input));
    setInput({
      title: "",
      image: "",
      summary: "",
      health_score: '',
      steps: [],
      numSteps: 1,
      diets: [],
    });
  }

  const handlerSteps = (stepsNum) => {
    const steps = [];
    for (let i = 0; i < stepsNum; i++) {
      const input = (
        <div key={i}>
          <div className={style.stepssCount}>
            <label htmlFor="" className={style.stepss}>{`Step ${i + 1}`}: </label>
          </div>
          <Step cantidad={cantidad} steps={addSteps} id={i + 1} />
        </div>
      );

      steps.push(input);
    }
    return steps;
  };

  const addSteps = (obj) => {
    return setInput({ ...input, steps: [...input.steps, obj] });
  };

  const cantidad = (handler) => {
    return (
      <div>
        <select name="" id="" defaultValue={1} onChange={handler}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    );
  };

  const handlerNumSteps = (e) => {
    const { value } = e.target;
    return setInput({ ...input, numSteps: value });
  };

  return (
    <div className={style.container0}>
      <h1 className={style.title}>Formulario de receta</h1>
      <form className={style.container} onSubmit={(e) => handlerSubmit(e)}>
      <div className={style.container2}>
        <div className={style.container2_0}>

          <label className={style.label}>Title</label>
          <input
            type="text"
            value={input.title}
            name="title"
            onChange={handlerChange}
          />
          <p>{error.title ? error.title : ""}</p>

          <label className={style.label}>Summary</label>
          <textarea
            value={input.summary}
            name="summary"
            onChange={handlerChange}
          ></textarea>
          <p>{error.summary ? error.summary : ""}</p>

          <label className={style.label}>Health Score</label>
          <input
            type="text"
            value={input.health_score}
            name="health_score"
            onChange={handlerChange}
          />
          <p>{error.health_score ? error.health_score : ""}</p>

          <label className={style.label}>Image</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={handlerChange}
            placeholder="Entry URL from image"
          ></input>
          <p>{error.image ? error.image : ""}</p>
        </div>
      </div>

      <div className={style.container3}>
          <label className={style.step}>steps</label>
          <div>
            {cantidad(handlerNumSteps)}
            <span>
              {handlerSteps(input.numSteps)}
            </span>
          </div>

          <div>
            <div className={style.dropdown}>
              <button type="button" className={style.Bdiets}>
                Tipos de dieta
              </button>
              <div className={style.dropdown_content}>
                {getDiet &&
                  getDiet.map((diet, index) => (
                    <label className={style.checkbox} key={index}>
                      <input
                        type="checkbox"
                        value={index + 1}
                        checked={input.diets.includes(index + 1)}
                        onChange={handlerDiets}
                      />
                      <span className={style.dietC}>
                        {diet}
                      </span>
                    </label>
                  ))}
              </div>
            </div>
          </div>

      </div>

        <div className={style.createCont}>
          <button className={style.create} type="submit">
            Create
          </button>
        </div>  

      </form>

        <div className={style.back}>
        <Link to={"/home"} style={{color: 'inherit',
    textDecoration: 'none'}} >
          <button className={style.backB} >Back</button>
        </Link>
        </div>

    </div>
  );
};

export default Form;
