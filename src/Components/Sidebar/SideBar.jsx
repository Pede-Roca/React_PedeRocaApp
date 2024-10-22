import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useAuthValue } from "../../context/AuthContext";
import styles from "./SideBar.module.css";
import Login from "../Login/Login";
import Carrinho from "../Carrinho/Carrinho";
import Info from "../Info/Info";
import Receitas from "../Receitas/Receitas";

const SideBar = () => {
  const [show, setShow] = useState(false);
  const { user } = useAuthValue();
  const [menuNav, setMenuNav] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeToLogin = () => setMenuNav(1);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        id={styles.Button}
        onClick={handleShow}
      >
        <i className="bi bi-list"> Menu</i>
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end" className="hideMobile">
        <Offcanvas.Header closeButton>
          <div className={styles.bgTitulo}>
            {menuNav === 0 && <h4 className={styles.titulo}>Carrinho</h4>}
            {menuNav === 1 && <h4 className={styles.titulo}>{!user ? "Login" : "Perfil do Usuário"}</h4>}
            {menuNav === 2 && <h4 className={styles.titulo}>Informações</h4>}
            {menuNav === 3 && <h4 className={styles.titulo}>Receitas</h4>}
          </div>
          <div className={styles.NavSideBar}>
            <button
              type="button"
              className={menuNav === 0 ? styles.btnNavCardActive : styles.btnNavCart}
              onClick={() => setMenuNav(0)}
              disabled={!user}
            >
              <i className="bi bi-cart4"></i>
            </button>
            <button
              type="button"
              className={menuNav === 1 ? styles.btnNavUserActive : styles.btnNavUser}
              onClick={() => setMenuNav(1)}
            >
              <i className="bi bi-person"></i>
            </button>
            <button
              type="button"
              className={menuNav === 2 ? styles.btnNavInfoActive : styles.btnNavInfo}
              onClick={() => setMenuNav(2)}
            >
              <i className="bi bi-info-lg"></i>
            </button>
            <button
              type="button"
              className={menuNav === 3 ? styles.btnReceitasActive : styles.btnReceitas}
              onClick={() => setMenuNav(3)}
            >
              <i className="bi bi-chat-left-text"></i>
            </button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {menuNav === 1 && <Login />}
          {menuNav === 0 && <Carrinho close={changeToLogin} />}
          {menuNav === 2 && <Info />}
          {menuNav === 3 && <Receitas />}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBar;
