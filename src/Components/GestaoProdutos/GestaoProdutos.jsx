import React from "react";

import Categorias from './Categorias/Categorias';
import Produtos from "./Produtos/Produtos";
import UnidadesMedidas from "./UnidadesMedidas/UnidadesMedidas";

import styles from './Produtos/Produtos.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const GestaoProdutos = () => {

  return (
    <div>
      <div className={styles.NavOption}>
        <span className={styles.SpanScroll}>Navegação: </span>
        <button className={styles.buttonScroll}><a className={styles.linkScroll} href="#section1">Categorias</a></button>
        <button className={styles.buttonScroll}><a className={styles.linkScroll} href="#section2">Unidade de Medidas</a></button>
        <button className={styles.buttonScroll}><a className={styles.linkScroll} href="#section3">Produtos</a></button>
      </div>
      <div id="section1">
        <Categorias />
      </div>
      <div id="section2">
        <UnidadesMedidas />
      </div>
      <div id="section3" className={styles.adminPageContainer}>
        <Produtos />
      </div>
    </div>
  );
};

export default GestaoProdutos;
