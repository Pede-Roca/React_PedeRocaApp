import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { buscarCategoriasNoBackend, deletarCategoriaNoBackend, atualizarCategoriaNoBackend, criarCategoriaNoBackend } from '../../../services';
import CategoriaInfoModal from "./CategoriaInfoModal";
import styles from '../Produtos/Produtos.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const GestaoCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchCategorias = async () => {
    try {
      const data = await buscarCategoriasNoBackend();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  };

  const handleInfo = (id) => {
    const categoria = categorias.find(categoria => categoria.id === id);
    setSelectedCategoria(categoria);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedCategoria(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      if (confirm("Deseja realmente excluir a categoria?")) {
        await deletarCategoriaNoBackend(id);
        alert("Categoria excluída com sucesso!");
        fetchCategorias();
      }
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
    <>
      <div className={styles.header}>
        <h2>Gestão de Categorias</h2>
        <button className={styles.cadastrarButton} onClick={handleCreate}>Cadastrar</button>
      </div>
      <div className={styles.barraTitulo}>Lista de Categorias</div>
      {categorias.length > 0 ? (
        <div className={styles.scrollContainer}>
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
                <td>{categoria.nome}</td>
                <td>
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
        </div>

      ) : (
        <div className={styles.msgVazia}>A lista de categorias está vazia.</div>
      )}

      {showModal && (
        <CategoriaInfoModal
          show={showModal}
          handleClose={handleCloseModal}
          categoria={selectedCategoria}
          isEditMode={isEditMode}
          atualizarCategoria={atualizarCategoriaNoBackend}
          criarCategoria={criarCategoriaNoBackend}
        />
      )}
    </>
  );
};

export default GestaoCategorias;
