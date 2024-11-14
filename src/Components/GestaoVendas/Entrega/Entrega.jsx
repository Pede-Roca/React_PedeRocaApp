import React, { useEffect, useState } from 'react';
import styles from './Entrega.module.css';
import { Table, Form, InputGroup } from 'react-bootstrap';

const Entregas = ({ entregas }) => {
  const [busca, setBusca] = useState('');
  const [entregasFiltradas, setEntregasFiltradas] = useState([]);

  useEffect(() => {
    setEntregasFiltradas(
      entregas.filter(entrega => 
        entrega.usuario?.nome.toLowerCase().includes(busca.toLowerCase())
      )
    );
  }, [busca, entregas]);

  return (
    <>
      <h2>Entregas</h2>
      <div className={styles.barraTitulo}>Pedidos em processo de entrega</div>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar pelo nome do usuário"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </InputGroup>
      <Table bordered hover className={styles.entregasTable}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Data do Pedido</th>
            <th>Nome do Usuário</th>
            <th>Status</th>
            <th>Tipo de Entrega</th>
            <th>Endereço</th>
          </tr>
        </thead>
        <tbody>
          {entregasFiltradas.length > 0 ? (
            entregasFiltradas.map((entrega, index) => (
              <tr key={index}>
                <td>{new Date(entrega.data).toLocaleDateString() || 'Data não informada'}</td>
                <td>{entrega.usuario?.nome || 'Usuário não especificado'}</td>
                
                <td>{entrega.status ? 'Enviado' : 'Entregue'}</td>
                <td>{entrega.tipoEntrega === 1 ? 'Entrega Rápida' : entrega.tipoEntrega === 2 ? 'Entrega Padrão' : 'Entrega Especial'}</td>
                <td>
                  {entrega.endereco ? (
                    <>
                      <div>{entrega.endereco.cidade}</div>
                      <div>{entrega.endereco.estado}</div>
                    </>
                  ) : 'Endereço não especificado'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhuma entrega encontrada para o usuário informado</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Entregas;
