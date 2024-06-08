import React, { useState } from "react";
import { Button, Offcanvas, OffcanvasHeader } from "react-bootstrap";
import { useAuthValue } from "../../context/AuthContext";
import styles from "./SideBar.module.css";
import "./SideBar.module.css";
import Login from "../Login/Login";
import Carrinho from "../Carrinho/Carrinho";
import Info from "../Info/Info";
import Receitas from "../Receitas/Receitas";

const SideBar = (props) => {
  const [show, setShow] = useState(false);
  const { user } = useAuthValue();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [menuNav, setMenuNav] = useState(1);
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

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="hideMobile"
      >
        <Offcanvas.Header closeButton>
          <div className={styles.bgTitulo}>
            {menuNav == 0 && <h4 className={styles.titulo}>Carrinho</h4>}
            {menuNav == 1 && <h4 className={styles.titulo}>Login</h4>}
            {menuNav == 2 && <h4 className={styles.titulo}>Infomações</h4>}
            {menuNav == 3 && <h4 className={styles.titulo}>Receitas</h4>}
          </div>
          <div className={styles.NavSideBar}>
            <button
              type="button"
              className={`${
                menuNav === 0 ? styles.btnNavCardActive : styles.btnNavCart
              }`}
              onClick={() => setMenuNav(0)}
              disabled={!user}
            >
              <i className="bi bi-cart4"></i>
            </button>
            <button
              type="button"
              className={`${
                menuNav === 1 ? styles.btnNavUserActive : styles.btnNavUser
              }`}
              onClick={() => setMenuNav(1)}
            >
              <i className="bi bi-person"></i>
            </button>
            <button
              type="button"
              className={`${
                menuNav === 2 ? styles.btnNavInfoActive : styles.btnNavInfo
              }`}
              onClick={() => setMenuNav(2)}
            >
              <i className="bi bi-info-lg"></i>
            </button>
            <button
              type="button"
              className={`${
                menuNav === 3 ? styles.btnReceitasActive : styles.btnReceitas
              }`}
              onClick={() => setMenuNav(3)}
            >
              <i className="bi bi-chat-left-text"></i>
            </button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {menuNav == 1 && <Login />}
          {menuNav == 0 && <Carrinho />}
          {menuNav == 2 && <Info />}
          {menuNav == 3 && <Receitas />}
        </Offcanvas.Body>
        <div className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.hideNavMobile}>
              <div>
                <button
                  type="button"
                  className={`${
                    menuNav === 0 ? styles.btnNavCardActive : styles.btnNavCart
                  }`}
                  onClick={() => setMenuNav(0)}
                  disabled={!user}
                >
                  <i className="bi bi-cart4"></i>
                </button>
                <p className={styles.nomeNav}>Carrinho</p>
              </div>
              <div>
                <button
                  type="button"
                  className={`${
                    menuNav === 1 ? styles.btnNavUserActive : styles.btnNavUser
                  }`}
                  onClick={() => setMenuNav(1)}
                >
                  <i className="bi bi-person"></i>
                </button>
                <p className={styles.nomeNav}>Usuário</p>
              </div>
              <div>
                <button
                  type="button"
                  className={`${
                    menuNav === 2 ? styles.btnNavInfoActive : styles.btnNavInfo
                  }`}
                  onClick={() => setMenuNav(2)}
                >
                  <i className="bi bi-info-lg"></i>
                </button>
                <p className={styles.nomeNav}>Info</p>
              </div>
              <div>
                <button
                  type="button"
                  className={`${
                    menuNav === 3
                      ? styles.btnReceitasActive
                      : styles.btnReceitas
                  }`}
                  onClick={() => setMenuNav(3)}
                >
                  <i className="bi bi-chat-left-text"></i>
                </button>
                <p className={styles.nomeNav}>Receitas</p>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas>
    </>
  );
};

export default SideBar;
