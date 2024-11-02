import styles from "./Carrinho.module.css";
import { useEffect, useState } from "react";
import { Produtos } from "./Produtos/Produtos";
import { Endereco } from "./Endereco/Endereco";
import { Pagamento } from "./Pagamento/Pagamento";
import { Finalizacao } from "./Finalizacao/Finalizacao";
import { buscarItensDoCarrinhoPorUsuarioNoBackend, finalizarCompraNoBackend } from "../../services";

const Carrinho = ({ close }) => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('Economica');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [avisoPagamento, setAvisoPagamento] = useState(false);
  const [produtos, setProdutos] = useState([]);

  const setarProdutosNoSessionStorage = (produtos) => {
    sessionStorage.setItem("produtos", JSON.stringify(produtos));
  };

  useEffect(() => {
    const fetchCarrinho = async () => {
      const produtos = await buscarItensDoCarrinhoPorUsuarioNoBackend();
      setProdutos(produtos);
    };
    fetchCarrinho();
  }, []);

  useEffect(() => {
    if (step === 4 && !selectedPayment) {
      setAvisoPagamento(true);
      setStep(3);
    } else if (step === 4 && selectedPayment) {
      setAvisoPagamento(false);
    }
  }, [selectedPayment, step]);

  const handleBack = () => {
    setStep(step > 1 ? step - 1 : close());
  };

  const handleNext = async () => {
    try {
      if(step === 4) {
        const { status, message } = await finalizarCompraNoBackend();
        if(status) return alert(message);
      }
        
      setStep(step < 4 ? step + 1 : step);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <>
      <h1 className={styles.title}>Carrinho</h1>
      <div className={styles.containerEtapa}>
        <div className={styles.etapa}>
          <span className={`${styles.circle} ${step === 1 ? styles.active : ""}`}></span>
          <p>Produtos</p>
        </div>
        <span className={styles.CirculoE}></span>
        <div className={styles.etapa}>
          <span className={`${styles.circle} ${step === 2 ? styles.active : ""}`}></span>
          <p>Entrega</p>
        </div>
        <span className={styles.CirculoE}></span>
        <div className={styles.etapa}>
          <span className={`${styles.circle} ${step === 3 ? styles.active : ""}`}></span>
          <p>Pagamento</p>
        </div>
        <span className={styles.CirculoE}></span>
        <div className={styles.etapa}>
          <span className={`${styles.circle} ${step === 4 ? styles.active : ""}`}></span>
          <p>Finalização</p>
        </div>
      </div>
      {step === 1 && <Produtos />}
      {step === 2 && <Endereco selected={selectedOption} setSelected={setSelectedOption} />}
      {step === 3 && selectedOption && (
        <Pagamento selected={selectedPayment} setSelected={setSelectedPayment} aviso={avisoPagamento} />
      )}
      {step === 4 && selectedOption && selectedPayment && (
        <Finalizacao frete={selectedOption} pagamento={selectedPayment} produtos={produtos} />
      )}
      <div className={styles.containerBtn}>
        <button className={styles.btnBack} onClick={handleBack}>
          <i className="bi bi-arrow-return-left"></i>
        </button>
        <button className={styles.btnNext} onClick={handleNext}>
          <i className="bi bi-check-lg"></i>
        </button>
      </div>
    </>
  );
};

export default Carrinho;
