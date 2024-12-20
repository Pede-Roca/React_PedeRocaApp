import { useState } from "react";
import { Toast, Placeholder, Card } from "react-bootstrap";
import styles from "../Produtos.module.css";
import { adicionarProdutoNoCarrinho } from "../../../services";
import { useAuthValue } from "../../../context/AuthContext";
import { useAuth } from "../../Usuario/useAuth";
import { favoritarProdutoNoBackend, desfavoritarProdutoNoBackend } from "../../../services";

const Produto = ({ produto, i, setProductInCart, updateProductList }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastColor, setToastColor] = useState("#7C8C03");
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
                    updateProductList();
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
            <div
            className={
                produto.fatorPromocao < 1
                ? `${styles.posicaoPrecoPromocional}`
                : `${styles.posicaoPreco}`
            }
            >
            <span id="precoProduto">
                R$ {formatPrice(produto.preco * produto.fatorPromocao)} {produto.fatorPromocao < 1 && <> | {((1 - produto.fatorPromocao) * 100).toFixed(0)}% OFF</>}
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
                    <span className="d-none">Categoria: {produto.idCategoria}</span>
                    {produto.descricao}
                    <br />
                    <span className={styles.qtdEstoque}>Máximo: {produto.estoque}</span>             
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
                <button
                    type="button"
                    className={`d-md-none ${styles.btnMenos}`}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Diminuir quantidade"
                >
                    <i className="bi bi-dash-circle"></i>
                </button>
                <input
                    className={`inputBorda ${styles.quantidadeProduto}`}
                    type="number"
                    min="1"
                    name="quantidadeProduto"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    placeholder="Qtd"
                    required
                    aria-label="Quantidade de produto"
                />
                <button
                    type="button"
                    className={`d-md-none ${styles.btnMais}`}
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Aumentar quantidade"
                >
                    <i className="bi bi-plus-circle"></i>
                </button>
                <button
                    type="submit"
                    className={`inputBorda ${styles.btn_addcarrinho}`}
                    aria-label="Adicionar ao Carrinho"
                >
                    <i className="bi bi-cart2"></i> Carrinho
                </button>
            </form>
            </div>

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
        </div>
    );
};

export default Produto;