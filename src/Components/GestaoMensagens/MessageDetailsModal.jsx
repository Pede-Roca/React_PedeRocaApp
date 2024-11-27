import React from "react";
import { Modal, Button } from "react-bootstrap";

const MessageDetailsModal = ({ show, handleClose, message }) => {
  if (!message) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalhes da Mensagem</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>ID:</strong> {message.id}</p>
        <p><strong>Usuário:</strong> {message.user}</p>
        <p><strong>Email:</strong> {message.email}</p>
        <p><strong>Mensagem:</strong> {message.text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageDetailsModal;
