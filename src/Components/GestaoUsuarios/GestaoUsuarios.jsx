import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './GestaoUsuarios.module.css';
import axios from 'axios';
import UserInfoModal from "./UserInfoModal";

const GestaoUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsuarios = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}Usuario`);
      console.log(data);
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleUpdateUser = (updatedUser) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const lowerCaseBusca = searchTerm.toLowerCase();

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(lowerCaseBusca)
  );


  const handleInfo = (id) => {
    const usuario = usuarios.find(user => user.id === id);
    setSelectedUser(usuario); 
  };

  useEffect(() => {
    if (selectedUser) {
      setShowModal(true);
    }
  }, [selectedUser]);

  const handleDelete = (id) => {
    console.log(`Excluir usuário ${id}`);
  };

  const handleToggleStatus = (id) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((user) =>
        user.id === id ? { ...user, status: user.status ? false : true } : user
      )
    );
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setSelectedUser(null); 
  };

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.header}>
        <h2>Gestão de usuários</h2>
        <button className={styles.cadastrarButton}>Cadastrar</button>
      </div>
      
      <div className={styles.barraTitulo}>Lista de usuários</div>
      
      <span
        className="navbar navbar-expand-xxxl sticky-top d-flex justify-content-center align-items-baseline"
        id={styles.filtroPesquisa1}
      >
        <form className="d-flex" id={styles.TamanhoFormPesquisa}>
          <input
            type="text"
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
            className="form-control flex-grow-1"
            placeholder="Busque por Nome"
            aria-label="Search"
            id={styles.filtroPesquisa}
          />
          <button className={styles.bgFiltro} type="submit">
            <i className="bi bi-search" id={styles.corPesquisa}></i>
          </button>
        </form>
      </span>

      <Table bordered hover className={styles.userTable}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Status</th>
            <th>Nome</th>
            <th className={styles.MobileOcult}>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map((user) => (
            <tr key={user.id}>
              <td>
                <Button
                  variant="light"
                  onClick={() => handleToggleStatus(user.id)}
                  className={styles.statusToggle}
                >
                  {user.status ? (
                    <i className="bi bi-toggle-on" id={styles.ativo}></i>
                  ) : (
                    <i className="bi bi-toggle-off" id={styles.inativo}></i>
                  )}
                </Button>
              </td>
              <td>{user.nome}</td>
              <td className={styles.MobileOcult}>{user.email}</td>
              <td>
                <Button
                  variant="light"
                  onClick={() => handleInfo(user.id)}
                  className={styles.actionButton}
                >
                  <i className="bi bi-info-square" id={styles.editIcon}></i>
                </Button>
                <Button
                  variant="light"
                  onClick={() => handleDelete(user.id)}
                  className={styles.actionButton}
                >
                  <i className="bi bi-trash" id={styles.deleteIcon}></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {selectedUser && (
        <UserInfoModal
          show={showModal}
          handleClose={handleCloseModal}
          usuario={selectedUser}
          onUpdateUser={handleUpdateUser} // Passa a função para o modal
        />
      )}
    </div>
  );
};

export default GestaoUsuarios;