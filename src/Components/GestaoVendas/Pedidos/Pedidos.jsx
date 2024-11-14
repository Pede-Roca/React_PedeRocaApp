import React, { useEffect, useState } from 'react';
import styles from './Pedidos.module.css';
import { Table, Form, InputGroup } from 'react-bootstrap';

const Pedidos = ({ todosPedidos }) => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

  useEffect(() => {
    setPedidosFiltrados(
      todosPedidos.filter(pedido =>
        pedido.nomeUsuario?.toLowerCase().includes(nomeUsuario.toLowerCase())
      )
    );
  }, [nomeUsuario, todosPedidos]);

  return (
    <>
      <h1>Gerenciamento de pedidos</h1>
      <div className={styles.barraTitulo}>Todos os pedidos</div>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar pelo nome do usuário"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
        />
      </InputGroup>
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
                  <button className={styles.actionButton}>
                    <i className="bi bi-info-square"></i>
                  </button>
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
    </>
  );
};

export default Pedidos;
