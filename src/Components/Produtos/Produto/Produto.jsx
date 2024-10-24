import { useState } from "react";
import { Toast } from "react-bootstrap";
import styles from "../Produtos.module.css";
import { adicionarProdutoNoCarrinho } from "../../../services";

const Produto = ({ produto, i }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastColor, setToastColor] = useState("green");
    const [quantity, setQuantity] = useState(1);

    const handleShowToast = (message, color) => {
        setToastMessage(message);
        setToastColor(color);
        setShowToast(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const quantity = parseInt(e.target.quantidadeProduto.value, 10);

        if (quantity > 0) {
            if (quantity > produto.estoque) {
                handleShowToast("Quantidade indisponível no estoque", "#dc3545");
                return;
            }

            try {
                const { status, message } = await adicionarProdutoNoCarrinho(quantity, produto.id);

                if (status) {
                    handleShowToast(message, "#28a745");
                } else {
                    handleShowToast("Erro ao adicionar produto ao carrinho", "#dc3545");
                }

                setQuantity(1);
            } catch (error) {
                handleShowToast("Erro ao processar o pedido", "#dc3545");
            }
        }
    };

    const formatPrice = (price) => {
        return price.toFixed(2).replace(".", ",");
    };

    return (
        <div className={styles.geralCard}>
            {/* Preço */}
            <div className={styles.posicaoPreco}>
                <span id="precoProduto">
                    R$ {formatPrice(produto.preco)}
                </span>
            </div>

            {/* Favorito */}
            <div className={styles.posicaoFavorito}>
                <button id={styles.boxFavoritoF1} aria-label="Favoritar produto">
                    <i className="bi bi-heart" id={styles.tamanhoFavorito}></i>
                </button>
            </div>

            {/* Imagem */}
            <div className={styles.imagemVenda}>
                <img
                    src={produto.uidFoto}
                    alt={`Imagem de ${produto.nome}`}
                    className={styles.tamanhoImgVenda}
                />
            </div>

            <hr />

            {/* Nome e Descrição */}
            <div className={styles.nomeProduto} >
                <h5>{produto.nome}</h5>
                <p>
                    {produto.descricao}
                    <br />
                    <span className="d-none">Categoria: {produto.idCategoria}</span>
                </p>
            </div>

            <hr />

            {/* Formulário de Quantidade */}
            <div className={styles.qtdTotalCompraCarrinho}>
                <form
                    className="input-group"
                    role="group"
                    aria-label="Grupo de entrada de quantidade"
                    onSubmit={handleSubmit}
                >
                    <input
                        className={`inputBorda ${styles.quantidadeProduto}`}
                        type="number"
                        min="1"
                        name="quantidadeProduto"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Qtd"
                        required
                        aria-label="Quantidade de produto"
                    />
                    <button
                        type="submit"
                        className={`inputBorda ${styles.btn_addcarrinho}`}
                        aria-label="Adicionar ao carrinho"
                    >
                        <i className="bi bi-cart-plus"></i> Adicionar
                    </button>
                </form>
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
                    backgroundColor: toastColor,
                    color: "white",
                    fontSize: "1rem",
                }}
            >
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </div>
    );
};

export default Produto;
