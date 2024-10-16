import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './GestaoProdutos.module.css';
import axios from "axios";
import GestaoCategorias from './GestaoCategorias'; // Importação do componente de categorias

const GestaoProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca

  // Função para buscar produtos
  const fetchProdutos = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}Produto`);
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Função para buscar categorias
  const fetchCategorias = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}Categoria`);
      const categoriasMap = data.reduce((acc, categoria) => {
        acc[categoria.id] = categoria.nome;
        return acc;
      }, {});
      setCategorias(categoriasMap);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
  }, []);

  // Função para editar produto
  const handleEdit = (id) => {
    console.log(`Editar item ${id}`);
  };

  // Função para deletar produto
  const handleDelete = (id) => {
    console.log(`Excluir item ${id}`);
  };

  // Função para filtrar os produtos com base no termo de busca
  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtra por nome
    (categorias[produto.idCategoria] && categorias[produto.idCategoria].toLowerCase().includes(searchTerm.toLowerCase())) // Filtra por categoria
  );

  return (
    <div>
      {/* Gestão de Produtos */}
      <div id="section2" className={styles.adminPageContainer}>
        <div className={styles.header}>
          <h2>Gestão de produtos</h2>
          <button className={styles.cadastrarButton}>Cadastrar</button>
        </div>

        {/* Barra de título */}
        <div className={styles.barraTitulo}>
          Lista de produtos
        </div>

        {/* Barra de filtro */}
        <span
          className="navbar navbar-expand-xxxl sticky-top d-flex justify-content-center align-items-baseline"
          id={styles.filtroPesquisa1}
        >
          <form className="d-flex" id={styles.TamanhoFormPesquisa} onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              onChange={(event) => setSearchTerm(event.target.value)}
              value={searchTerm}
              className="form-control flex-grow-1"
              placeholder="Busque por Nome/Categoria"
              aria-label="Search"
              id={styles.filtroPesquisa}
            />
            <button className={styles.bgFiltro} type="submit">
              <i className="bi bi-search" id={styles.corPesquisa}></i>
            </button>
          </form>
        </span>

        {filteredProdutos.length > 0 ? (
          <Table bordered hover className={styles.userTable}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>Status</th>
                <th>Nome</th>
                <th className={styles.MobileOcult}>Categoria</th>
                <th className={styles.MobileOcult}>Estoque</th>
                <th className={styles.MobileOcult}>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProdutos.map((produto) => (
                <tr key={produto.id}>
                  <td>
                    {produto.status ? (
                      <i className="bi bi-toggle-on" id={styles.ativo}></i>
                    ) : (
                      <i className="bi bi-toggle-off" id={styles.inativo}></i>
                    )}
                  </td>
                  <td>{produto.nome}</td>
                  <td className={styles.MobileOcult}>{categorias[produto.idCategoria] || 'Carregando...'}</td>
                  <td className={styles.MobileOcult}>{produto.estoque}</td>
                  <td className={styles.MobileOcult}>{produto.preco.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => handleEdit(produto.id)}
                      className={styles.actionButton}
                    >
                      <i className="bi bi-info-square" id={styles.editIcon}></i>
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => handleDelete(produto.id)}
                      className={styles.actionButton}
                    >
                      <i className="bi bi-trash" id={styles.deleteIcon}></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className={styles.msgVazia}>Nenhum produto encontrado.</div>
        )}
      </div>
    </div>
  );
};

export default GestaoProdutos;