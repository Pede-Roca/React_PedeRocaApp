import React, { useEffect, useState } from 'react';
import styles from './Aberto.module.css';
import { Table, Form, InputGroup } from 'react-bootstrap';

const Aberto = ({ aberto }) => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [usuarioFiltrado, setUsuarioFiltrado] = useState([]);

  useEffect(() => {
    setUsuarioFiltrado(
      aberto.filter(compra => 
        compra.usuario?.nome.toLowerCase().includes(nomeUsuario.toLowerCase())
      )
    );
  }, [nomeUsuario, aberto]);

  const exportToCSV = () => {
    const csvData = [
      ["Usuário", "Itens", "Quantidade Total", "Status"],
      ...usuarioFiltrado.map(compra => [
        compra.usuario?.nome || "Sem Nome",
        compra.itensCarrinho.map(item => item.nomeProduto || "Sem Nome").join(" | "),
        compra.itensCarrinho.reduce((total, item) => total + item.quantidade, 0),
        compra.status || "Sem Status"
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pedidos_abertos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Pedidos em aberto</h2>
        <button className={styles.exportButton} onClick={exportToCSV}>
          <i className="bi bi-filetype-csv"> CSV</i>
        </button>
      </div>
      <div className={styles.barraTitulo}>Carrinhos ativos</div>
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
              <th>Itens do Carrinho</th>
              <th className={styles.MobileOcult}>Status do Pedido</th>
            </tr>
          </thead>
          <tbody>
            {usuarioFiltrado.length > 0 ? (
              usuarioFiltrado.map((compra, index) => (
                <tr key={index}>
                  <td>{compra.usuario?.nome || 'Usuário não especificado'}</td>
                  <td>
                    {compra.itensCarrinho.length > 0 ? (
                      <ul>
                        {compra.itensCarrinho.map((item, itemIndex) => (
                              <li key={itemIndex} className={styles.ProdutosDoCarrinho}>
                                <div className={styles.containerProdutos}>
                                  <p className={styles.nomeProduto}>{item.nomeProduto}</p>
                                  <p className={styles.quantidade}>x{item.quantidade}</p>
                                </div>
                            </li>
                        ))}
                      </ul>
                    ) : (
                      'Nenhum item no carrinho'
                    )}
                  </td>
                  <td className={styles.MobileOcult}>{compra.status ? 'Ativo' : 'Inativo'}</td>
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
    </>
  );
};

export default Aberto;