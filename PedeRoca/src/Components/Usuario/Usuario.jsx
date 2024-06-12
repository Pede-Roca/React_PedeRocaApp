import React from "react";
import styles from "./Usuario.module.css";
import { userAuthentication } from "../../hooks/userAuthentication";

const Usuario = () => {
  const { logout } = userAuthentication();
  return (
    <div>
      <h1>Usuário Logado</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default Usuario;
