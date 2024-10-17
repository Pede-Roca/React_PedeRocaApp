import React, { useState } from "react";
import styles from "./Cadastro.module.css";

const StepAcesso = ({
    email,
    setEmail,
    password,
    setPassword,
    confirmedPassword,
    setConfirmedPassword,
    renderPassError,
    fieldError,
}) => {
    const [emailError, setEmailError] = useState(false);

    const validateEmail = (email) => {
        // Regex simples para validar e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(!validateEmail(value)); // Define erro se o e-mail for inválido
    };

    return (
        <div className={styles.containerDados}>
            <h5 className={styles.titulo}>Dados de Acesso</h5>
            <label className={styles.label}>
                <span className={styles.span}>E-mail: </span>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="form-control"
                    placeholder="Entre com seu e-mail"
                />
                {emailError && (
                    <span className={styles.erro}>E-mail inválido.</span>
                )}
            </label>
            <label className={styles.label}>
                <span className={styles.span}>Senha: </span>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Entre com sua senha"
                />
            </label>
            <label className={styles.label}>
                <span className={styles.span}>Confirmação da senha: </span>
                <input
                    type="password"
                    name="confirmedPassword"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    className="form-control"
                    placeholder="Confirme sua senha"
                />
                {renderPassError && (
                    <span className={styles.erroPass}>Senhas não conferem</span>
                )}
                {fieldError && (!email || !password || !confirmedPassword) && (
                    <span className={styles.erro}>
                        Preencha todos os campos.
                    </span>
                )}
            </label>
        </div>
    );
};

export default StepAcesso;
