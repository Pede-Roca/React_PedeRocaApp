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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(!validateEmail(value));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const toggleConfirmedPasswordVisibility = () => {
        setShowConfirmedPassword((prevShowConfirmedPassword) => !prevShowConfirmedPassword);
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
                <div className={styles.passwordContainer}>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Entre com sua senha"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={styles.toggleButton}
                        aria-label="Mostrar/Esconder senha"
                    >
                        {showPassword ? <i class="bi bi-eye-slash"></i> : <i class="bi bi-eye"></i>}
                    </button>
                </div>
            </label>
            <label className={styles.label}>
                <span className={styles.span}>Confirmação da senha: </span>
                <div className={styles.passwordContainer}>
                    <input
                        type={showConfirmedPassword ? "text" : "password"}
                        name="confirmedPassword"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        className="form-control"
                        placeholder="Confirme sua senha"
                    />
                    <button
                        type="button"
                        onClick={toggleConfirmedPasswordVisibility}
                        className={styles.toggleButton}
                        aria-label="Mostrar/Esconder confirmação da senha"
                    >
                        {showConfirmedPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                    </button>
                </div>
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
