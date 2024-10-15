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
      <div className={styles.adminPageContainer}>
        <div className={styles.header}>
          <h2>Gestão de produtos</h2>
          <button className={styles.cadastrarButton}>Cadastrar</button>
        </div>
        <div className={styles.barraTitulo}>Lista de produtos</div>
        {produtos.length > 0 ? (
          <Table bordered hover className={styles.userTable}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Estoque</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.nome}</td>
                  <td>{categorias[produto.idCategoria] || 'Carregando...'}</td>
                  <td>{produto.estoque}</td>
                  <td>{produto.preco.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => handleEdit(produto.id)}
                      className={styles.actionButton}
                    >
                      <i className="bi bi-pencil-square" id={styles.editIcon}></i>
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

      {/* Componente de Gestão de Categorias */}
      <GestaoCategorias handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default GestaoProdutos;
