import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { buscarUnidadesMedidaNoBackend, deletarUnidadeMedidaNoBackend, atualizarUnidadeMedidaNoBackend, criarUnidadeMedidaNoBackend } from '../../../services';

import UnidadesMedidasInfoModal from "./UnidadesMedidasInfoModal";
import styles from '../Produtos/Produtos.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const UnidadesMedidas = () => {
  const [unidadesMedidas, setUnidadesMedidas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUnidadeMedida, setSelectedUnidadeMedida] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchUnidadesMedidas = async () => {
    try {
      const data = await buscarUnidadesMedidaNoBackend();
      setUnidadesMedidas(data);
    } catch (error) {
      console.error("Erro ao buscar as unidades de medidas:", error);
    }
  };

  const handleInfo = (id) => {
    const unidadeMedida = unidadesMedidas.find(unidade => unidade.id === id);
    setSelectedUnidadeMedida(unidadeMedida);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedUnidadeMedida(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      if (confirm("Deseja realmente excluir a unidade de medida?")) {
        await deletarUnidadeMedidaNoBackend(id);
        alert("Unidade de Medida excluída com sucesso!");
        fetchUnidadesMedidas();
      }
    } catch (error) {
      console.error("Erro ao excluir a unidade de medida:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchUnidadesMedidas();
  };

  useEffect(() => {
    fetchUnidadesMedidas();
  }, []);

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.header}>
        <h2>Gestão de Unidades de Medidas</h2>
        <button className={styles.cadastrarButton} onClick={handleCreate}>Cadastrar</button>
      </div>
      <div className={styles.barraTitulo}>Lista de Unidades de Medidas</div>
      {unidadesMedidas.length > 0 ? (
        <Table bordered hover className={styles.userTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Nome</th>
              <th>Sigla</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {unidadesMedidas.map(unidade => (
              <tr key={unidade.id}>
                <td>{unidade.nomeUnidade}</td>
                <td>{unidade.siglaUnidade}</td>
                <td>
                  <Button
                    variant="light"
                    onClick={() => handleInfo(unidade.id)}
                    className={styles.actionButton}
                  >
                    <i className="bi bi-pencil-square" id={styles.editIcon}></i>
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => handleDelete(unidade.id)}
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
        <div className={styles.msgVazia}>A lista de unidade de medidas está vazia.</div>
      )}

      {showModal && (
        <UnidadesMedidasInfoModal
          show={showModal}
          handleClose={handleCloseModal}
          unidadeMedida={selectedUnidadeMedida}
          isEditMode={isEditMode}
          atualizarUnidadeMedida={atualizarUnidadeMedidaNoBackend}
          criarUnidadeMedida={criarUnidadeMedidaNoBackend}
        />
      )}
    </div>
  );
};

export default UnidadesMedidas;
