import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './GestaoProdutos.module.css';
import axios from "axios";
import CategoriaInfoModal from "./CategoriaInfoModal";

const GestaoCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  const fetchCategorias = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}Categoria`);
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  };

  const handleInfo = (id) => {
    const categoria = categorias.find(categoria => categoria.id === id);
    setSelectedCategoria(categoria);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      confirm("Deseja realmente excluir a categoria?") && await axios.delete(`${import.meta.env.VITE_API_URL}Categoria/${id}`);
      alert("Categoria excluída com sucesso!");
      fetchCategorias();
    } catch (error) {
      console.error("Erro ao excluir a categoria:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchCategorias();
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
      {categorias.length > 0 ? (
        <Table bordered hover className={styles.userTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(categoria => (
              <tr key={categoria.id}>
                <td>{categoria.nome}</td><td>
                  <Button
                    variant="light"
                    onClick={() => handleInfo(categoria.id)}
                    className={styles.actionButton}
                  >
                    <i className="bi bi-pencil-square" id={styles.editIcon}></i>
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => handleDelete(categoria.id)}
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

      {selectedCategoria && (
        <CategoriaInfoModal
          show={showModal}
          handleClose={handleCloseModal}
          categoria={selectedCategoria}
        />
      )}
    </div>
  );
};

export default GestaoCategorias;
