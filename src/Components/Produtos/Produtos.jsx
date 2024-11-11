import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Produtos.module.css";
import SideBar from "../Sidebar/SideBar";
import Produto from "./Produto/Produto";
import { buscarProdutosNoBackend, buscarCategoriasNoBackend, buscarProdutosFavoritosPorUsuarioNoBackend } from '../../services';
import CustomDropdown from "./Produto/CustomDropdown";

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["Todas as Categorias"]);
  const lowerCaseBusca = searchTerm.toLowerCase();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const searchProductsInBackend = async () => {
    const produtos = await buscarProdutosNoBackend();
    let user = JSON.parse(sessionStorage.getItem('user'));

    if (user) {
      const produtosFavoritos = await buscarProdutosFavoritosPorUsuarioNoBackend();

      if (produtosFavoritos.length === 0) {
        produtos.forEach(produto => {
          produto.favorito = false;
          produto.idFavorito = null;
        });
        setProdutos(produtos);
        return;
      }

      produtos.forEach(produto => {
        const produtoFavorito = produtosFavoritos.find(produtoFavorito => produtoFavorito.idProduto === produto.id);
        if (produtoFavorito) {
          produto.favorito = true;
          produto.idFavorito = produtoFavorito.id;
        } else {
          produto.favorito = false;
          produto.idFavorito = null;
        }
      });
    }

    setProdutos(produtos);
  };

  const searchCategoriesInBackend = async () => {
    const categorias = await buscarCategoriasNoBackend();
    setCategorias(categorias);
  };

  const handleSearch = () => {
    return produtos.filter((produto) => {
      const produtoNome = produto.nome.toLowerCase();
      const categoriaProduto = produto.idCategoria;

      const matchesSearchTerm = produtoNome.includes(lowerCaseBusca);

      const matchesCategory =
        selectedCategories.includes("Todas as Categorias") ||
        selectedCategories.includes(categoriaProduto);

      return matchesSearchTerm && matchesCategory;
    });
  };

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
        <CustomDropdown
            categorias={categorias}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <input
            type="text"
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
            className="form-control flex-grow-1"
            placeholder="O que você procura? Busque por Produto"
            aria-label="Search"
            id={styles.filtroPesquisa}
          />
        </form>
        <SideBar />
      </span>

      <section
        className="px-2 py-2 d-flex flex-wrap gap-3 justify-content-center align-content-center"
        id="CartaoProduto"
      >
        {handleSearch().map((produto, i) =>
          produto.status && (
            <Produto key={i} produto={produto} i={i} setProductInCart={setProdutos} updateProductList={searchProductsInBackend} />
          )
        )}
      </section>
      <br />
      <br />
    </>
  );
};

export default Produtos;