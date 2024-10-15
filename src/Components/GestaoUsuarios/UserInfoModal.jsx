import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './UserInfoModal.module.css';

const UserInfoModal = ({ show, handleClose, usuario }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Informações do Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.userInfo}>
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Status:</strong> {usuario.status}</p>
          <p><strong>Telefone:</strong> {usuario.telefone || "Não informado"}</p>
          <p><strong>Endereço:</strong> {usuario.endereco || "Não informado"}</p>
          {/* Adicione outros atributos conforme necessário */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className={styles.Voltar}>
          Voltar
        </Button>
        <Button variant="primary" onClick={handleClose} className={styles.Editar}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserInfoModal;