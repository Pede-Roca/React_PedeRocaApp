import React, { useState, useEffect } from 'react'
import styles from './ItensForaEstoque.module.css'
import { buscarProdutosSemEstoqueNoBackend } from '../../../services/produto.service'
import { Table,  Button } from "react-bootstrap";

const ItensForaEstoque = () => {
    const [produtos, setProdutos] = useState([])

    const produtosForaStock = async () => {
        const data = await buscarProdutosSemEstoqueNoBackend()
        setProdutos(data)
    }

    const handleToggleStatus = (id) => {
        setProdutos((prevProdutos) =>
          prevProdutos.map((produto) =>
            produto.id === id ? { ...produto, status: !produto.status } : produto
          )
        );
      };

    useEffect(() => {
        produtosForaStock()
    }, [])
    
    return (
        <>
            <div className={styles.header}>
                <h2>Gestão de Estoque</h2>
            </div>
            <div className={styles.barraTitulo}>Produtos fora de estoque</div>
            <div className={styles.scrollContainer}>
                <Table striped bordered hover className={styles.userTable}>
                    <thead>
                        <tr className={styles.tableHeader}>
                            <th>Status</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id}>
                                <td>
                                <Button
                                    variant="light"
                                    onClick={() => handleToggleStatus(produto.id)}
                                    className={styles.statusToggle}
                                    >
                                    {produto.status ? (
                                        <i className="bi bi-toggle-on" id={styles.ativo}></i>
                                    ) : (
                                        <i className="bi bi-toggle-off" id={styles.inativo}></i>
                                    )}
                                </Button>
                                </td>
                                <td>{produto.nome}</td>
                                <td>{produto.estoque}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ItensForaEstoque
