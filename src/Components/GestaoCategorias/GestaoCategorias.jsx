import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './GestaoCategorias.module.css'
import axios from "axios";

const GestaoCategorias = () => {

  const [produtos, setProdutos] = useState([]);

  const handleEdit = (id) => {
    console.log(`Editar produtos ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Excluir produtos ${id}`);
  };

  const fetchProdutos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}Categoria`);
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <>
      <div className={styles.adminPageContainer}>
        <div className={styles.header}>
          <h2>Gestão de Categorias</h2>
          <button className={styles.cadastrarButton}>Cadastrar</button>
        </div>
        <div className={styles.barraTitulo}>Lista de Categorias</div>
        {produtos.length > 0 ? (
          <Table bordered hover className={styles.userTable}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>Id</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) =>
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
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
              )}
            </tbody>
          </Table>
        ) : (
          <div className={styles.msgVazia}>A lista de produtos está vazia.</div>
        )}
      </div>
    </>
  );
};

export default GestaoCategorias;
