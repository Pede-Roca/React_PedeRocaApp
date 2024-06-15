import React from "react";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styles from "./RecSenha.module.css";

const RecSenha = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email de recuperação de senha enviado");
      })
      .catch((error) => {
        alert("Erro ao enviar email de recuperação de senha");
      });
  };
  return (
    <>
      <div className={styles.container}>
        <h4>Recuperar senha</h4>
        <p>
          <span>Instruções</span>
        </p>
        <p>
          <span>1º </span>Digite seu email e click em enviar
        </p>
        <p>
          <span>2º </span>Acesse seu email e click no link para recuperar a
          senha
        </p>
        <p>
          <span>3º </span>Cadastre uma nova senha
        </p>
        <label>Email</label>
        <input
          type="email"
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handlePasswordReset}>Enviar</button>
      </div>
    </>
  );
};

export default RecSenha;
