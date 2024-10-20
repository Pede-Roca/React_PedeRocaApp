import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import InputMask from 'react-input-mask';
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './UserInfoModal.module.css';

const UserInfoModal = ({ show, handleClose, usuario, onUpdateUser, atualizarUsuario, atualizarEndereco, buscarEnderecoDoUsuario }) => {
  const [isEditable, setIsEditable] = useState(false);

  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [telefone, setTelefone] = useState(usuario.telefone);
  const [endereco, setEndereco] = useState({
    id: "",
    logradouro: "",
    bairro: "",
    numero: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: ""
  });

  const telefoneRef = useRef(null);

  const removerMascaraTelefone = (telefone) => {
    return telefone.replace(/\D/g, '');
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    const telefoneSemMascara = removerMascaraTelefone(telefone); // Remover a máscara do telefone antes de salvar

    const updatedUser = {
      ...usuario,
      nome,
      email,
      telefone: telefoneSemMascara
    };

    const updatedEndereco = {
      ...endereco,
      idUsuario: usuario.id
    };

    try {
      await atualizarUsuario(usuario.id, updatedUser);
      await atualizarEndereco(endereco.id, updatedEndereco);
      console.log("Usuário e endereço atualizado com sucesso!");

      onUpdateUser(updatedUser);
      setIsEditable(false);
    } catch (error) {
      console.error("Erro ao salvar as alterações do usuário:", error);
    }
  };

  const fetchEndereco = async () => {
    try {
      const enderecoData = await buscarEnderecoDoUsuario();
      setEndereco({
        id: enderecoData.id,
        logradouro: enderecoData.logradouro,
        bairro: enderecoData.bairro,
        numero: enderecoData.numero,
        cidade: enderecoData.cidade,
        estado: enderecoData.estado,
        cep: enderecoData.cep,
        complemento: enderecoData.complemento || "",
      });
    } catch (error) {
      console.error("Erro ao buscar endereço do usuário:", error);
    }
  };

  const handleCancel = () => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setTelefone(usuario.telefone || "Não informado");

    handleClose();
  };

  useEffect(() => {
    if (show) {
      fetchEndereco();
    }
  }, [show]);

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
          <label className={styles.label}> Telefone:
            <InputMask
              ref={telefoneRef}
              mask="(99) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              disabled={!isEditable}
              className={styles.inputField}
            />
          </label>
          <br />
          {/* Divisória visual */}
          <hr className={styles.divisoria} />
          <p className={styles.TituloEndereco}>Endereço</p>
          <label className={styles.label}> Logradouro:
            <input
              type="text"
              value={endereco.logradouro}
              onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })}
              disabled={!isEditable}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}> Número:
            <input
              type="text"
              value={endereco.numero}
              onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
              disabled={!isEditable}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}> Bairro:
            <input
              type="text"
              value={endereco.bairro}
              onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
              disabled={!isEditable}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}> Complemento:
            <input
              type="text"
              value={endereco.complemento}
              onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
              disabled={!isEditable}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}> Cidade:
            <input
              type="text"
              value={endereco.cidade}
              onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
              disabled={!isEditable}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}> Estado:
            <input
              type="text"
              value={endereco.estado}
              onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
              disabled={!isEditable}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}> CEP:
            <InputMask
              mask="99999-999"
              value={endereco.cep}
              onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
              disabled={!isEditable}
              className={styles.inputField}
            />
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCancel} className={styles.Voltar}>
          Voltar
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
