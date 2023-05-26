import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cards from "../../components/cards/Cards";
import { getRecipes } from "../../redux/action";
import Pagination from "../pagination/Pagination";
import SerchBar from "../../components/serchBar/SerchBar";
import FiltroDiets from "../filtros/FiltroDiets";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentItems, setCurrentItems] = useState([]);

  function serchN() {
    return setCurrentPage(1);
  }
  
  function filterD() {
    return setCurrentPage(1);
  }

  const allRecipes = useSelector((state) => {
    const { allRecipes } = state;
    return allRecipes;
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allRecipes.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(currentItems);
  }, [allRecipes, currentPage, itemsPerPage]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handlerReset = () => {
    dispatch(getRecipes());
  };

  return (
    <div className={style.todo}>

       <div className={style.conteiner_filter}>
        <FiltroDiets  filterD={filterD}/>
      </div>

      <div className={style.count_B_rest} >
        <button className={style.Brest} onClick={handlerReset}>
          Refresh Page
        </button>
      </div>

      <div className={style.search}>
        <SerchBar serchN={serchN} />
      </div>

      <Cards allRecipes={currentItems} />

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        allRecipes={allRecipes.length}
        onPageChange={handlePageChange}
        paginado={paginado}
      />
    </div>
  );
};

export default Home;
