import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";
import logoImage from "../../utils/food-logo-2.webp";


const Nav = () => {
  return (
    <div className={style.cont}>
    
      <img src={logoImage} alt="" className={style.logo}/>

      <NavLink
        to="created"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <span className={style.boton} >Created</span>
      </NavLink>

    </div>
  );
};

export default Nav;
