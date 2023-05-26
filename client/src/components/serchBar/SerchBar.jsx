import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styled from "./SercheBar.module.css";
import { getRecipesName } from "../../redux/action";

const SerchBar = ({ serchN }) => {
  const dispatch = useDispatch(); // depatch de la action y seteamos (E.L)
  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    serchN();
    dispatch(getRecipesName(name));
  };

  return (
    <div className={styled.conteiner}>
        <section>
          <button
            className={styled.Boton}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Search
          </button>
          <form className={styled.form}>
            <div className={styled.autoComplete}>
              <input
                className={styled.Boton2}
                placeholder="Search"
                type="text"
                onChange={handleChange}
                value={name}
              />
            </div>
          </form>
        </section>
      </div>
  );
};

export default SerchBar;
