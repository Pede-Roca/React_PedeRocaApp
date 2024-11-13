import React, { useState, useEffect } from "react";
import { Table, Button, Toast } from "react-bootstrap";
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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("toastColor");

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
      setToastMessage(`Status do usuário atualizado!`);
      setToastColor("#7C8C03");
    } catch (error) {
      console.error("Erro ao alterar o status do usuário:", error);
      setToastMessage("Erro ao atualizar o status do usuário.");
      setToastColor("#A60303");
    }
    setShowToast(true);
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

  const exportToCSV = () => {
    const csvData = [
      ["Status", "Nome", "Email", "Nível de Acesso"],
      ...filteredUsuarios.map(usuario => [
        usuario.status ? "Ativo" : "Inativo",
        usuario.nome,
        usuario.email,
        formatNameAccessLevel(usuario.nivelAcesso)
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "usuarios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className={styles.header}>
        <h2>Gestão de usuários</h2>
        <button className={styles.exportButton} onClick={exportToCSV}>
          <i class="bi bi-filetype-csv"></i>
        </button>
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
      
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1050,
          backgroundColor: "#7C8C03",
          color: "white",
          fontSize: "1rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

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
