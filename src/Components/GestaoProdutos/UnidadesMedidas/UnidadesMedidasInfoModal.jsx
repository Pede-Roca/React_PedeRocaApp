import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from '../Produtos/ProdutoInfoModal.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const UnidadesMedidasInfoModal = ({ show, handleClose, unidadeMedida, isEditMode, atualizarUnidadeMedida, criarUnidadeMedida }) => {
  const [nomeUnidade, setNomeUnidade] = useState("");
  const [siglaUnidade, setSiglaUnidade] = useState("");

  useEffect(() => {
    if (unidadeMedida && isEditMode) {
      setNomeUnidade(unidadeMedida.nomeUnidade);
      setSiglaUnidade(unidadeMedida.siglaUnidade);
    } else {
      setNomeUnidade("");
      setSiglaUnidade("");
    }
  }, [unidadeMedida, isEditMode]);

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await atualizarUnidadeMedida(unidadeMedida.id, { nomeUnidade, siglaUnidade });
        alert("Unidade de Medida atualizada com sucesso!");
      } else {
        await criarUnidadeMedida({ nome });
        alert("Unidade de medida criada com sucesso!");
      }
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar a unidade de medida:", error);
    }
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleSiglaChange = (event) => {
    setSiglaUnidade(event.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <p className={styles.TituloDetalhes}>
            {isEditMode ? "Editar a unidade de medida" : "Criar nova unidade de medida"}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.userInfo}>
          <label className={styles.label}>
            Nome:
            <input
              type="text"
              value={nomeUnidade}
              onChange={handleNomeChange}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}>
            Nome:
            <input
              type="text"
              value={siglaUnidade}
              onChange={handleSiglaChange}
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

export default UnidadesMedidasInfoModal;
