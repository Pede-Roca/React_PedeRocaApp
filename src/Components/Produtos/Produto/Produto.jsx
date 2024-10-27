import { useState } from "react";
import { Toast, Placeholder, Card } from "react-bootstrap";
import styles from "../Produtos.module.css";
import { adicionarProdutoNoCarrinho } from "../../../services";
import { useAuthValue } from "../../../context/AuthContext";
import { useAuth } from "../../Usuario/useAuth";
import { favoritarProdutoNoBackend, desfavoritarProdutoNoBackend } from "../../../services";

const Produto = ({ produto, i, setProductInCart }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastColor, setToastColor] = useState("green");
    const [quantity, setQuantity] = useState(1);
    const { user } = useAuthValue();
    const { backendUserId } = useAuth();

    const handleFavorito = async () => {
        if (produto.favorito) {
            try {
                const data = await desfavoritarProdutoNoBackend(produto.idFavorito);
                if (data) {
                    setProductInCart((prevProdutos) => {
                        return prevProdutos.map((prod) =>
                            prod.id === produto.id ? { ...produto, favorito: false, idFavorito: null } : prod
                        );
                    });
                }
            } catch (error) {
                console.error("Erro ao desregistrar o produto favorito:", error);
            }
        } else {
            const produtoFavorito = {
                idProduto: produto.id,
                idUsuario: backendUserId
            };
            try {
                const data = await favoritarProdutoNoBackend(produtoFavorito);
                if (data) {
                    setProductInCart((prevProdutos) => {
                        return prevProdutos.map((prod) =>
                            prod.id === produto.id ? { ...produto, favorito: true, idFavorito: data.id } : prod
                        );
                    });
                }
            } catch (error) {
                console.error("Erro ao registrar o produto favorito:", error);
            }
        }
    };

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
            <div className={styles.posicaoPreco}>
                <span id="precoProduto">
                    R$ {formatPrice(produto.preco)}
                </span>
            </div>

            {user &&
                <div className={styles.posicaoFavorito}>
                    <button id={styles.boxFavoritoF1} aria-label="Favoritar produto" onClick={() => handleFavorito()}>
                        {produto.favorito ? (
                            <i className="bi bi-heart-fill" id={styles.tamanhoFavorito}></i>
                        ) : (
                            <i className="bi bi-heart" id={styles.tamanhoFavorito}></i>
                        )}
                    </button>
                </div>
            }

            <div className={styles.imagemVenda}>
                {produto.uidFoto == "" && (
                    <img
                        src="https://placehold.co/800x800?text=Imagem+Indisponível"
                        alt={`Imagem de ${produto.nome}`}
                        className={styles.tamanhoImgVenda}
                    />
                )}
                {produto.uidFoto !== "" && (
                    <img
                        src={produto.uidFoto}
                        alt={`Imagem de ${produto.nome}`}
                        className={styles.tamanhoImgVenda}
                    />
                )}
            </div>

            <hr />

            <div className={styles.nomeProduto} >
                <h5>{produto.nome}</h5>
                <p>
                    {produto.descricao}
                    <br />
                    <span className="d-none">Categoria: {produto.idCategoria}</span>
                </p>
            </div>

            <hr />

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
                        aria-label="Adicionar ao Carrinho"
                    >
                        <i class="bi bi-plus-circle"></i> Carrinho
                    </button>
                </form>
            </div>

            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                className={styles.toast}
                style={{ backgroundColor: toastColor }}
            >
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </div>
    );
};

export default Produto;