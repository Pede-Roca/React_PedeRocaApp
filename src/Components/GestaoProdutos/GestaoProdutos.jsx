import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './GestaoProdutos.module.css';
import axios from "axios";
import GestaoCategorias from './GestaoCategorias'; // Importação do componente de categorias

const GestaoProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState({});

  const handleEdit = (id) => {
    console.log(`Editar item ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Excluir item ${id}`);
  };

  const fetchProdutos = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}Produto`);
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

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

  return (
    <div>
      {/* Gestão de Produtos */}
      <div className={styles.NavOption}>
        <span className={styles.SpanScroll}>Navegação: </span>
        <button className={styles.buttonScroll}><a className={styles.linkScroll} href="#section1">Categorias</a></button>
        <button className={styles.buttonScroll}><a className={styles.linkScroll} href="#section2">Produtos</a></button>
      </div>
      <div id="section1">
        {/* Gestão de Categorias */}
        <GestaoCategorias />
      </div>
      <div id="section2" className={styles.adminPageContainer}>
        <div className={styles.header}>
          <h2>Gestão de produtos</h2>
          <button className={styles.cadastrarButton}>Cadastrar</button>
        </div>
        <div className={styles.barraTitulo}>Lista de produtos</div>
        {produtos.length > 0 ? (
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
              {produtos.map((produto) => (
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
          <div className={styles.msgVazia}>A lista de produtos está vazia.</div>
        )}
      </div>
    </div>
  );
};

export default GestaoProdutos;
