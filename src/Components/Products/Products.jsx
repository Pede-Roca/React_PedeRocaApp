import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Products.module.css";
import SideBar from "../Sidebar/SideBar";
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthValue } from "../../context/AuthContext";
import { useAuth } from "../Usuario/useAuth";
import { registrarProdutoFavoritoNoBackend, desregistrarProdutoFavoritoNoBackend } from "../../services/produto.service"

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const lowerCaseBusca = searchTerm.toLowerCase();
  const produtosCollectionRef = collection(db, 'tb_produtos')
  const [produtos, setProdutos] = useState([]);
  const { user } = useAuthValue();
  const { backendUserId } = useAuth();

  const handleFavorito = async (produto) => {

    if(produto.favorito){
      try {
        const data = await desregistrarProdutoFavoritoNoBackend(produto.idFavorito);
        if(data){
          const produtosAtualizados = produtos.map(item => 
            item.id === produto.id ? { ...item, favorito: false } : item
          );
          setProdutos(produtosAtualizados);
        }
      } catch (error) {
        console.error("Erro ao desregistrar o produto favorito:", error);
      }
    } else {
      const produtoFavorito = {
          idProduto: produto.id,
          idUsuario: backendUserId
      };
      try {
        const data = await registrarProdutoFavoritoNoBackend(produtoFavorito);
        if(data){
          const produtosAtualizados = produtos.map(item => 
            item.id === produto.id ? { ...item, favorito: true, idFavorito: data.id } : item
          );
          setProdutos(produtosAtualizados);
        }
      } catch (error) {
        console.error("Erro ao registrar o produto favorito:", error);
      }
    }
  };
  
  const handleSearch = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(lowerCaseBusca) ||
      produto.tipo_produto.toLowerCase().includes(lowerCaseBusca)
  );

  useEffect(() => {
    const getProdutos = async () => {
      const data = await getDocs(produtosCollectionRef)
      setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getProdutos()
  },[])

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
          (produtos, i) =>
            produtos.ativo && (
              <div key={produtos.id + i} className={styles.geralCard}>
                <div className={styles.posicaoPreco}>
                  <span id="precoProduto">
                    R$ {produtos.preco_unitario.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                {user &&
                <div className={styles.posicaoFavorito}>
                  <button id={styles.boxFavoritoF1} onClick={() => handleFavorito(produtos)}>
                    {produtos.favorito ? (
                    <i className="bi bi-heart-fill" id={styles.tamanhoFavorito}></i>
                    ):(
                      <i className="bi bi-heart" id={styles.tamanhoFavorito}></i>
                    )}
                  </button>
                </div>
                }
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
