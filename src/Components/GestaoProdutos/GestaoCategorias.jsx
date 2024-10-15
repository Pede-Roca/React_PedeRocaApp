import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './GestaoProdutos.module.css';
import axios from "axios";

const GestaoCategorias = ({ handleEdit, handleDelete }) => {
  const [categorias, setCategorias] = useState({});

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
    fetchCategorias();
  }, []);

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.header}>
        <h2>Gestão de Categorias</h2>
        <button className={styles.cadastrarButton}>Cadastrar</button>
      </div>
      <div className={styles.barraTitulo}>Lista de Categorias</div>
      {Object.keys(categorias).length > 0 ? (
        <Table bordered hover className={styles.userTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Id</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(categorias).map(([id, nome]) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{nome}</td>
                <td>
                  <Button
                    variant="light"
                    onClick={() => handleEdit(id)}
                    className={styles.actionButton}
                  >
                    <i className="bi bi-pencil-square" id={styles.editIcon}></i>
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => handleDelete(id)}
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
        <div className={styles.msgVazia}>A lista de categorias está vazia.</div>
      )}
    </div>
  );
};

export default GestaoCategorias;
