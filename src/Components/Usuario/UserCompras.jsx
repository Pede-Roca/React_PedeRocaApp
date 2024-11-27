import React, { useState, useEffect } from 'react';
import styles from "./Usuario.module.css";
import { buscarHistoricoDeCompraPorId, recomprarProdutosNoFront } from '../../services';

export const UserCompras = ({ onBack }) => {
  const [Carrinhos, setCarrinhos] = useState([]);

  const handleRecompra = async (carrinho) => {
    console.log("Recompra", carrinho);
    const { status, message, data } = await recomprarProdutosNoFront(carrinho);
    
    if(status) {
      alert('Os produtos foram adicionados no carrinho com sucesso!')
    } else {
      console.log('opa teve um erro aqui')
      console.log(data)
    }
  }

  useEffect(() => {
    const fetchCarrinhos = async () => {
      const histCarrinho = await buscarHistoricoDeCompraPorId();
      const ultimosCarrinhos = histCarrinho.slice(-4);
      setCarrinhos(ultimosCarrinhos);
    };
    fetchCarrinhos();
  }, []);

  return (
    <>
      {Carrinhos.length > 0 ? (
        <>
          {Carrinhos.map((carrinho, i) => {
            const valorTotal = carrinho.itensCarrinhoCompra.reduce((total, item) => {
              return total + item.preco * item.quantidade;
            }, 0);

            const allItemsInStock = carrinho.itensCarrinhoCompra.every(
              item => item.quantidade <= item.estoque
            );

            return (
              <div key={i} className={styles.carrinhoItem}>
                <div className={styles.containerHist}>
                  <p><strong>Data:</strong> {new Date(carrinho.data).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {carrinho.status ? "Ativo" : "Finalizado"}</p>
                </div>
                <div className={styles.itensCarrinho}>
                  <table className={styles.table}>
                    <thead>
                      <tr className={styles.cabecalhoTabela}>
                        <th>Produto</th>
                        <th>Qtd</th>
                        <th>Preço (R$)</th>
                        <th className={styles.ocultarColuna}>Estoque</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carrinho.itensCarrinhoCompra.map((item, index) => (
                        <tr key={index} className={styles.conteudoTabela}>
                          <td>{item.nomeProduto.length > 15 ? item.nomeProduto.substring(0, 12) + "..." : item.nomeProduto}</td>
                          <td>{item.quantidade}</td>
                          <td>{item.preco.toFixed(2)}</td>
                          <td className={styles.ocultarColuna}>{item.estoque}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-center">
                    <span className={styles.TotalValor}>R$ {valorTotal.toFixed(2)}</span>
                    <button
                      className={styles.btnRecompra}
                      disabled={!allItemsInStock}
                      onClick={() => handleRecompra(carrinho)}
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div>
          <h5>Nenhuma compra realizada</h5>
          <p>Realize uma compra para ter acesso ao seu histórico de compras.</p>
        </div>
      )}
      <button onClick={onBack} className={styles.btnBack}>
        <i className="bi bi-arrow-return-left"></i>
      </button>
    </>
  );
};
