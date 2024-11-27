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

  const exportToCSV = () => {
    const csvData = [
      ["Data do Pedido", "Nome do Usuário", "Status", "Tipo de Entrega", "Endereço"],
      ...entregasFiltradas.map(entrega => [
        new Date(entrega.data).toLocaleDateString() || "Data não informada",
        entrega.usuario?.nome || "Usuário não especificado",
        entrega.status ? "Enviado" : "Entregue",
        entrega.tipoEntrega === 1 ? "Entrega Rápida" : entrega.tipoEntrega === 2 ? "Entrega Padrão" : "Entrega Especial",
        entrega.endereco ? `${entrega.endereco.cidade}, ${entrega.endereco.estado}` : "Endereço não especificado"
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "entregas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Entregas</h2>
        <button className={styles.exportButton} onClick={exportToCSV}>
          <i className="bi bi-filetype-csv"> CSV</i>
        </button>
      </div>
      <div className={styles.barraTitulo}>Pedidos em processo de entrega</div>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar pelo nome do usuário"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </InputGroup>
      <div className={styles.scrollContainer}>
        <Table bordered hover className={styles.entregasTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Data do Pedido</th>
              <th>Nome do Usuário</th>
              <th className={styles.MobileOcult}>Status</th>
              <th className={styles.MobileOcult}>Tipo de Entrega</th>
              <th className={styles.MobileOcult}>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {entregasFiltradas.length > 0 ? (
              entregasFiltradas.map((entrega, index) => (
                <tr key={index}>
                  <td>{new Date(entrega.data).toLocaleDateString() || 'Data não informada'}</td>
                  <td>{entrega.usuario?.nome || 'Usuário não especificado'}</td>
                  <td className={styles.MobileOcult}>{entrega.status ? 'Enviado' : 'Entregue'}</td>
                  <td className={styles.MobileOcult}>
                    {entrega.tipoEntrega === 1 ? 'Entrega Rápida' : 
                     entrega.tipoEntrega === 2 ? 'Entrega Padrão' : 'Entrega Especial'}
                  </td>
                  <td className={styles.MobileOcult}>
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
      </div>
    </>
  );
};

export default Entregas;
