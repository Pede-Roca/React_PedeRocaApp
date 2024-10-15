import React from "react";
import styles from "./AdminPage.module.css";
import logo from '../../assets/Logo.svg';
import { useState, useEffect } from "react";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import {
  getDocs,
  collection,
  query,
  where,
  getFirestore,
} from "firebase/firestore";

import GestaoUsuarios from '../../Components/GestaoUsuarios/GestaoUsuarios';
import GestaoProdutos from '../../Components/GestaoProdutos/GestaoProdutos';
import GestaoVendas from '../../Components/GestaoVendas/GestaoVendas';
import GestaoMensagens from '../../Components/GestaoMensagens/GestaoMensagens';
import GestaoCategorias from '../../Components/GestaoCategorias/GestaoCategorias';

const AdminPage = () => {
  const [userId, setUserId] = useState("");
  const db = getFirestore();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/'); 
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

  const [RenderUsuarios, setRenderUsuarios] = useState(false);
  const [RenderProdutos, setRenderProdutos] = useState(true);
  const [RenderVendas, setRenderVendas] = useState(false);
  const [RenderMensagens, setRenderMensagens] = useState(false);
  const [RenderCategorias, setRenderCategorias] = useState(false);

  const paginaUsuarios = () => {
    setRenderUsuarios(true);
    setRenderProdutos(false);
    setRenderVendas(false);
    setRenderMensagens(false);
    setRenderCategorias(false);
  };

  const paginaProdutos = () => {
    setRenderUsuarios(false);
    setRenderProdutos(true);
    setRenderVendas(false);
    setRenderMensagens(false);
    setRenderCategorias(false);
  };

  const paginaVendas = () => {
    setRenderUsuarios(false);
    setRenderProdutos(false);
    setRenderVendas(true);
    setRenderMensagens(false);
    setRenderCategorias(false);
  };

  const paginaMensagens = () => {
    setRenderUsuarios(false);
    setRenderProdutos(false);
    setRenderVendas(false);
    setRenderMensagens(true);
    setRenderCategorias(false);
  };

  const paginaCategorias = () => {
    setRenderUsuarios(false);
    setRenderProdutos(false);
    setRenderVendas(false);
    setRenderMensagens(false);
    setRenderCategorias(true);
  }

  return (
      <>
        <div className={styles.ContainerPai}>
          <aside className={styles.ContainerAside}>
            {userData.map((user) => (
                <div key={user.id} className={styles.userData}>
                  <img
                    className={styles.foto}
                    src={user.foto}
                    alt="foto do usuário"
                  />
                  <h4 className={styles.nomeUser}>{user.nome}</h4>
                </div>
              ))}
              <p className={styles.Categorias}>Categorias</p>
              <div className={styles.CategoriasContainer}>
                <button onClick={paginaVendas} className={`${
                  RenderVendas === true ? styles.CategoriasButtonAtivo : styles.CategoriasButton
                }`}><i className="bi bi-cash-coin"></i> Vendas</button>
                  <button onClick={paginaUsuarios} className={`${
                  RenderUsuarios === true ? styles.CategoriasButtonAtivo : styles.CategoriasButton
                }`}><i className="bi bi-people"></i> Usuários</button>
                  <button onClick={paginaProdutos} className={`${
                  RenderProdutos === true ? styles.CategoriasButtonAtivo : styles.CategoriasButton
                }`}><i className="bi bi-cart3"></i> Produtos</button>
                  <button onClick={paginaMensagens} className={`${
                  RenderMensagens === true ? styles.CategoriasButtonAtivo : styles.CategoriasButton
                }`}><i className="bi bi-chat-dots"></i> Mensagens</button>
                <button onClick={paginaCategorias} className={`${
                  RenderCategorias === true ? styles.CategoriasButtonAtivo : styles.CategoriasButton
                }`}><i className="bi bi-tags"></i> Categorias</button>
                  <button onClick={handleButtonClick} className={styles.Voltar}>Voltar ao Site</button>
                  {/*Mobile*/}
                  <div>
                    <button onClick={paginaVendas} className={`${
                    RenderVendas === true ? styles.CategoriasButtonAtivoM : styles.CategoriasButtonM
                    }`}><i className="bi bi-cash-coin"></i></button>
                    <p className={styles.nomeNav}>Vendas</p>
                  </div>
                  <div>
                    <button onClick={paginaUsuarios} className={`${
                    RenderUsuarios === true ? styles.CategoriasButtonAtivoM : styles.CategoriasButtonM
                    }`}><i className="bi bi-people"></i></button>
                    <p className={styles.nomeNav}>Usuarios</p>
                  </div>
                  <div>
                    <button onClick={paginaProdutos} className={`${
                    RenderProdutos === true ? styles.CategoriasButtonAtivoM : styles.CategoriasButtonM
                    }`}><i className="bi bi-cart3"></i></button>
                    <p className={styles.nomeNav}>Produtos</p>
                  </div>
                  <div>
                    <button onClick={paginaMensagens} className={`${
                    RenderMensagens === true ? styles.CategoriasButtonAtivoM : styles.CategoriasButtonM
                    }`}><i className="bi bi-chat-dots"></i></button>
                    <p className={styles.nomeNav}>SMS</p>
                  </div>
                  <div>
                    <button onClick={paginaCategorias} className={`${
                    RenderCategorias === true ? styles.CategoriasButtonAtivoM : styles.CategoriasButtonM
                    }`}><i className="bi bi-tags"></i></button>
                    <p className={styles.nomeNav}>Categorias</p>
                  </div>
                  <div>
                    <button onClick={handleButtonClick} className={styles.VoltarM}><i className="bi bi-x-lg"></i></button>
                    <p className={styles.nomeNav}>Fechar</p>
                  </div>
                </div>
                <div className={styles.ContainerLogo}>
                <img src={logo} alt="Logo Pede Roça" className={styles.logo} />
              </div>
          </aside>
          <section className={styles.ConteinerSection}>
              {RenderUsuarios && <GestaoUsuarios />}
              {RenderProdutos && <GestaoProdutos />}
              {RenderVendas && <GestaoVendas />}
              {RenderMensagens && <GestaoMensagens />}
              {RenderCategorias && <GestaoCategorias />}
          </section>
        </div>
      </>
  );
};

export default AdminPage;
