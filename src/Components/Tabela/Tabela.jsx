import React from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import styles from './Tabela.module.css'


const Tabela = ({ usuarios, handleEdit, handleDelete, handleToggleStatus }) => {
  return (
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
  );
};

export default Tabela;
