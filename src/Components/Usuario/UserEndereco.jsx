// Componente UserEndereco
import React, { useState, useEffect } from "react";
import styles from "./Usuario.module.css";
import { useFetchUserData } from "./useFetchUserData";
import { useAuth } from "./useAuth";

export const UserEndereco = ({ onBack }) => {
    const { userId, backendUserId } = useAuth();
    const { enderecoData } = useFetchUserData(userId, backendUserId);
    const [endereco, setEndereco] = useState({});

    useEffect(() => {
        setEndereco(enderecoData);
    }, [enderecoData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEndereco((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.Dados}>
            <label htmlFor="cep" className={styles.label}>CEP</label>
            <input
                type="text"
                name="cep"
                value={endereco.cep || ''}
                onChange={handleInputChange}
                className={styles.input}
            />

            <label htmlFor="logradouro" className={styles.label}>Rua</label>
            <input
                type="text"
                name="logradouro"
                value={endereco.logradouro || ''}
                onChange={handleInputChange}
                className={styles.input}
            />

            <label htmlFor="bairro" className={styles.label}>Bairro</label>
            <input
                type="text"
                name="bairro"
                value={endereco.bairro || ''}
                onChange={handleInputChange}
                className={styles.input}
            />

            <label htmlFor="numero" className={styles.label}>Número</label>
            <input
                type="text"
                name="numero"
                value={endereco.numero || ''}
                onChange={handleInputChange}
                className={styles.input}
            />

            <label htmlFor="cidade" className={styles.label}>Cidade</label>
            <input
                type="text"
                name="cidade"
                value={endereco.cidade || ''}
                onChange={handleInputChange}
                className={styles.input}
            />

            <label htmlFor="uf" className={styles.label}>Estado</label>
            <input
                type="text"
                name="uf"
                value={endereco.uf || ''}
                onChange={handleInputChange}
                className={styles.input}
            />

            <button onClick={onBack} className={styles.btnBack}>
                <i className="bi bi-arrow-return-left"></i>
            </button>
        </div>
    );
};
