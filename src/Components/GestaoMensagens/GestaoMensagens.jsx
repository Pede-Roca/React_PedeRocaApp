import React, { useState, useEffect } from "react";
import { Table, Button, Toast } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './GestaoMensagens.module.css'; // Adapte os estilos conforme necessário
import MessageDetailsModal from "./MessageDetailsModal";


const buscarMensagensNoBackend = async () => {
  return [
    { id: 1, userId: '123', email: 'user1@example.com', status: false, Conteudo: "Mensagem 1" },
    { id: 2, userId: '124', email: 'user2@example.com', status: true, Conteudo: "Mensagem 2" },
    { id: 3, userId: '125', email: 'user3@example.com', status: false, Conteudo: "Mensagem 3" },
  ];
};

const GestaoMensagens = () => {
  const [mensagens, setMensagens] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("toastColor");
  const [selectedMessage, setSelectedMessage] = useState(null); 
  const [showMessageModal, setShowMessageModal] = useState(false); 

  // Função para buscar mensagens
  const fetchMensagens = async () => {
    try {
      const mensagensRecebidas = await buscarMensagensNoBackend();
      console.log("Mensagens recebidas:", mensagensRecebidas); 
      setMensagens(mensagensRecebidas);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };

  // UseEffect para chamar a API na inicialização
  useEffect(() => {
    fetchMensagens();
  }, []);

  
  const handleToggleStatus = (id) => {
    const updatedMessages = mensagens.map((msg) =>
      msg.id === id ? { ...msg, status: !msg.status } : msg
    );
    setMensagens(updatedMessages);
    setToastMessage(`Status da mensagem atualizado!`);
    setToastColor("#7C8C03");
    setShowToast(true);
  };

  
  const handleDeleteMessage = (id) => {
    const updatedMessages = mensagens.filter((msg) => msg.id !== id);
    setMensagens(updatedMessages);
    setToastMessage(`Mensagem excluída com sucesso!`);
    setToastColor("#A60303");
    setShowToast(true);
  };

  
  const handleViewDetails = (message) => {
    console.log("Detalhes da mensagem:", message.Conteudo); 
    setSelectedMessage(message); 
    setShowMessageModal(true); 
  };

  return (
    <div>
      <div className={styles.header}>
        <h2>Gestão de Mensagens</h2>
      </div>

      <div className={styles.scrollContainer}>
        <Table bordered hover className={styles.messageTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>User ID</th>
              <th>Email</th>
              <th>Lido/Não Lido</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {mensagens.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.userId}</td>
                <td>{msg.email}</td>
                <td>
                  <Button
                    variant={msg.status ? "success" : "warning"} // Verde para Lido, Amarelo para Não Lido
                    onClick={() => handleToggleStatus(msg.id)}
                    className={styles.statusToggle}
                  >
                    {msg.status ? "Lido" : "Não Lido"}
                  </Button>
                </td>
                <td>
                  <Button
                    variant="light"
                    onClick={() => handleViewDetails(msg)} 
                  >
                    <i className="bi bi-info-square" id={styles.detailsIcon}></i>
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => handleDeleteMessage(msg.id)}
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
          backgroundColor: toastColor,
          color: "white",
          fontSize: "1rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      {selectedMessage && (
        <MessageDetailsModal
          show={showMessageModal}
          handleClose={() => setShowMessageModal(false)}
          message={selectedMessage}
        />
      )}
    </div>
  );
};

export default GestaoMensagens;
