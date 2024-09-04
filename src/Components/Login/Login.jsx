import React from "react";
import styles from "./Login.module.css";
import logo from "../../assets/Logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { userAuthentication } from "../../hooks/userAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import FacebookLogin from "../FacebookLogin/FacebookLogin";
import LinkedInLogin from "../LinkedInLogin/LinkedInLogin";
import Cadastro from "../Cadastro/Cadastro";
import Usuario from "../Usuario/Usuario";
import GitHubLogin from "../GitHubLogin/GitHubLogin";
import RecSenha from "../RecSenha/RecSenha";

const Login = () => {
  const [pageRender, setPageRender] = useState(0); //provisório até arrumar o "const { user } = useAuthValue()"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthValue();
  const { login, error: authError, loading } = userAuthentication();
  const [showOff, setShowOff] = useState(false);

  const cadastar = () => {
    setShowOff(true);
    setPageRender(1);
  };

  const recoveryPassword = () => {
    setShowOff(true);
    setPageRender(2);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const usuario = {
      email,
      password,
    };
    const res = await login(usuario);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <>
      {user && !showOff && <Usuario />}
      {!user && !showOff && (
        <div>
          <main>
            <img
              src={logo}
              alt="Logo Pede Roça"
              className={styles.imgLogoLogin}
            />
          </main>
          <form onSubmit={handlerSubmit}>
            <div className="form-group form-floating mb-3">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="floatingInput"
                placeholder="name@exemple.com"
              />
              <label type="email" htmlFor="floatingInput">
                Usuário
              </label>
            </div>
            <div className="form-group form-floating mb-3">
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="floatingInput"
                placeholder="name@exemple.com"
              />
              <label type="password" htmlFor="floatingInput">
                Senha
              </label>
            </div>
            <div className="form-group">
              {!loading && (
                <button className="btn" id={styles.btnLogin}>
                  Logar
                </button>
              )}
              {loading && (
                <button className="btn" id={styles.btnLogin} disabled>
                  Logando...
                </button>
              )}
              {error && <div className="mt-3 alert alert-danger">{error}</div>}
            </div>
          </form>
          <div className="d-flex justify-content-between">
            <button onClick={recoveryPassword} className={styles.btnHelp}>
              Recuperar Senha
            </button>
            <button onClick={cadastar} className={styles.btnHelp}>
              Cadastro
            </button>
          </div>
          <div className={styles.loginSocial}>
            <div className={styles.containerRedeSocial}>
              <GoogleLogin />
              <FacebookLogin />
              <GitHubLogin />
              <LinkedInLogin />
            </div>
          </div>
        </div>
      )}
      {!user && pageRender === 1 && <Cadastro />}
      {!user && pageRender === 2 && <RecSenha />}
    </>
  );
};

export default Login;
