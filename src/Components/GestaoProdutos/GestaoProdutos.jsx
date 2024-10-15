import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './GestaoProdutos.module.css';
import axios from "axios";

const GestaoProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState({}); // Armazena categorias

  const handleEdit = (id) => {
    console.log(`Editar produto ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Excluir produto ${id}`);
  };

  const fetchProdutos = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}Produto`);
      console.log(data);
      setProdutos(data);
      
      // Obter categorias em paralelo
      const categoriasData = {};
      await Promise.all(data.map(async (produto) => {
        if (!categoriasData[produto.idCategoria]) {
          const categoriaResponse = await axios.get(`${import.meta.env.VITE_API_URL}Categoria/${produto.idCategoria}`);
          categoriasData[produto.idCategoria] = categoriaResponse.data.nome;
        }
      }));
      
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
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
                <td>{categorias[produto.idCategoria] || 'Carregando...'}</td> {/* Exibe a categoria ou uma mensagem de carregamento */}
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
  );
};

export default GestaoProdutos;
