import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.conteiner}>
      <div className={style.cont}>
        <Link to="/home">
          <button className={style.buttonH} >
          <h1>
            Home
          </h1>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
