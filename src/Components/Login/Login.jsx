import React from "react";
import styles from "./Login.module.css";
import logo from "../../assets/Logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { userAuthentication } from "../../hooks/userAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import FacebookLogin from "../FacebookLogin/FacebookLogin";
import Cadastro from "../Cadastro/Cadastro";
import Usuario from "../Usuario/Usuario";
import RecSenha from "../RecSenha/RecSenha";

const Login = () => {
  const [pageRender, setPageRender] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthValue();
  const { login, error: authError, loading } = userAuthentication();
  const [showOff, setShowOff] = useState(false);

  const [showPassword, setShowPassword] = useState(false);


  const cadastar = () => {
    setShowOff(true);
    setPageRender(1);
  };

  const recoveryPassword = () => {
    setShowOff(true);
    setPageRender(2);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status, message, user } = await login({ email, password });
      if (status === false) {
        setError(message);
      } else {
        setError("");
      }
    } catch (error) {
      setError("Erro ao logar, tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    if (authError) {
      setError("Usuário ou Senha Inválido");
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
              <label htmlFor="floatingInput">Usuário</label>
            </div>
            <div className="form-group form-floating mb-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="floatingPassword"
                placeholder="Senha"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.toggleButton}
                aria-label="Mostrar/Esconder senha"
              >
                {showPassword ? <i class="bi bi-eye-slash"></i> : <i class="bi bi-eye"></i>}
              </button>
              <label htmlFor="floatingPassword">Senha</label>
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
          {/* <div className={styles.loginSocial}>
            <div className={styles.containerRedeSocial}>
              <GoogleLogin />
              <FacebookLogin />
            </div>
          </div> */}
        </div>
      )}
      {!user && pageRender === 1 && <Cadastro />}
      {!user && pageRender === 2 && <RecSenha />}
    </>
  );
};

export default Login;
