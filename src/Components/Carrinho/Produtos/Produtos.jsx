import styles from '../Carrinho.module.css';
import { buscarItensDoCarrinhoPorUsuarioNoBackend, atualizarQuantidadeProdutoPedidoNoBackend, removerProdutoDoCarrinhoNoBackend } from '../../../services';
import { useEffect, useState } from 'react';

export const Produtos = () => {
    const [produtos, setProdutos] = useState([]);

    const atualizarQuantidadeProduto = async (idProdutoPedido, adicionar) => {
        const { status } = await atualizarQuantidadeProdutoPedidoNoBackend(idProdutoPedido, 1, adicionar);
        
        if (status) {
            const produtosAtualizados = await buscarItensDoCarrinhoPorUsuarioNoBackend();
            setProdutos(produtosAtualizados);
        }
    };

    const removerProduto = async (idProdutoPedido) => {
        const idCarrinhoCompra = sessionStorage.getItem("idCarrinho");
        const { status } = await removerProdutoDoCarrinhoNoBackend(idCarrinhoCompra, idProdutoPedido);
        
        if (status) {
            const produtosAtualizados = await buscarItensDoCarrinhoPorUsuarioNoBackend();
            setProdutos(produtosAtualizados);
        }
    };

    useEffect(() => {
        const fetchCarrinho = async () => {
            const produtos = await buscarItensDoCarrinhoPorUsuarioNoBackend();
            setProdutos(produtos);
        };
        fetchCarrinho();
    }, []);

    return (
        <div>
            {produtos.length > 0 ? ( // Verifica se existem produtos
                <>
                    <h5 className={styles.tituloCarrinho}>Itens do Carrinho</h5>
                    {produtos.map((produto, i) => (
                        <div key={i} className={styles.containerCarrinho}>
                            <button className={styles.lixeira} onClick={() => removerProduto(produto.idProdutoPedido)}>
                                <i className="bi bi-trash" id={styles.lixeira}></i>
                            </button>
                            <button
                                className={styles.btn_changeQuantityMinus}
                                onClick={() => atualizarQuantidadeProduto(produto.idProdutoPedido, false)}
                            >
                                <i className="bi bi-dash" id={styles.minus}></i>
                            </button>
                            <span className={styles.qtdProduto}>{produto.quantidade}</span>
                            <button
                                className={styles.btn_changeQuantityPlus}
                                onClick={() => atualizarQuantidadeProduto(produto.idProdutoPedido, true)}
                            >
                                <i className="bi bi-plus" id={styles.add}></i>
                            </button>
                            <span className={styles.nomeProduto}>{produto.nomeProduto}</span>
                            <span className={styles.precoProduto}>
                                R$ {(produto.preco * produto.quantidade).toFixed(2)}
                            </span>
                        </div>
                    ))}
                    <div className={styles.totalCarrinho}>
                        <p className={styles.precoTotal}>
                            <span className={styles.total}>Valor </span>
                            R${" "}
                            {produtos
                                .reduce(
                                    (total, produto) => total + produto.preco * produto.quantidade,
                                    0
                                )
                                .toFixed(2)
                            }
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.CarrinhoVazioContainer}>
                        <i className={`bi bi-cart-x ${styles.TamanhoIcone}`}></i>
                        <h5 className={styles.CarrinhoVazio}>Seu carrinho está vazio</h5>
                    </div>
                </>
            )}
        </div>
    );
};
