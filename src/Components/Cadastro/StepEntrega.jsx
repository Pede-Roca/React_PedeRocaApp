import styles from "./Cadastro.module.css";
import { useState } from "react";

const StepEntrega = ({
    cep,
    setCep,
    city,
    setCity,
    state,
    setState,
    neighborhood,
    setNeighborhood,
    street,
    setStreet,
    number,
    setNumber,
    complement,
    setComplement,
    handleCepChange,
    fieldError,
}) => {
    return (
        <div className={styles.containerDados}>
            <h5 className={styles.titulo}>Dados de Entrega</h5>

            <label className={styles.label}>
                <span className={styles.span}>CEP: </span>
                <input
                    type="text"
                    name="cep"
                    value={cep}
                    onChange={handleCepChange}
                    className="form-control"
                    placeholder="Digite seu CEP"
                />
            </label>
            <label className={styles.label}>
                <span className={styles.span}>Cidade: </span>
                <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control"
                />
            </label>
            <label className={styles.label}>
                <span className={styles.span}>Estado: </span>
                <input
                    type="text"
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="form-control"
                />
            </label>
            <label className={styles.label}>
                <span className={styles.span}>Bairro: </span>
                <input
                    type="text"
                    name="neighborhood"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="form-control"
                />
            </label>
            <label className={styles.label}>
                <span className={styles.span}>Rua: </span>
                <input
                    type="text"
                    name="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="form-control"
                />
            </label>
            <label className={styles.label}>
                <span className={styles.span}>Número: </span>
                <input
                    type="text"
                    name="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="form-control"
                />
            </label>
            <label className={styles.label}>
                <span className={styles.span}>Complemento: </span>
                <input
                    type="text"
                    name="complement"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    className="form-control"
                />
                {fieldError && (!cep || !city || !state || !neighborhood || !street || !number) && (
                    <span className={styles.erro}>Preencha todos os campos obrigatórios.</span>
                )}
            </label>
        </div>
    );
};

export default StepEntrega;
