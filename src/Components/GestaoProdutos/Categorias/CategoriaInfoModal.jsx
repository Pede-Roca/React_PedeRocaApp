import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from '../Produtos/ProdutoInfoModal.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const CategoriaInfoModal = ({ show, handleClose, categoria, isEditMode, atualizarCategoria, criarCategoria }) => {
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (categoria && isEditMode) {
      setNome(categoria.nome);
    } else {
      setNome("");
    }
  }, [categoria, isEditMode]);

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await atualizarCategoria(categoria.id, { nome });
        alert("Categoria atualizada com sucesso!");
      } else {
        await criarCategoria({ nome });
        alert("Categoria criada com sucesso!");
      }
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar a categoria:", error);
    }
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <p className={styles.TituloDetalhes}>
            {isEditMode ? "Editar a categoria" : "Criar nova categoria"}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.userInfo}>
          <label className={styles.label}>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={handleNomeChange}
              className={styles.inputField}
            />
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} className={styles.Voltar}>
          Voltar
        </Button>
        <Button onClick={handleSubmit} className={styles.Editar}>
          {isEditMode ? "Salvar" : "Criar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoriaInfoModal;
