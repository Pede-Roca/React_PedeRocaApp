import React, { useEffect, useState } from 'react';
import styles from '../Carrinho.module.css';
import { buscarEnderecoPorIdDoUsuarioNoBackend } from '../../../services';

export const Endereco = ({selected, setSelected}) => {
    const [address, setAddress] = useState({});
    const [avisoEntrega, setAvisoEntrega] = useState(false);

    const handleOptionChange = (e) => {
        setSelected(e.target.value);
        setAvisoEntrega(false);
    };

    const findAddress = async () => {
        const enderecoEncontrado = await buscarEnderecoPorIdDoUsuarioNoBackend();
        setAddress(enderecoEncontrado);
    }

    useEffect(() => {
        findAddress();
    }, []);

    return (
        <div>
            <h5 className={styles.tituloCarrinho}>Endereço de entrega</h5>
            <div className={styles.containerDadosEndereco}>
                <span className={styles.endLabel}>Rua</span>
                <p className={styles.endCampo}>{address.logradouro}</p>
            </div>
            <div className={styles.containerDadosEndereco}>
                <span className={styles.endLabel}>Bairro</span>
                <p className={styles.endCampo}>{address.bairro}</p>
            </div>
            <div className={styles.containerDadosEndereco}>
                <span className={styles.endLabel}>Cidade</span>
                <p className={styles.endCampo}>{address.cidade}</p>
            </div>
            <div className={styles.containerDadosEndereco}>
                <span className={styles.endLabel}>Número</span>
                <p className={styles.endCampo}>{address.numero}</p>
            </div>
            <div className={styles.containerDadosEndereco}>
                <span className={styles.endLabel}>CEP</span>
                <p className={styles.endCampo}>{address.cep}</p>
            </div>

            <button id={styles.btnAlterar}>
                <i className="bi bi-journal-medical"></i> 
                Alterar
            </button>
            <h5 className={styles.tituloCarrinho}>Tipo de entrega</h5>
            <div className={styles.containerTipoEntrega}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="radio"
                        name="tipoEntrega" // Alterado para um nome mais representativo
                        value="Economica"
                        onChange={handleOptionChange}
                        checked={selected === "Economica"}
                    />{" "}
                    Econômico (1 a 3 dias)
                </label>
                <p className={styles.precoCkb}>R$ 4,00</p>
            </div>
            <div className={styles.containerTipoEntrega}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="radio"
                        name="tipoEntrega"
                        value="Rapida"
                        onChange={handleOptionChange}
                        checked={selected === "Rapida"}
                    />{" "}
                    Rápida (máximo 50 minutos)
                </label>
                <p className={styles.precoCkb}>R$ 15,00</p>
            </div>
            <div className={styles.containerTipoEntrega}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="radio"
                        name="tipoEntrega"
                        value="Agendada"
                        onChange={handleOptionChange}
                        checked={selected === "Agendada"}
                    />{" "}
                    Agendada
                </label>
                <p className={styles.precoCkb}>R$ 6,00</p>
            </div>
            {avisoEntrega && (
                <p className={styles.aviso}>Selecione uma forma de entrega</p>
            )}
        </div>
    );
};