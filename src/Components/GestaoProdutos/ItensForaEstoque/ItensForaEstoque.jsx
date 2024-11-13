import React, { useState, useEffect } from 'react'
import styles from './ItensForaEstoque.module.css'
import { buscarProdutosSemEstoqueNoBackend, alterarStatusProduto } from '../../../services/produto.service'
import { Table,  Button, Toast } from "react-bootstrap";

const ItensForaEstoque = () => {
    const [produtos, setProdutos] = useState([])
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const produtosForaStock = async () => {
        const data = await buscarProdutosSemEstoqueNoBackend()
        setProdutos(data)
    }

    const handleToggleStatus = async (id) => {
        const produto = produtos.find((produto) => produto.id === id);
        const novoStatus = !produto.status;
      
        try {
          const response = await alterarStatusProduto(id, novoStatus);
          if (response) {
            setProdutos((prevProdutos) =>
              prevProdutos.map((p) =>
                p.id === id ? { ...p, status: novoStatus } : p
              )
            );
            handleShowToast("Status do produto atualizado!", "#7C8C03");
          }
        } catch (error) {
          console.error("Erro ao alterar o status do produto:", error);
          handleShowToast("Erro ao alterar o status do produto.", "#A60303");
        }
      };
    
    const handleShowToast = (message, color) => {
        setToastMessage(message);
        setToastColor(color);
        setShowToast(true);
      };

    useEffect(() => {
        produtosForaStock()
    }, [])
      
    const exportToCSV = () => {
        const csvData = [
            ["Status", "Nome", "Quantidade"],
            ...produtos.map((produto) => [
                produto.status ? "Ativo" : "Inativo",
                produto.nome,
                produto.estoque
            ])
        ];

        const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "produtos_fora_estoque.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
        <>
            <div className={styles.header}>
                <h2>Gestão de Estoque</h2>
                <button className={styles.exportButton} onClick={exportToCSV}>
                    <i class="bi bi-filetype-csv"></i>
                </button>
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

                  {/* Toast para exibir mensagem de sucesso/erro */}
            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 1050,
                backgroundColor: "#7C8C03",
                color: "white",
                fontSize: "1rem",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                }}
            >
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </>
    )
}

export default ItensForaEstoque
