import React, { useEffect } from "react";
import styles from "./Carrinho.module.css";
import { useState } from "react";
import pix from "../../assets/pix.svg";
import boleto from "../../assets/boleto.svg";
import card from "../../assets/card.svg";

const Carrinho = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [avisoEntrega, setAvisoEntrega] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [avisoPagamento, setAvisoPagamento] = useState(false);
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

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  useEffect(() => {
    if (step === 3 && !selectedOption) {
      setAvisoEntrega(true);
      setStep(2);
    } else if (step === 3 && selectedOption) {
      setAvisoEntrega(false);
    }
  }, [selectedOption, step]);

  useEffect(() => {
    if (step === 4 && !selectedPayment) {
      setAvisoPagamento(true);
      setStep(3);
    } else if (step === 4 && selectedPayment) {
      setAvisoPagamento(false);
    }
  }, [selectedPayment, step]);

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
          {produtos.map((produto, i) => (
            <div key={i} className={styles.containerCarrinho}>
              <button className={styles.lixeira}>
                <i className="bi bi-trash" id={styles.lixeira}></i>
              </button>
              <button className={styles.btn_changeQuantityMinus}>
                <i className="bi bi-dash" id={styles.minus}></i>
              </button>
              <span className={styles.qtdProduto}>{produto.quantidade}</span>
              <button className={styles.btn_changeQuantityPlus}>
                <i className="bi bi-plus" id={styles.add}></i>
              </button>
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
                checked={selectedOption === "Economica"}
              />{" "}
              Econômico (1 a 3 dias)
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
                checked={selectedOption === "Rapida"}
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
                checked={selectedOption === "Agendada"}
              />{" "}
              Agendada
            </label>
            <p className={styles.precoCkb}>R$ 6,00</p>
          </div>
          {avisoEntrega && (
            <p className={styles.aviso}>Selecione uma forma de entrega</p>
          )}
        </div>
      )}
      {step === 3 && selectedOption && (
        <>
          <h5 className={styles.tituloCarrinho}>Forma de pagamento</h5>
          <section className={styles.containerPagamento}>
            <input
              type="radio"
              name="pagamento"
              value="Cartão"
              onClick={handlePaymentChange}
              checked={selectedPayment === "Cartão"}
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
              onClick={handlePaymentChange}
              checked={selectedPayment === "Pix"}
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
              onClick={handlePaymentChange}
              checked={selectedPayment === "Boleto"}
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
          {avisoPagamento && (
            <p className={styles.aviso}>Selecione um método de pagamento</p>
          )}
        </>
      )}
      {step === 4 && selectedOption && selectedPayment && (
        <>
          <h5 className={styles.tituloCarrinho}>Finalização</h5>
          <h5 className={styles.sumario}>Sumário</h5>
          <div className={styles.contFinalizacao}>
            <p>Produtos</p>
            <span>R$ 11,00</span>
          </div>
          <div className={styles.contFinalizacao}>
            <p>Frete</p>
            <span>R$ 5,00</span>
          </div>
          <div className={styles.contFinalizacao}>
            <p>Total</p>
            <span>R$ 16,00</span>
          </div>
          <div>
            <p className={styles.textoNome}>Gabriel Pelicolla</p>
            <p className={styles.texto}>
              Rua 9 de julho, centro, 485, Araraquara - SP
            </p>
            <p className={styles.texto}>CEP: 14.800.254</p>
          </div>
          <div className={styles.contEndereco}>
            <p>gpelicolla@gmail.com</p>
            <p>CPF: 455.456.977-01</p>
          </div>
          <section className={styles.especEntrega}>
            <p>Expectativa de entrega</p>
            <p>Sexta-Feira - 21/06/2024</p>
          </section>
        </>
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
