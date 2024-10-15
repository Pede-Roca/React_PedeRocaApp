import React from "react";
import styles from "./Usuario.module.css";
import { useFetchUserData } from "./useFetchUserData";
import { useAuth } from "./useAuth";

export const UserDadosPessoais = ({ onBack }) => {
    const { userId, backendUserId } = useAuth();
    const { userData } = useFetchUserData(userId, backendUserId);
    
    return (
        <div>
            {userData && (
                <div key={userData.id} className={styles.Dados}>
                    <label htmlFor="Nome" className={styles.label}>Nome</label>
                    <input type="text" name="Nome" value={userData.nome} disabled className={styles.input} />


                    <label htmlFor="CPF" className={styles.label}>
                        CPF
                    </label>
                    <input
                        type="text"
                        name="CPF"
                        value={userData.cpf}  // Adicionando um fallback
                        disabled
                        className={styles.input}
                    />
                    <label htmlFor="Telefone" className={styles.label}>
                        Telefone
                    </label>
                    <input
                        type="tel"
                        name="Telefone"
                        value={userData.telefone}
                        disabled
                        className={styles.input}
                    />
                    <label htmlFor="Email" className={styles.label}>
                        Email
                    </label>
                    <input
                        type="Email"
                        name="estado"
                        value={userData.email}
                        disabled
                        className={styles.input}
                    />
                    <button className={styles.btnDados}>Alterar</button>                </div>
            )}
            <button onClick={onBack} className={styles.btnBack}>
                <i className="bi bi-arrow-return-left"></i>
            </button>
        </div>
    );
};
