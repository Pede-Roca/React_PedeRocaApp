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

  const exportToCSV = () => {
    const csvData = [
      ["Data do Pedido", "Data de Entrega", "Nome do Usuário", "Status", "Tipo de Entrega", "Endereço"],
      ...entregasFiltradas.map(entrega => [
        entrega.data ? new Date(entrega.data).toLocaleDateString() : "Data não informada",
        entrega.dataEntrega ? new Date(entrega.dataEntrega).toLocaleDateString() : "Entrega não realizada",
        entrega.usuario?.nome || "Usuário não especificado",
        entrega.status ? "Aberto" : "Finalizada",
        entrega.tipoEntrega === 1
          ? "Entrega Rápida"
          : entrega.tipoEntrega === 2
          ? "Entrega Padrão"
          : "Entrega Especial",
        entrega.endereco
          ? `${entrega.endereco.cep}, ${entrega.endereco.cidade}, ${entrega.endereco.estado}`
          : "Endereço não especificado",
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(row => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pedidos_finalizados.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Histórico de pedidos</h2>
        <button className={styles.exportButton} onClick={exportToCSV}>
          <i className="bi bi-filetype-csv"></i> CSV
        </button>
      </div>
      <div className={styles.barraTitulo}>Pedidos Finalizados</div>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar pelo nome do usuário"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </InputGroup>
      <div className={styles.scrollContainer}>
        <Table bordered hover className={styles.finalizadaTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.MobileOcult}>Data do Pedido</th>
              <th>Data de Entrega</th>
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
                  <td className={styles.MobileOcult}>
                    {new Date(entrega.data).toLocaleDateString() || 'Data não informada'}
                  </td>
                  <td>
                    {entrega.dataEntrega ? new Date(entrega.dataEntrega).toLocaleDateString() : 'Entrega não realizada'}
                  </td>
                  <td>{entrega.usuario?.nome || 'Usuário não especificado'}</td>
                  <td className={styles.MobileOcult}>
                    {entrega.status ? 'Aberto' : 'Finalizada'}
                  </td>
                  <td className={styles.MobileOcult}>
                    {entrega.tipoEntrega === 1
                      ? 'Entrega Rápida'
                      : entrega.tipoEntrega === 2
                      ? 'Entrega Padrão'
                      : 'Entrega Especial'}
                  </td>
                  <td className={styles.MobileOcult}>
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
      </div>
    </>
  );
};

export default Finalizada;
