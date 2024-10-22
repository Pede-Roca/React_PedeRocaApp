import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Produtos.module.css";
import SideBar from "../Sidebar/SideBar";
import Produto from "./Produto/Produto";
import { buscarProdutosNoBackend, buscarCategoriasNoBackend } from '../../services';

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const lowerCaseBusca = searchTerm.toLowerCase();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const searchProductsInBackend = async () => {
    const produtos = await buscarProdutosNoBackend();
    console.log(produtos);
    setProdutos(produtos);
  }

  const searchCategoriesInBackend = async () => {
    const categorias = await buscarCategoriasNoBackend();
    console.log(categorias);
    setCategorias(categorias);
  }

  const handleSearch = produtos.filter((produto) => {
    const produtoNome = produto.nome.toLowerCase();
    const categoriaNome = categorias.find(categoria => categoria.id === produto.idCategoria)?.nome.toLowerCase();
  
    return (
      produtoNome.includes(lowerCaseBusca) ||
      (categoriaNome && categoriaNome.includes(lowerCaseBusca))
    );
  });
  

  useEffect(() => {
    searchCategoriesInBackend();
    searchProductsInBackend();
  }, []);

  return (
    <>
      <span
        className="navbar navbar-expand-xxxl sticky-top d-flex justify-content-center align-items-baseline"
        id={styles.filtroPesquisa1}
      >
        <form className="d-flex" id={styles.TamanhoFormPesquisa}>
          <input
            type="text"
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
            className="form-control flex-grow-1"
            placeholder="O que você procura? Busque por Produto/Categoria"
            aria-label="Search"
            id={styles.filtroPesquisa}
          />
          <button className={styles.bgFiltro} type="submit">
            <i className="bi bi-search" id={styles.corPesquisa}></i>
          </button>
        </form>
        <SideBar />
      </span>
      <section
        className="px-2 py-2 d-flex flex-wrap gap-3 justify-content-center align-content-center"
        id="CartaoProduto"
      >
        {handleSearch.map(
          (produto, i) =>
            produto.status && (
              <Produto key={i} produto={produto} i={i} setProductInCart={setProdutos} />
            )
        )}
      </section>
      <br />
      <br />
    </>
  );
};

export default Produtos;
