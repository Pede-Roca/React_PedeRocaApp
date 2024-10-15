import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './ProdutoInfoModal.module.css';
import axios from "axios";

const CategoriaInfoModal = ({ show, handleClose, categoria }) => {
  const [nome, setNome] = useState(categoria.nome);

  const handleSubmit = async (id) => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}Categoria/${categoria.id}`, {
        nome,
      });

      alert("Categoria atualizada com sucesso!");
      handleClose();
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <p className={styles.TituloDetalhes}>Editar a categoria</p>
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
        <Button
          onClick={handleSubmit}
          className={styles.Editar}
        >
          {"Salvar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoriaInfoModal;
