import React, { useEffect, useState } from 'react';
import { Table, Form, InputGroup } from 'react-bootstrap';
import styles from './Finalizada.module.css';

const Finalizada = ({ finalizadas }) => {
  const [busca, setBusca] = useState('');
  const [entregasFiltradas, setEntregasFiltradas] = useState([]);

  useEffect(() => {
    setEntregasFiltradas(
      finalizadas.filter(entrega =>
        entrega.usuario?.nome.toLowerCase().includes(busca.toLowerCase())
      )
    );
  }, [busca, finalizadas]);

  return (
    <>
      <h2>Histórico de pedidos</h2>
      <div className={styles.barraTitulo}>Pedidos Finalizados</div>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar pelo nome do usuário"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </InputGroup>
      <Table bordered hover className={styles.finalizadaTable}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Nome do Usuário</th>
            <th>Data do Pedido</th>
            <th>Data de Entrega</th>
            <th>Status</th>
            <th>Tipo de Entrega</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
          {entregasFiltradas.length > 0 ? (
            entregasFiltradas.map((entrega, index) => (
              <tr key={index}>
                <td>{entrega.usuario?.nome || 'Usuário não especificado'}</td>
                <td>{new Date(entrega.data).toLocaleDateString() || 'Data não informada'}</td>
                <td>{entrega.dataEntrega ? new Date(entrega.dataEntrega).toLocaleDateString() : 'Entrega não realizada'}</td>
                <td>{entrega.status ? 'Aberto' : 'Finalizada'}</td>
                <td>
                  {entrega.tipoEntrega === 1
                    ? 'Entrega Rápida'
                    : entrega.tipoEntrega === 2
                    ? 'Entrega Padrão'
                    : 'Entrega Especial'}
                </td>
                <td>
                  {entrega.endereco ? (
                    <>
                      <div>{entrega.endereco.cep}</div>
                      <div>{entrega.endereco.cidade}, {entrega.endereco.estado}</div>
                    </>
                  ) : 'Endereço não especificado'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhuma entrega encontrada para o usuário informado</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Finalizada;
