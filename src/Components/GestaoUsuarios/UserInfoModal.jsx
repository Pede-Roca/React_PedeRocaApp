import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './UserInfoModal.module.css';

const UserInfoModal = ({ show, handleClose, usuario }) => {
  const [isEditable, setIsEditable] = React.useState(false);
  
  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><p className={styles.TituloDetalhes}>Detalhes do Usuário</p></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.userInfo}>
          <label className={styles.label}>Nome: 
            <input 
              type="text" 
              value={usuario.nome} 
              disabled={!isEditable} 
              className={styles.inputField} // Use um estilo adequado
            />
          </label>
          <br />
          <label className={styles.label}> Email: 
            <input 
              type="email" 
              value={usuario.email} 
              disabled={!isEditable} 
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}>Status: 
            <input 
              type="text" 
              value={usuario.status} 
              disabled={!isEditable} 
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}> Telefone:
            <input 
              type="text" 
              value={usuario.telefone || "Não informado"} 
              disabled={!isEditable} 
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}>
            <strong>Endereço:</strong>
            <input 
              type="text" 
              value={usuario.endereco || "Não informado"} 
              disabled={!isEditable} 
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
          onClick={toggleEdit} 
          className={styles.Editar}>
          {isEditable ? "Salvar" : "Editar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserInfoModal;
