import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Products.module.css";
import SideBar from "../Sidebar/SideBar";

const Products = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const lowerCaseBusca = searchTerm.toLowerCase();
  const handleSearch = props.list.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(lowerCaseBusca) ||
      produto.tipo_produto.toLowerCase().includes(lowerCaseBusca)
  );

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
            placeholder="O que vocÃª procura? Busque por Produto/Categoria"
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
          (produtos, i) =>
            produtos.ativo && (
              <div key={i} className={styles.geralCard}>
                <div className={styles.posicaoPreco}>
                  <span id="precoProduto">
                    R$ {produtos.preco_unitario.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className={styles.posicaoFavorito}>
                  <button id={styles.boxFavoritoF1}>
                    <i className="bi bi-heart" id={styles.tamanhoFavorito}></i>
                  </button>
                </div>
                <div className={styles.imagemVenda}>
                  <img
                    src={produtos.imagem}
                    alt={produtos.nome}
                    className={styles.tamanhoImgVenda}
                  />
                </div>
                <hr />
                <div id={styles.nomeProduto}>
                  <h5>{produtos.nome}</h5>
                  <p>
                    {produtos.descricao}
                    <br />
                    <span className="d-none">
                      Categoria: {produtos.tipo_produto}
                    </span>
                  </p>
                </div>
                <hr />
                <div className={styles.qtdTotalCompraCarrinho}>
                  <form
                    className="input-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <input
                      className="inputBorda"
                      id={styles.quantidadeProduto}
                      type="Number"
                      min="0"
                      name="quantidadeProduto"
                      placeholder="Qtd"
                    />
                    <button className="inputBorda" id={styles.btn_addcarrinho}>
                      <i className="bi bi-cart-plus">Adicionar</i>
                    </button>
                  </form>
                </div>
              </div>
            )
        )}
      </section>
      <br />
      <br />
    </>
  );
};

export default Products;
