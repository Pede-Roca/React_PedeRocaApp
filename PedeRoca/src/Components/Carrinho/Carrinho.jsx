import React, { useEffect } from "react";
import styles from "./Carrinho.module.css";
import { useState } from "react";

const Carrinho = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [produtos, setProdutos] = useState([
    { nome: "Alface", preco: 2.5, quantidade: 1 },
    { nome: "Cenoura", preco: 3.2, quantidade: 2 },
    { nome: "Tomate", preco: 1.5, quantidade: 1 },
    { nome: "Cebola", preco: 4.5, quantidade: 1 },
    { nome: "Batata", preco: 9.5, quantidade: 1 },
  ]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className={styles.containerEtapa}>
        <div className={styles.etapa}>
          <span
            className={`${styles.circle} ${step == 1 ? styles.active : ""}`}
          ></span>
          <p>Produtos</p>
        </div>
        <div className={styles.etapa}>
          <span
            className={`${styles.circle} ${step == 2 ? styles.active : ""}`}
          ></span>
          <p>Entrega</p>
        </div>
        <div className={styles.etapa}>
          <span
            className={`${styles.circle} ${step == 3 ? styles.active : ""}`}
          ></span>
          <p>Pagamento</p>
        </div>
        <div className={styles.etapa}>
          <span
            className={`${styles.circle} ${step == 4 ? styles.active : ""}`}
          ></span>
          <p>Finalização</p>
        </div>
        <span className={styles.linhaProgresso}></span>
      </div>
      {step === 1 && (
        <div>
          <h5 className={styles.tituloCarrinho}>Itens do Carrinho</h5>
          {produtos.map((produto) => (
            <div className={styles.containerCarrinho}>
              <button className={styles.lixeira}>
                <i className="bi bi-trash" id={styles.lixeira}></i>
              </button>
              <span>
                <i className="bi bi-dash" id={styles.minus}></i>
              </span>
              <span className={styles.qtdProduto}>{produto.quantidade}</span>
              <span>
                <i className="bi bi-plus" id={styles.add}></i>
              </span>
              <span className={styles.nomeProduto}>{produto.nome}</span>
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
                  (total, produto) =>
                    total + produto.preco * produto.quantidade,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h5 className={styles.tituloCarrinho}>Endereço de entrega</h5>
          <div className={styles.containerDadosEndereco}>
            <span className={styles.endLabel}>Rua</span>
            <p className={styles.endCampo}>Av. Humberto de onofre</p>
          </div>
          <div className={styles.containerDadosEndereco}>
            <span className={styles.endLabel}>Bairro</span>
            <p className={styles.endCampo}>Jardim Botâncio</p>
          </div>
          <div className={styles.containerDadosEndereco}>
            <span className={styles.endLabel}>Cidade</span>
            <p className={styles.endCampo}>Araraquara</p>
          </div>
          <div className={styles.containerDadosEndereco}>
            <span className={styles.endLabel}>Numero</span>
            <p className={styles.endCampo}>48</p>
          </div>
          <button id={styles.btnAlterar}>
            <i className="bi bi-journal-medical"></i> Alterar
          </button>
          <h5 className={styles.tituloCarrinho}>Tipo de entrega</h5>
          <div className={styles.containerTipoEntrega}>
            <label className={styles.checkboxLabel}>
              <input
                type="radio"
                name="Entrega Economica"
                value="Economica"
                onClick={handleOptionChange}
              />{" "}
              Econîmica (1 a 3 dias)
            </label>
            <p className={styles.precoCkb}>R$ 4,00</p>
          </div>
          <div className={styles.containerTipoEntrega}>
            <label className={styles.checkboxLabel}>
              <input
                type="radio"
                name="Entrega Economica"
                value="Rapida"
                onClick={handleOptionChange}
              />{" "}
              Rápida (máximo 50 minutos)
            </label>
            <p className={styles.precoCkb}>R$ 15,00</p>
          </div>
          <div className={styles.containerTipoEntrega}>
            <label className={styles.checkboxLabel}>
              <input
                type="radio"
                name="Entrega Economica"
                value="Agendada"
                onClick={handleOptionChange}
              />{" "}
              Agendada
            </label>
            <p className={styles.precoCkb}>R$ 6,00</p>
          </div>
        </div>
      )}
      {step === 3 && selectedOption && (
        <div>
          <h5 className={styles.tituloCarrinho}>Forma de pagamento</h5>
        </div>
      )}
      {step === 4 && selectedOption && (
        <div>
          <h5 className={styles.tituloCarrinho}>Finalização</h5>
        </div>
      )}
      <div className={styles.containerBtn}>
        <button
          className={styles.btnBack}
          onClick={() => setStep(step > 1 ? step - 1 : step)}
        >
          <i className="bi bi-arrow-return-left"></i>
        </button>
        <button
          className={styles.btnNext}
          onClick={() => setStep(step < 4 ? step + 1 : step)}
        >
          <i className="bi bi-check-lg"></i>
        </button>
      </div>
    </>
  );
};

export default Carrinho;
