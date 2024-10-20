import React from 'react'
import styles from '../Carrinho.module.css'
import pix from "../../../assets/pix.svg";
import boleto from "../../../assets/boleto.svg";
import card from "../../../assets/card.svg";

export const Pagamento = ({ selected, setSelected, aviso }) => {
    const handlePaymentChange = (e) => {
        setSelected(e.target.value);
    }

    return (
        <div>
            <h5 className={styles.tituloCarrinho}>Forma de pagamento</h5>
            <section className={styles.containerPagamento}>
                <input
                    type="radio"
                    name="pagamento"
                    value="Cartão"
                    onChange={handlePaymentChange}  // Substituído onClick por onChange
                    checked={selected === "Cartão"}
                />
                <div>
                    <img src={card} alt="Cartão" className={styles.iconePagamento} />
                    <p className={styles.textoPagamento}>Cartão</p>
                </div>
            </section>
            <section className={styles.containerPagamento}>
                <input
                    type="radio"
                    name="pagamento"
                    value="Pix"
                    onChange={handlePaymentChange}  // Substituído onClick por onChange
                    checked={selected === "Pix"}
                />
                <div>
                    <img src={pix} alt="Pix" className={styles.iconePagamento} />
                    <p className={styles.textoPagamento}>Pix</p>
                </div>
            </section>
            <section className={styles.containerPagamento}>
                <input
                    type="radio"
                    name="pagamento"
                    value="Boleto"
                    onChange={handlePaymentChange}  // Substituído onClick por onChange
                    checked={selected === "Boleto"}
                />
                <div>
                    <img
                        src={boleto}
                        alt="boleto bancário"
                        className={styles.iconePagamento}
                    />
                    <p className={styles.textoPagamento}>Boleto</p>
                </div>
            </section>
            {aviso && (
                <p className={styles.aviso}>Selecione um método de pagamento</p>
            )}
        </div>
    )
}
