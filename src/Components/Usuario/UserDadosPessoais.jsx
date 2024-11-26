import React, { useState, useEffect, useRef } from "react";
import styles from "./Usuario.module.css";
import { useFetchUserData } from "./useFetchUserData";
import { useAuth } from "./useAuth";
import { atualizarDadosPerfilUsuarioNoBackend } from '../../services';

export const UserDadosPessoais = ({ onBack }) => {
    const { userId, backendUserId } = useAuth();
    const { userData } = useFetchUserData(userId, backendUserId);

    const [formData, setFormData] = useState({
        id: "",
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
    });

    const removerMascaraTelefone = (telefone) => {
        return telefone.replace(/\D/g, '');
    };

    const aplicarMascaraTelefone = (telefone) => {
        if (!telefone) return "";
        const apenasNumeros = telefone.replace(/\D/g, '');
        return apenasNumeros
            .replace(/^(\d{2})(\d)/, '($1) $2') 
            .replace(/(\d{5})(\d)/, '$1-$2') 
            .slice(0, 15);
    };

    const removerMascaraCPF = (cpf = "") => {
        return cpf.replace(/\D/g, '');
    };

    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        if (userData) {
            setFormData({
                id: userData.id || "",
                nome: userData.nome || "",
                cpf: userData.cpf || "",
                email: userData.email || "",
                telefone: userData.telefone || "",
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEdit = () => {
        setIsEditable((prev) => !prev);
    };

    const handleSave = async () => {
        const { id, ...formDataWithoutId } = formData;

        const payload = {
            ...formDataWithoutId,
            cpf: removerMascaraCPF(formData.cpf),
            telefone: removerMascaraTelefone(formData.telefone),
        };

        const data = await atualizarDadosPerfilUsuarioNoBackend(id, payload);

        console.log("Usuário atualizado com sucesso!", data);

        setIsEditable(false);
    };

    return (
        <div>
            {userData && (
                <div key={userData.id} className={styles.Dados}>
                    <label htmlFor="nome" className={styles.label}>Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        disabled={!isEditable}
                        className={styles.input}
                        onChange={handleChange}
                    />

                    <label htmlFor="cpf" className={styles.label}>CPF</label>
                    <input
                        type="text"
                        name="cpf"
                        value={formData.cpf}
                        disabled
                        className={styles.input}
                    />

                    <label htmlFor="telefone" className={styles.label}>Telefone</label>
                    <input
                        type="text"
                        name="telefone"
                        value={aplicarMascaraTelefone(formData.telefone)}
                        onChange={(e) =>
                            handleChange({
                                target: {
                                    name: "telefone",
                                    value: removerMascaraTelefone(e.target.value),
                                },
                            })
                        }
                        disabled={!isEditable}
                        className={styles.input}
                    />

                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled={!isEditable}
                        className={styles.input}
                        onChange={handleChange}
                    />

                    <button
                        onClick={isEditable ? handleSave : toggleEdit}
                        className={styles.btnDados}
                    >
                        {isEditable ? "Salvar" : "Alterar"}
                    </button>
                </div>
            )}
            <button onClick={onBack} className={styles.btnBack}>
                <i className="bi bi-arrow-return-left"></i>
            </button>
        </div>
    );
};
