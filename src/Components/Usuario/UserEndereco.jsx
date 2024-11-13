import React, { useState, useEffect } from "react";
import styles from "./Usuario.module.css";
import { useAuth } from "./useAuth";
import { buscarEnderecoPorIdDoUsuarioNoBackend } from "../../services";

export const UserEndereco = ({ onBack }) => {
    const [enderecos, setEnderecos] = useState([]);
    const [selectedEnderecoIndex, setSelectedEnderecoIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Estado para armazenar a mensagem de erro
    const { backendUserId } = useAuth();

    useEffect(() => {
        const fetchEnderecos = async () => {
            const enderecosUsuario = await buscarEnderecoPorIdDoUsuarioNoBackend(backendUserId);
            setEnderecos(Array.isArray(enderecosUsuario) ? enderecosUsuario : [enderecosUsuario]);
        };
        fetchEnderecos();
    }, [backendUserId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEnderecos((prevEnderecos) =>
            prevEnderecos.map((endereco, index) =>
                index === selectedEnderecoIndex ? { ...endereco, [name]: value } : endereco
            )
        );
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleDelete = () => {
        if (enderecos.length > 1) {
            setEnderecos((prevEnderecos) => prevEnderecos.filter((_, index) => index !== selectedEnderecoIndex));
            setSelectedEnderecoIndex(0);
            setErrorMessage("");
        } else {
            setErrorMessage("Você não pode excluir o único endereço."); 
        }
    };

    return (
        <div className={styles.Dados}>
            <div className={styles.tituloEndereco}>
                <label htmlFor="endereco-select" className={styles.labelEndereco}>Selecionar Endereço</label>
                <select
                    id="endereco-select"
                    value={selectedEnderecoIndex}
                    onChange={(e) => setSelectedEnderecoIndex(Number(e.target.value))}
                    className={styles.selectEndereco}
                >
                    {enderecos.map((_, index) => (
                        <option key={index} value={index}>
                            Endereço {index + 1}
                        </option>
                    ))}
                </select>
                <button className={styles.btnAdicionar}><i className="bi bi-plus-circle"></i> Novo</button>
            </div>

            {enderecos[selectedEnderecoIndex] && (
                <div>
                    <label htmlFor="cep" className={styles.label}>CEP</label>
                    <input
                        type="text"
                        name="cep"
                        value={enderecos[selectedEnderecoIndex].cep || ''}
                        onChange={handleInputChange}
                        className={styles.input}
                        disabled={!isEditing}
                    />

                    <label htmlFor="logradouro" className={styles.label}>Rua</label>
                    <input
                        type="text"
                        name="logradouro"
                        value={enderecos[selectedEnderecoIndex].logradouro || ''}
                        onChange={handleInputChange}
                        className={styles.input}
                        disabled={!isEditing}
                    />

                    <label htmlFor="bairro" className={styles.label}>Bairro</label>
                    <input
                        type="text"
                        name="bairro"
                        value={enderecos[selectedEnderecoIndex].bairro || ''}
                        onChange={handleInputChange}
                        className={styles.input}
                        disabled={!isEditing}
                    />

                    <label htmlFor="numero" className={styles.label}>Número</label>
                    <input
                        type="text"
                        name="numero"
                        value={enderecos[selectedEnderecoIndex].numero || ''}
                        onChange={handleInputChange}
                        className={styles.input}
                        disabled={!isEditing}
                    />

                    <label htmlFor="cidade" className={styles.label}>Cidade</label>
                    <input
                        type="text"
                        name="cidade"
                        value={enderecos[selectedEnderecoIndex].cidade || ''}
                        onChange={handleInputChange}
                        className={styles.input}
                        disabled={!isEditing}
                    />

                    <label htmlFor="uf" className={styles.label}>Estado</label>
                    <input
                        type="text"
                        name="uf"
                        value={enderecos[selectedEnderecoIndex].uf || ''}
                        onChange={handleInputChange}
                        className={styles.input}
                        disabled={!isEditing}
                    />
                    <div className="d-flex justify-content-center">
                        <button onClick={toggleEditing} className={styles.btnAlterar}>
                            {isEditing ? "Salvar" : "Editar"}
                        </button>
                        <button
                            onClick={handleDelete}
                            className={styles.btnExcluir}
                            disabled={enderecos.length === 1} 
                        >
                            Excluir
                        </button>
                    </div>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                </div>
            )}
            <button onClick={onBack} className={styles.btnBack}>
                <i className="bi bi-arrow-return-left"></i>
            </button>
        </div>
    );
};
