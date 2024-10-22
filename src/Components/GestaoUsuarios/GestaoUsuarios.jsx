import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Stack, Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './GestaoUsuarios.module.css';
import UserInfoModal from "./UserInfoModal";
import { buscarTodosUsuariosNoBackend, atualizarUsuarioNoBackend, alterarStatusUsuarioNoBackend, buscarEnderecoPorIdDoUsuarioNoBackend, atualizarEnderecoNoBackend } from '../../services';

const niveisAcesso = {
  todos: "Todos",
  adm: "Administrador",
  comum: "Comum",
  produtor: "Produtor",
  assinante: "Assinante",
  entregador: "Entregador",
};

const GestaoUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTipoUsuario, setFiltroTipoUsuario] = useState("");

  const fetchUsuarios = async () => {
    try {
      setUsuarios(await buscarTodosUsuariosNoBackend());
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

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(lowerCaseBusca) &&
    (filtroTipoUsuario === "" || usuario.nivelAcesso === filtroTipoUsuario)
  );

  const handleInfo = (id) => {
    const usuario = usuarios.find((user) => user.id === id);
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

  const handleToggleStatus = async (id) => {
    const user = usuarios.find((user) => user.id === id);
    const novoStatus = !user.status;

    try {
      await alterarStatusUsuarioNoBackend(id, novoStatus);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((user) =>
          user.id === id ? { ...user, status: novoStatus } : user
        )
      );
    } catch (error) {
      console.error("Erro ao alterar o status do usuário:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleFilterChange = (tipo) => {
    setFiltroTipoUsuario(tipo.toLowerCase());
  };

  const formatNameAccessLevel = (level) => {
    switch (level) {
      case "adm":
        return "Administrador"
      case "comum":
        return "Comum"
      case "produtor":
        return "Produtor"
      case "assinante":
        return "Assinante"
      case "entregador":
        return "Entregador"
      default:
        return "Todos"
    }
  }

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
        <form className="d-flex flex-column gap-2" id={styles.TamanhoFormPesquisa}>

          <div className="d-flex">
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
          </div>

          <select
            id="nivelAcesso"
            onChange={(e) => handleFilterChange(e.target.value === 'todos' ? '' : e.target.value)}
            value={filtroTipoUsuario}
          >
            <option value="" disabled>
              Nível de Acesso
            </option>
            {niveisAcesso && Object.keys(niveisAcesso).map((nivel) => (
              <option key={nivel} value={nivel}>
                {niveisAcesso[nivel]}
              </option>
            ))}
          </select>
        </form>
      </span>
      <div className={styles.scrollContainer}>
        <Table bordered hover className={styles.userTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Status</th>
              <th>Nome</th>
              <th className={styles.MobileOcult}>Email</th>
              <th className={styles.MobileOcult}>Nivel de Acesso</th>
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
                <td className={styles.MobileOcult}>
                  {user.nivelAcesso === "adm"
                    ? "Administrador"
                    : user.nivelAcesso === "comum"
                      ? "Comum"
                      : "Produtor"}
                </td>
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
      </div>
      

      {selectedUser && (
        <UserInfoModal
          show={showModal}
          handleClose={handleCloseModal}
          usuario={selectedUser}
          onUpdateUser={handleUpdateUser}
          atualizarUsuario={atualizarUsuarioNoBackend}
          atualizarEndereco={atualizarEnderecoNoBackend}
          buscarEnderecoDoUsuario={buscarEnderecoPorIdDoUsuarioNoBackend}
        />
      )}
    </div>
  );
};

export default GestaoUsuarios;
