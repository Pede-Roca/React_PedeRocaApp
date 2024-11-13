import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { buscarProdutosTop10NoBackend } from '../../../services';
import styles from '../Produtos/Produtos.module.css';

const ProdutosTop10 = () => {

  const [produtos, setProdutos] = useState([]);
  
  const fetchProdutos = async () => {
    try {
      const data = await buscarProdutosTop10NoBackend();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const exportToCSV = () => {
    const csvData = [
      ["Nome", "Quantidade vendida", "Valor total"],
      ...produtos.map((produto) => [
        produto.nomeProduto,
        produto.quantidadeVendida,
        produto.valorTotal?.toFixed(2)
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "produtos_top10.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className={styles.header}>
        <h2>Produtos mais vendidos</h2>
        <button className={styles.exportButton} onClick={exportToCSV}>
        <i className="bi bi-filetype-csv"></i>
        </button>
      </div>
      <div className={styles.barraTitulo}>Top 10</div>
      {produtos.length > 0 ? (
        <Table bordered hover className={styles.userTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Nome</th>
              <th>Quantidade vendida</th>
              <th>Valor total</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.idProduto}>
                <td>{produto.nomeProduto}</td>
                <td>{produto.quantidadeVendida}</td>
                <td>{produto.valorTotal?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className={styles.msgVazia}>A lista de produtos está vazia.</div>
      )}
    </div>
  );
};

export default ProdutosTop10;