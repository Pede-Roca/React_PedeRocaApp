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

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.header}>
        <h2>Produtos mais vendidos</h2>
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
