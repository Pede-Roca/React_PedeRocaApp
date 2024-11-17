import React, { useEffect, useState } from 'react';
import styles from './Pedidos.module.css';
import { Table, Form, InputGroup, Button, Modal } from 'react-bootstrap';

const Pedidos = ({ todosPedidos }) => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  useEffect(() => {
    setPedidosFiltrados(
      todosPedidos.filter(pedido =>
        pedido.nomeUsuario?.toLowerCase().includes(nomeUsuario.toLowerCase())
      )
    );
  }, [nomeUsuario, todosPedidos]);

  const exportToCSV = () => {
    const csvData = [
      ["Nome do Usuário", "Status"],
      ...pedidosFiltrados.map(pedido => [
        pedido.nomeUsuario || "Usuário não especificado",
        pedido.status || "Status não informado"
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(row => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pedidos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShowModal = (pedido) => {
    setPedidoSelecionado(pedido);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPedidoSelecionado(null);
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Gerenciamento de pedidos</h2>
        <button className={styles.exportButton} onClick={exportToCSV}>
          <i className="bi bi-filetype-csv"></i> CSV
        </button>
      </div>
      <div className={styles.barraTitulo}>Todos os pedidos</div>
      <InputGroup className="mb-1">
        <Form.Control
          type="text"
          placeholder="Buscar pelo nome do usuário"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
        />
      </InputGroup>
      <div className={styles.scrollContainer}>
        <Table bordered hover className={styles.userTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Nome do Usuário</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.length > 0 ? (
              pedidosFiltrados.map((pedido, index) => (
                <tr key={index}>
                  <td>{pedido.nomeUsuario || 'Usuário não especificado'}</td>
                  <td>{pedido.status || 'Status não informado'}</td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => handleShowModal(pedido)}
                      className={styles.actionButton}
                    >
                      <i className="bi bi-info-square" id={styles.editIcon}></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Nenhum pedido encontrado para o usuário informado</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {pedidoSelecionado && (
          <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title><h3>Detalhes do Pedido</h3></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section className={styles.modalBodyHeader}>
              <p><span>Nome do Usuário: </span>{pedidoSelecionado.nomeUsuario}</p>
              <p><span>Status do Pedido: </span>{pedidoSelecionado.status}</p>
            </section>
            <section>
              <div>
              <span className={styles.estatusCarrinho}>
                {pedidoSelecionado.status === "aberto" ? "Carrinho Atual" : "Itens Comprados:"}
              </span>
              <ul>
                {pedidoSelecionado.itensComprados.length > 0 ? (
                  pedidoSelecionado.itensComprados.map((item, idx) => (
                    <li key={idx} className={styles.linhasPedidos}>
                      <span className={styles.produtoColuna}>
                        {item.nomeProduto.length > 10 ? `${item.nomeProduto.slice(0, 10)}...` : item.nomeProduto}
                      </span>
                      <p className={styles.qtdColuna}>{item.quantidade}x</p>
                      <p className={styles.qtdColuna}><span>R$ </span>{item.preco}</p>
                    </li>
                  ))
                ) : (
                  <p>Carrinho de compras criado, porém ainda não há itens.</p>
                )}
              </ul>
              </div>
              <div className={styles.containerPreco}>
                <p><span>Valor Total:</span> R$ {pedidoSelecionado.itensComprados
                  .reduce((total, item) => total + item.quantidade * item.preco, 0)
                  .toFixed(2)}
                </p>
              </div>
            </section>
          </Modal.Body>
          <Modal.Footer>
            <Button className={styles.btnFechar} onClick={handleCloseModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Pedidos;
