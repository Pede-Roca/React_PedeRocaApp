import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import styles from "./Usuario.module.css";
import { userAuthentication } from "../../hooks/userAuthentication";
import { auth } from "../../firebase/config";
import {
  getDocs,
  collection,
  query,
  where,
  getFirestore,
} from "firebase/firestore";

const Usuario = () => {
  const { logout } = userAuthentication();
  const [userId, setUserId] = useState("");
  const db = getFirestore();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/admin'); 
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const q = query(
        collection(db, "tb_usuarios"),
        where("uid", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      setUserData(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchUserData();
  }, [db, userId]);

  const [homeUser, setHomeUser] = useState(true);
  const [Endereco, setEndereco] = useState(false);
  const [DadosPessoais, setDadosPessoais] = useState(false);
  const [Suporte, setSuporte] = useState(false);

  const paginaEndereco = () => {
    setHomeUser(false);
    setEndereco(true);
    setDadosPessoais(false);
    setSuporte(false);
  };

  const paginaDadosPessoais = () => {
    setHomeUser(false);
    setEndereco(false);
    setDadosPessoais(true);
    setSuporte(false);
  };

  const paginaSuporte = () => {
    setHomeUser(false);
    setEndereco(false);
    setDadosPessoais(false);
    setSuporte(true);
  };

  const paginaHome = () => {
    setHomeUser(true);
    setEndereco(false);
    setDadosPessoais(false);
    setSuporte(false);
  };

  return (
    <>
      {homeUser && (
        <>
          <div>
            {userData.map((user) => (
              <div key={user.id} className={styles.userData}>
                <img
                  className={styles.foto}
                  src={user.foto}
                  alt="foto do usuário"
                />
                <h4 className={styles.nomeUser}>{user.nome}</h4>
                {user.nivel_acesso === "adm" && <button className={styles.btnDados} onClick={handleButtonClick}>ADM</button>}
              </div>
            ))}
          </div>
          <div className={styles.containerBTN}>
            <button className={styles.btnDados} onClick={paginaEndereco}>
              Endereço de Entrega
            </button>
            <button className={styles.btnDados} onClick={paginaDadosPessoais}>
              Dados Pessoais
            </button>
            <button className={styles.btnDados} onClick={paginaSuporte}>
              Suporte ao Usuário
            </button>
            <button className={styles.btnDados} onClick={handleButtonClick}>
              Administrador
            </button>
            <button className={styles.btnSair} onClick={logout}>
              Sair
            </button>
          </div>
        </>
      )}
      {Endereco && (
        <>
          <div>
            {userData.map((user) => (
              <div key={user.id} className={styles.Dados}>
                <label htmlFor="CEP" className={styles.label}>
                  CEP
                </label>
                <input
                  type="text"
                  name="CEP"
                  value={user.cep}
                  disabled
                  className={styles.input}
                />
                <label htmlFor="rua" className={styles.label}>
                  Rua
                </label>
                <input
                  type="text"
                  name="rua"
                  value={user.logradouro}
                  disabled
                  className={styles.input}
                />
                <label htmlFor="cidade" className={styles.label}>
                  Cidade
                </label>
                <input
                  type="text"
                  name="cidade"
                  value={user.cidade}
                  disabled
                  className={styles.input}
                />
                <label htmlFor="estado" className={styles.label}>
                  Estado
                </label>
                <input
                  type="text"
                  name="estado"
                  value={user.uf}
                  disabled
                  className={styles.input}
                />
                <label htmlFor="bairro" className={styles.label}>
                  Bairro
                </label>
                <input
                  type="text"
                  name="bairro"
                  value={user.bairro}
                  disabled
                  className={styles.input}
                />
                <button className={styles.btnDados}>Alterar</button>
              </div>
            ))}
          </div>
          <button onClick={paginaHome} className={styles.btnBack}>
            <i className="bi bi-arrow-return-left"></i>
          </button>
        </>
      )}
      {DadosPessoais && (
        <>
          <div>
            {userData.map((user) => (
              <div key={user.id} className={styles.Dados}>
                <label htmlFor="Nome" className={styles.label}>
                  Nome
                </label>
                <input
                  type="text"
                  name="Nome"
                  value={user.nome}
                  disabled
                  className={styles.input}
                />
                <label htmlFor="CPF" className={styles.label}>
                  CPF
                </label>
                <input
                  type="text"
                  name="CPF"
                  value={user.cpf}
                  disabled
                  className={styles.input}
                />
                <label htmlFor="Telefone" className={styles.label}>
                  Telefone
                </label>
                <input
                  type="tel"
                  name="Telefone"
                  value={user.telefone}
                  disabled
                  className={styles.input}
                />
                <label htmlFor="Email" className={styles.label}>
                  Email
                </label>
                <input
                  type="Email"
                  name="estado"
                  value={user.email}
                  disabled
                  className={styles.input}
                />
                <button className={styles.btnDados}>Alterar</button>
              </div>
            ))}
          </div>
          <button onClick={paginaHome} className={styles.btnBack}>
            <i className="bi bi-arrow-return-left"></i>
          </button>
        </>
      )}
      {Suporte && (
        <>
          <h4 className={styles.titulo}>Redes Sociais</h4>
          <div className={styles.ContainerLinksSocial}>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              disabled
              className={styles.socialink}
            >
              <i className="bi bi-instagram" id={styles.instSVG}></i>Instagram
            </a>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              disabled
              className={styles.socialink}
            >
              <i className="bi bi-facebook" id={styles.faceSVG}></i>Facebook
            </a>
            <a
              href=""
              target="_blank"
              rel="noreferrer"
              disabled
              className={styles.socialink}
            >
              <i className="bi bi-envelope" id={styles.emailSVG}></i>Email
            </a>
          </div>
          <h4 className={styles.titulo}>Contato</h4>
          <div>
            <label htmlFor="Email" className={styles.label}>
              Email
            </label>
            <input type="email" name="Email" className={styles.input} />
            <label htmlFor="Mensagem" className={styles.label}>
              Conteúdo
            </label>
            <textarea name="Mensagem" className={styles.input2} />
            <button className={styles.btnEnviar}>Enviar</button>
          </div>
          <h4 className={styles.titulo}>Localização</h4>
          <p className={styles.endereco}>Av. Habib Gabriel, 1360</p>
          <p className={styles.endereco}>
            Jardim Buscardi, Matão - SP, 15990-539
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.1855904563968!2d-48.36269552475904!3d-21.61769059307542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8e159d287a237%3A0x70df7e81597e2d08!2sFatec%20Mat%C3%A3o!5e0!3m2!1spt-BR!2sbr!4v1718590405337!5m2!1spt-BR!2sbr"
            width="100%"
            height="250"
            loading="lazy"
          ></iframe>
          <button onClick={paginaHome} className={styles.btnBack}>
            <i className="bi bi-arrow-return-left"></i>
          </button>
        </>
      )}
    </>
  );
};

export default Usuario;
