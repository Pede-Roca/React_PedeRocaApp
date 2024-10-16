import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './UserInfoModal.module.css';

const UserInfoModal = ({ show, handleClose, usuario, onUpdateUser }) => {
  const [isEditable, setIsEditable] = useState(false);

  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [status, setStatus] = useState(usuario.status);
  const [telefone, setTelefone] = useState(usuario.telefone || "Não informado");
  const [endereco, setEndereco] = useState(usuario.endereco || "Não informado");

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    const updatedUser = {
      ...usuario,
      nome,
      email,
      status,
      telefone,
      endereco,
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}Usuario/${usuario.id}`, updatedUser);
      console.log("Usuário atualizado com sucesso!");

      onUpdateUser(updatedUser);

      setIsEditable(false);
    } catch (error) {
      console.error("Erro ao salvar as alterações do usuário:", error);
    }
  };

  const handleCancel = () => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setStatus(usuario.status);
    setTelefone(usuario.telefone || "Não informado");
    setEndereco(usuario.endereco || "Não informado");

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title><p className={styles.TituloDetalhes}>Detalhes do Usuário</p></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.userInfo}>
          <label className={styles.label}>Nome: 
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              disabled={!isEditable} 
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}> Email: 
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              disabled={!isEditable} 
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}>Status: 
            <input 
              type="text" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              disabled={!isEditable} 
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}> Telefone:
            <input 
              type="text" 
              value={telefone} 
              onChange={(e) => setTelefone(e.target.value)} 
              disabled={!isEditable} 
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}> Endereço:
            <input 
              type="text" 
              value={endereco} 
              onChange={(e) => setEndereco(e.target.value)} 
              disabled={!isEditable} 
              className={styles.inputField}
            />
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCancel} className={styles.Voltar}>
          Cancelar
        </Button>
        {isEditable ? (
          <Button onClick={handleSave} className={styles.Salvar}>
            Salvar
          </Button>
        ) : (
          <Button onClick={toggleEdit} className={styles.Editar}>
            Editar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UserInfoModal;