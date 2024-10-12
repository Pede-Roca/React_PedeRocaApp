import React, { useState } from "react";
import Tabela from '../../Components/Tabela/Tabela'
import styles from './AdminPage.module.css'


const AdminPage = () => {

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
      <Tabela
        usuarios={usuarios}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleToggleStatus={handleToggleStatus}
      />
       </div>
  );
};

export default AdminPage;
