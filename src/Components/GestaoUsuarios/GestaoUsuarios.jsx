import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import styles from './GestaoUsuarios.module.css'


const GestaoUsuarios = () => {

  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "João da Silva", email: "joao@gmail.com", status: "Ativo" },
    { id: 2, nome: "Maria da Silva", email: "maria@gmail.com", status: "Ativo" },
    { id: 3, nome: "Laura da Silva", email: "laura@gmail.com", status: "Ativo" },
    { id: 4, nome: "Beatriz da Silva", email: "beatriz@gmail.com", status: "Ativo" },
    { id: 5, nome: "Carla da Silva", email: "carla@gmail.com", status: "Ativo" },
    { id: 6, nome: "Amanda da Silva", email: "amanda@gmail.com", status: "Ativo" },
  ]);

  const handleEdit = (id) => {
    console.log(`Editar usuário ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Excluir usuário ${id}`);
  };

  const handleToggleStatus = (id) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Ativo" ? "Inativo" : "Ativo" }
          : user
      )
    );
  };

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.header}>
        <h2>Gestão de usuários</h2>
        <button className={styles.cadastrarButton}>Cadastrar</button>
      </div>
      <div className={styles.barraTitulo}>Lista de usuários</div>
    <Table bordered hover className={styles.userTable}> 
      <thead>
        <tr className={styles.tableHeader}>      
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nome}</td>
            <td>{user.email}</td>
            <td>
              <Button
                variant="light"
                onClick={() => handleToggleStatus(user.id)}       
                className={styles.statusToggle}
              >
                {user.status === "Ativo" ? (
                  <i className="bi bi-toggle-on" id={styles.ativo}></i>   
                ) : (
                  <i className="bi bi-toggle-off" id={styles.inativo}></i>          
                )}
              </Button>
            </td>
            <td>
              <Button
                variant="light"
                onClick={() => handleEdit(user.id)}
                className={styles.actionButton}
              >
                <i className="bi bi-pencil-square" id={styles.editIcon}></i>
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
    </div>
  );
};

export default GestaoUsuarios;
